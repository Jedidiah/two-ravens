import type {
  QueryResolvers,
  MutationResolvers,
  CameraTrapBatchResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const cameraTrapBatches: QueryResolvers['cameraTrapBatches'] = () => {
  return db.cameraTrapBatch.findMany();
};

export const cameraTrapBatch: QueryResolvers['cameraTrapBatch'] = ({ id }) => {
  return db.cameraTrapBatch.findUnique({
    where: { id },
  });
};

export const createCameraTrapBatch: MutationResolvers['createCameraTrapBatch'] =
  ({ input }) => {
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
