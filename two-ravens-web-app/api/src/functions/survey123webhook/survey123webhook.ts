import type { APIGatewayEvent, Context } from 'aws-lambda';
import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';
import { createCameraTrapBatch } from 'src/services/cameraTrapBatches/cameraTrapBatches';
import {
  cameraTrapEvents,
  createCameraTrapEvent,
  updateCameraTrapEvent,
} from 'src/services/cameraTrapEvents/cameraTrapEvents';
import {
  cameraTrap,
  cameraTrapFromDeviceId,
} from 'src/services/cameraTraps/cameraTraps';

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info('Invoked survey123webhook function');
  logger.info(JSON.stringify(event.queryStringParameters));
  logger.info(JSON.stringify({ body: event.body }));
  logger.info(JSON.stringify({ httpMethod: event.httpMethod }));
  logger.info(JSON.stringify({ headers: event.headers }));

  try {
    if (event.httpMethod === 'POST') {
      const unformattedEvent: typeof exampleBody = JSON.parse(event.body);
      const deviceId = unformattedEvent.feature.attributes.camera_id;

      const cameraTrap = await cameraTrapFromDeviceId({ deviceId });

      const input = processEvent(unformattedEvent, cameraTrap.id);
      logger.info(input.cameraProcedure);

      if (
        ['camera_removed', 'battery_memory_replacement'].includes(
          input.cameraProcedure
        )
      ) {
        logger.info('Creating Batch');
        // Create Batch
        const previousEvents = await db.cameraTrapEvent.findMany({
          where: {
            AND: [{ cameraTrapId: cameraTrap.id }],
            OR: [
              {
                cameraProcedure: {
                  equals: 'camera_moved',
                },
              },
              {
                cameraProcedure: {
                  equals: 'battery_memory_replacement',
                },
              },
            ],

            datetimeUpdated: {
              lt: input.datetimeUpdated,
            },
          },
          select: {
            id: true,
            datetimeUpdated: true,
          },
          orderBy: {
            datetimeUpdated: 'desc',
          },
          take: 1,
        });
        logger.info(`Found ${previousEvents.length} matching events`);

        if (previousEvents.length > 0) {
          await createCameraTrapBatch({
            input: {
              cameraTrapId: cameraTrap.id,
              dateStart: previousEvents[0].datetimeUpdated.toISOString(),
              dateEnd: input.datetimeUpdated,
              status: 'approval',
              location: input.cameraLocation,
            },
          });
        }
      }

      if (Object.keys(unformattedEvent).includes['applyEdits']) {
        await updateCameraTrapEvent({ id: input.id, input });
      } else {
        await createCameraTrapEvent({ input });
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://survey123.arcgis.com',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      body: JSON.stringify({
        success: true,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://survey123.arcgis.com',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
      },
      body: JSON.stringify({
        data: 'survey123webhook function',
      }),
    };
  }
};

function processEvent(event: typeof exampleBody, cameraTrapId: string) {
  const { feature, userInfo, surveyInfo } = event;
  const { attributes, geometry, result } = feature;
  return {
    id: attributes.globalid.replace('{', '').replace('}', ''),
    deviceId: attributes.camera_id,
    staffName: attributes.staff_name,
    projectName: attributes.project_name,
    datetimeUpdated: new Date(attributes.datetime_updated).toISOString(),
    date: new Date(Date.now()).toISOString(),
    cameraLocation: JSON.stringify(geometry),
    cameraLocationX: Number(geometry.x),
    cameraLocationY: Number(geometry.y),
    cameraProcedure:
      attributes.camera_procedure === 'other'
        ? attributes.camera_other_update
        : attributes.camera_procedure,
    cameraAttachmentPosition:
      attributes.camera_attachment_position === 'other'
        ? attributes.other_position
        : attributes.camera_attachment_position,
    cameraHeight: attributes.camera_height,
    cameraSitePhoto: '',
    cameraMake:
      attributes.camera_make === 'other'
        ? attributes.camera_make_other
        : attributes.camera_make,
    cameraTarget:
      attributes.camera_target === 'other'
        ? attributes.other_feature
        : attributes.camera_target,
    areaDeployed: attributes.area_deployed,
    cameraWorking: Boolean(attributes.camera_working === 'yes'),
    comments: attributes.comments,
    userUsername: userInfo.username,
    userEmail: userInfo.email,
    userFullname: userInfo.fullName,
    cameraTrapId,
    // objectid: attributes.objectid,
    gisLink: `https://survey123.arcgis.com/surveys/${surveyInfo.formItemId}/data?objectIds=${result.objectId}`,
  };
}

const exampleBody = {
  applyEdits: [
    {
      id: 0,
      updates: [
        {
          attributes: {
            datetime_updated: 1659870720000,
            globalid: '417e17ff-faad-498a-b772-b447611800f0',
            objectid: 1,
          },
        },
      ],
    },
  ],
  feature: {
    attributes: {
      project_name: 'Fox Watchers',
      staff_name: 'Jedidiah',
      camera_id: 'RVEN',
      datetime_updated: 1659870720000,
      camera_procedure: 'camera_moved',
      camera_other_update: null,
      camera_attachment_position: 'tree',
      other_position: null,
      camera_height: 10,
      area_deployed: 'Botanics',
      camera_make: 'GardePro',
      camera_make_other: null,
      camera_target: 'Wildlife feeding area',
      other_feature: null,
      camera_working: 'yes',
      comments: null,
      globalid: '417e17ff-faad-498a-b772-b447611800f0',
      objectid: 1,
    },
    geometry: {
      geometryType: 'esriGeometryPoint',
      x: -4.29038828239612,
      y: 55.87949127436034,
      spatialReference: {
        wkid: 4326,
      },
    },
    layerInfo: {
      id: 0,
      name: 'survey',
      type: 'Feature Layer',
      globalIdField: 'globalid',
      objectIdField: 'objectid',
      relationships: [],
    },
    result: {
      globalId: '417e17ff-faad-498a-b772-b447611800f0',
      objectId: 1,
      uniqueId: 1,
      success: true,
    },
    attachments: null,
  },
  eventType: 'editData',
  userInfo: {
    username: 'jedidiahcodes',
    fullName: 'Jedidiah',
    email: 'hello@jedidiah.dev',
  },
  surveyInfo: {
    formItemId: '8caff307a75a45bf918b12fdfa18a438',
    formTitle: 'Camera Trap Form',
    serviceItemId: '5f86c900056e4a3196a4b2c71b441e17',
    serviceUrl:
      'https://services6.arcgis.com/PciRFMri3FXtkqGq/arcgis/rest/services/survey123_8caff307a75a45bf918b12fdfa18a438_fieldworker/FeatureServer',
  },
};
