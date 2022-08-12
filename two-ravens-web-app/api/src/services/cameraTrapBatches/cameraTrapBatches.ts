import type {
  QueryResolvers,
  MutationResolvers,
  CameraTrapBatchResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';
import { createMediavaletCategory } from '../mediavaletCategories/mediavaletCategories';
import { format, formatISO9075 } from 'date-fns';

// export const cameraTrapBatches: QueryResolvers['cameraTrapBatches'] = () => {
//   return db.cameraTrapBatch.findMany();
// };

export const cameraTrapBatches: QueryResolvers['cameraTrapBatches'] = ({
  status = undefined,
  cameraTrapId = undefined,
}) => {
  return db.cameraTrapBatch.findMany({ where: { status, cameraTrapId } });
};

export const cameraTrapBatch: QueryResolvers['cameraTrapBatch'] = ({ id }) => {
  return db.cameraTrapBatch.findUnique({
    where: { id },
  });
};

export const createCameraTrapBatch: MutationResolvers['createCameraTrapBatch'] =
  async ({ input }) => {
    const cameraTrap = await db.cameraTrap.findUnique({
      where: { id: input.cameraTrapId },
      select: { deviceId: true, mediavaletCategoryId: true },
    });
    const formatDate = (date: string) =>
      formatISO9075(new Date(date), {
        format: 'basic',
        representation: 'complete',
      }).replace(' ', '_');

    const { id } = await createMediavaletCategory({
      input: {
        name: `${cameraTrap.deviceId}-${formatDate(
          input.dateStart
        )}-${formatDate(input.dateEnd)}`,
        parentId: cameraTrap.mediavaletCategoryId,
      },
    });

    return db.cameraTrapBatch.create({
      data: input,
    });
  };

export const updateCameraTrapBatch: MutationResolvers['updateCameraTrapBatch'] =
  ({ id, input }) => {
    return db.cameraTrapBatch.update({
      data: input,
      where: { id },
    });
  };

export const deleteCameraTrapBatch: MutationResolvers['deleteCameraTrapBatch'] =
  ({ id }) => {
    return db.cameraTrapBatch.delete({
      where: { id },
    });
  };

export const CameraTrapBatch: CameraTrapBatchResolvers = {
  cameraTrap: (_obj, { root }) =>
    db.cameraTrapBatch.findUnique({ where: { id: root.id } }).cameraTrap(),
  photos: (_obj, { root }) =>
    db.cameraTrapBatch.findUnique({ where: { id: root.id } }).photos(),
  cameraTrapBatchApprovals: (_obj, { root }) =>
    db.cameraTrapBatch
      .findUnique({ where: { id: root.id } })
      .cameraTrapBatchApprovals(),
};
