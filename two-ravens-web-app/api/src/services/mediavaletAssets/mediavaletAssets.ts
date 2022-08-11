import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';
import { mediavaletApi, mediavaletApiBulkAction } from 'src/lib/mediavaletAuth';
import { logger } from 'src/lib/logger';
import parse from 'date-fns/parse';
import { cameraTrapBatch } from '../cameraTrapBatches/cameraTrapBatches';
import { cameraTrap } from '../cameraTraps/cameraTraps';
import { stringify } from 'query-string';

function formatAsset(asset) {
  return {
    id: asset.id,
    title: asset.title,
    thumb: asset.media.thumb,
    small: asset.media.small,
    medium: asset.media.medium,
    large: asset.media.large,
    original: asset.media.original,
    categories: asset.categories.join(', '),
    description: asset.description,
    altText: asset.altText,
    date: parse(asset.date, 'yyyy:MM:dd HH:mm:ss', new Date()),
  };
}

export const mediavaletAssets: QueryResolvers['mediavaletAssets'] = async ({
  categoryId,
}) => {
  const response = await mediavaletApi(
    'GET',
    `/categories/${categoryId}/assets`
  );
  if (response.error) return [];
  return response.payload.assets.map(formatAsset);
};

export const mediavaletAsset: QueryResolvers['mediavaletAsset'] = async ({
  id,
}) => {
  const response = await mediavaletApi('GET', `/assets/${id}`);
  const date = await mediavaletAssetCreatedAt({ id });
  if (response?.error || !response?.payload) {
    throw new Error(response.error);
  }
  return formatAsset({ ...response.payload, date });
};

export const mediavaletAssetChangeCategory = async ({
  assetId,
  categoryId,
  downloadsFolderId,
}) => {
  const addResponse = await mediavaletApi(
    'POST',
    `/assets/${assetId}/categories`,
    `["${categoryId}"]`,
    'application/json'
  );

  logger.info(addResponse);

  // if (addResponse?.error || !addResponse?.payload) {
  //   return false;
  // }

  const removeResponse = await mediavaletApi(
    'DELETE',
    `/assets/${assetId}/categories/${downloadsFolderId}`
  );

  logger.info(removeResponse);

  // if (removeResponse?.error || !removeResponse?.payload) {
  //   return false;
  // }
  return true;
};

export const mediavaletAssetCreatedAt: QueryResolvers['mediavaletAsset'] =
  async ({ id }) => {
    const response = await mediavaletApi('GET', `/assets/${id}/exif`);
    if (response.error) return null;
    logger.info(JSON.stringify(response));
    const dateRecord = response.payload.find(
      (r) => r.propertyName === 'Date Time Original'
    );
    return dateRecord?.propertyValue;
  };

// export const updateMediavaletAssetCategoryBulk = async ({
//   assetIDs,
//   batchFolderId,
//   // downloadsFolderId,
// }) => {
//   const addCategoryTemplate = (assetId) =>
//     `--c6c2ed020aadd284efd61a7c9d4dfe94\r\nContent-Type: application/http; msgtype=request\r\n\r\nPUT /assets/${assetId}/categories?runAsync=true HTTP/1.1\r\nhost: api.mediavalet.com\r\nOcp-Apim-Subscription-Key: ${process.env['MEDIAVALET_SUBSCRIPTION_KEY']}\r\nAuthorization: Bearer {{BEARER_TOKEN}}\r\ncontent-type: application/json\r\n\r\n["${batchFolderId}"]\r\n\r\n`;
//   const bulkBody = [
//     ...assetIDs.map(addCategoryTemplate),
//     `--c6c2ed020aadd284efd61a7c9d4dfe94--\r\n`,
//   ].join('');
//   logger.info(bulkBody);
//   const response = await mediavaletApiBulkAction({ body: bulkBody });

//   logger.info(JSON.stringify(response));

//   return response.success;
// };

// export const createMediavaletAsset: MutationResolvers['createMediavaletAsset'] =
//   ({ input }) => {
//     return db.mediavaletAsset.create({
//       data: input,
//     });
//   };

// export const updateMediavaletAsset: MutationResolvers['updateMediavaletAsset'] =
//   ({ id, input }) => {
//     return db.mediavaletAsset.update({
//       data: input,
//       where: { id },
//     });
//   };

// export const deleteMediavaletAsset: MutationResolvers['deleteMediavaletAsset'] =
//   ({ id }) => {
//     return db.mediavaletAsset.delete({
//       where: { id },
//     });
//   };
