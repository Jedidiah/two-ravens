import type {
  QueryResolvers,
  MutationResolvers,
  CameraTrapEventResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const cameraTrapEvents: QueryResolvers['cameraTrapEvents'] = () => {
  return db.cameraTrapEvent.findMany();
};

export const cameraTrapEvent: QueryResolvers['cameraTrapEvent'] = ({ id }) => {
  return db.cameraTrapEvent.findUnique({
    where: { id },
  });
};

export const createCameraTrapEvent: MutationResolvers['createCameraTrapEvent'] =
  ({ input }) => {
    return db.cameraTrapEvent.create({
      data: input,
    });
  };

export const updateCameraTrapEvent: MutationResolvers['updateCameraTrapEvent'] =
  ({ id, input }) => {
    return db.cameraTrapEvent.update({
      data: input,
      where: { id },
    });
  };

export const deleteCameraTrapEvent: MutationResolvers['deleteCameraTrapEvent'] =
  ({ id }) => {
    return db.cameraTrapEvent.delete({
      where: { id },
    });
  };

export const CameraTrapEvent: CameraTrapEventResolvers = {
  cameraTrap: (_obj, { root }) =>
    db.cameraTrapEvent.findUnique({ where: { id: root.id } }).cameraTrap(),
};
