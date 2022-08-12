import type { APIGatewayEvent, Context } from 'aws-lambda';
import Busboy from 'busboy';
import docusign from 'docusign-esign';
import { forEach } from 'lodash';
import { CameraTrapBatch } from 'types/graphql';

import { authenticate } from 'src/lib/docusignAuth';
import { logger } from 'src/lib/logger';
import { cameraTrapBatch } from 'src/services/cameraTrapBatches/cameraTrapBatches';

// import renderDocument from './renderDocument';
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
  logger.info('Invoked generateDocusignTemplate function');

  const { fields, pdf } = await parseMultipartForm(event);

  try {
    const {
      cameraTrapBatchId,
      stakeholders,
      ccUsers,
      emailSubject,
      batchLabel,
    } = JSON.parse(fields);

    const {
      accessToken,
      apiAccountId: accountId,
      basePath,
    } = await authenticate();

    const batch = await cameraTrapBatch({ id: cameraTrapBatchId });

    const dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(basePath);
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);

    const envelopesApi = new docusign.EnvelopesApi(dsApiClient);

    const envelope = await makeEnvelope({
      stakeholders,
      ccUsers,
      emailSubject,
      batchLabel,
      status: 'sent',
      batch,
      pdf,
    });

    const results = await envelopesApi.createEnvelope(accountId, {
      envelopeDefinition: envelope,
    });

    const envelopeId = results.envelopeId;

    logger.info(`Envelope was created. EnvelopeId ${envelopeId}`);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        envelopeId,
      }),
    };

    // const envelopeId = signingViaEmail.sendEnvelope(args);
  } catch (error) {
    logger.error(String(error));
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error,
      }),
    };
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'generateDocusignTemplate function',
    }),
  };
};

type Contact = { name: string; email: string };

async function makeEnvelope(args: {
  emailSubject: string;
  batchLabel: string;
  stakeholders: Contact[];
  ccUsers: Contact[];
  status: string;
  batch: CameraTrapBatch;
  pdf: Blob;
}) {
  const { emailSubject, stakeholders, ccUsers, status, batch } = args;
  const env = new docusign.EnvelopeDefinition();
  env.emailSubject = emailSubject;
  const signers = stakeholders.map((contact, index) =>
    docusign.Signer.constructFromObject({
      ...contact,
      recipientId: String(index),
      routingOrder: '1',
    })
  );

  forEach(signers, (signer, index) => {
    const testSign = docusign.SignHere.constructFromObject({
      yPosition: '200',
      xPosition: String(100 + 200 * index),
      documentId: '1',
      pageNumber: '1',
    });
    const testSign2 = docusign.SignHere.constructFromObject({
      yPosition: '200',
      xPosition: String(100 * (index + 1)),
      documentId: '1',
      pageNumber: '2',
    });
    signer.tabs = [testSign, testSign2];
  });

  const carbonCopies = ccUsers.map((contact, index) =>
    docusign.Signer.constructFromObject({
      ...contact,
      recipientId: String(index + stakeholders.length),
      routingOrder: '1',
    })
  );

  const recipients = docusign.Recipients.constructFromObject({
    signers,
    carbonCopies,
  });
  env.recipients = recipients;
  env.status = status;

  const documents = [
    {
      mime: 'application/pdf',
      filename: `${args.batchLabel}pdf.pdf`,
      documentId: '1',
      bytes: args.pdf,
    },
  ];
  env.documents = documents;
  // await renderDocument(batch);

  return env;
}

function parseMultipartForm(event) {
  // https://www.netlify.com/blog/2021/07/29/how-to-process-multipart-form-data-with-a-netlify-function/
  return new Promise((resolve) => {
    // we'll store all form fields inside of this
    const fields = {};

    // let's instantiate our busboy instance!
    const busboy = new Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers,
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      'file',
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        filestream.on('data', (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          };
        });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on('field', (fieldName, value) => {
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    busboy.on('finish', () => {
      resolve(fields);
    });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(event.body);
  });
}
