import type {
  QueryResolvers,
  MutationResolvers,
  CameraTrapBatchApprovalResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const cameraTrapBatchApprovals: QueryResolvers['cameraTrapBatchApprovals'] =
  () => {
    return db.cameraTrapBatchApproval.findMany();
  };

export const cameraTrapBatchApproval: QueryResolvers['cameraTrapBatchApproval'] =
  ({ id }) => {
    return db.cameraTrapBatchApproval.findUnique({
      where: { id },
    });
  };

export const createCameraTrapBatchApproval: MutationResolvers['createCameraTrapBatchApproval'] =
  ({ input }) => {
    return db.cameraTrapBatchApproval.create({
      data: input,
    });
  };

export const updateCameraTrapBatchApproval: MutationResolvers['updateCameraTrapBatchApproval'] =
  ({ id, input }) => {
    return db.cameraTrapBatchApproval.update({
      data: input,
      where: { id },
    });
  };

export const deleteCameraTrapBatchApproval: MutationResolvers['deleteCameraTrapBatchApproval'] =
  ({ id }) => {
    return db.cameraTrapBatchApproval.delete({
      where: { id },
    });
  };

export const CameraTrapBatchApproval: CameraTrapBatchApprovalResolvers = {
  user: (_obj, { root }) =>
    db.cameraTrapBatchApproval.findUnique({ where: { id: root.id } }).user(),
  cameraTrapBatch: (_obj, { root }) =>
    db.cameraTrapBatchApproval
      .findUnique({ where: { id: root.id } })
      .cameraTrapBatch(),
};
