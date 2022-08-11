import pick from 'lodash/pick';
import type {
  QueryResolvers,
  MutationResolvers,
  PhotoResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { logger } from 'src/lib/logger';

import {
  mediavaletAsset,
  mediavaletAssetChangeCategory,
  updateMediavaletAssetCategoryBulk,
} from '../mediavaletAssets/mediavaletAssets';
import {
  cameraTrapBatch,
  cameraTrapBatches,
} from '../cameraTrapBatches/cameraTrapBatches';
import { cameraTrap } from '../cameraTraps/cameraTraps';
import { delay } from 'lodash';
import { stringify } from 'query-string';

export const photos: QueryResolvers['photos'] = () => {
  return db.photo.findMany();
};

export const photo: QueryResolvers['photo'] = ({ id }) => {
  return db.photo.findUnique({
    where: { id },
  });
};

export const createPhotoFromAsset = async ({ input }) => {
  const asset = await mediavaletAsset({ id: input.assetId });
  const valuesFromAsset = pick(asset, [
    'altText',
    'date',
    'description',
    'large',
    'medium',
    'original',
    'small',
    'thumb',
    'title',
  ]);
  logger.info(JSON.stringify({ input, valuesFromAsset }));
  const id = await createPhoto({
    input: {
      ...valuesFromAsset,
      assetId: input.assetId,
      cameraTrapId: input.cameraTrapId,
    },
  });
  return id;
};

export const createPhoto: MutationResolvers['createPhoto'] = async ({
  input,
}) => {
  const asset = await mediavaletAsset({ id: input.assetId });
  const valuesFromAsset = pick(asset, [
    'altText',
    'date',
    'description',
    'large',
    'medium',
    'original',
    'small',
    'thumb',
    'title',
  ]);

  logger.info(JSON.stringify({ input, valuesFromAsset }));

  // const categoryChanged = await mediavaletAssetChangeCategory({ assetId: input.assetId, categoryId });

  return db.photo.create({
    data: {
      ...input,
      ...valuesFromAsset,
    },
  });
};

export const updatePhotosForCameraTrap: MutationResolvers['updatePhotosForCameraTrap'] =
  async ({ input: { cameraTrapId } }) => {
    try {
      const batches = await db.cameraTrapBatch.findMany({
        where: { AND: [{ cameraTrapId }, { status: 'approval' }] },
        select: { id: true },
      });
      const batchIds = batches.map((b) => b.id);
      for await (const id of batchIds) {
        await updatePhotosForBatch({ input: { batchId: id } });
      }
      return { success: true, status: 'processing' };
    } catch (error) {
      return { success: false, status: String(error) };
    }
  };

async function* updateCategoryGenerator(
  assetIds: string[],
  categoryId: string,
  downloadsFolderId: string
) {
  for (let i = 0; i < assetIds.length; i++) {
    const assetId = assetIds[i];
    const updated = await mediavaletAssetChangeCategory({
      assetId,
      categoryId,
      downloadsFolderId,
    });
    yield updated;
  }
  return;
}

export const updatePhotosForBatch: MutationResolvers['updatePhotosForBatch'] =
  async ({ input: { batchId } }) => {
    logger.info(JSON.stringify({ batchId }));
    const batch = await cameraTrapBatch({ id: batchId });
    const camera = await cameraTrap({ id: batch.cameraTrapId });

    // const batchFolderId = batch.mediavaletCategoryId;
    const downloadsFolderId = camera.mediavaletDownloadsFolderId;
    const processedFolderId = camera.mediavaletProcessedFolderId;

    if (!processedFolderId) {
      throw new Error('Missing Processed Folder ID');
    }

    logger.info(JSON.stringify({ processedFolderId }));

    const photos = await db.photo.findMany({
      where: {
        AND: [
          { cameraTrapId: batch.cameraTrapId },
          { cameraTrapBatchId: null },
          {
            date: {
              gte: batch.dateStart,
              lte: batch.dateEnd,
            },
          },
        ],
      },
      select: {
        assetId: true,
      },
      // take: 1,
    });

    const assetIDs = photos.map((i) => i.assetId);

    logger.info(JSON.stringify({ assetIDs, photos }));

    const isUpdatedIndexs = [];
    for await (const value of updateCategoryGenerator(
      assetIDs,
      processedFolderId,
      downloadsFolderId
    )) {
      isUpdatedIndexs.push(value);
    }

    const updatedAssetIds = assetIDs.filter((_, i) => isUpdatedIndexs[i]);

    logger.info(JSON.stringify({ updatedAssetIds, assetIDs, isUpdatedIndexs }));

    // const categoriesUpdated = await updateMediavaletAssetCategoryBulk({
    //   assetIDs,
    //   batchFolderId,
    //   downloadsFolderId,
    // });

    // if (!categoriesUpdated) {
    //   return { count: 0 };
    // }

    const photosBatch = await db.photo.updateMany({
      where: {
        OR: updatedAssetIds.map((assetId) => ({ assetId })),
      },
      data: {
        cameraTrapBatchId: batch.id,
      },
    });

    logger.info(photosBatch.count);

    return { count: Number(photosBatch.count) };
  };

export const updatePhoto: MutationResolvers['updatePhoto'] = ({
  id,
  input,
}) => {
  return db.photo.update({
    data: input,
    where: { id },
  });
};

export const deletePhoto: MutationResolvers['deletePhoto'] = ({ id }) => {
  return db.photo.delete({
    where: { id },
  });
};

export const Photo: PhotoResolvers = {
  cameraTrap: (_obj, { root }) =>
    db.photo.findUnique({ where: { id: root.id } }).cameraTrap(),
  cameraTrapBatch: (_obj, { root }) =>
    db.photo.findUnique({ where: { id: root.id } }).cameraTrapBatch(),
};
