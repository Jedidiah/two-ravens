import type {
  QueryResolvers,
  MutationResolvers,
  CameraTrapResolvers,
} from 'types/graphql';

import { db } from 'src/lib/db';

export const cameraTraps: QueryResolvers['cameraTraps'] = () => {
  return db.cameraTrap.findMany({ orderBy: { deviceId: 'asc' } });
};

export const cameraTrap: QueryResolvers['cameraTrap'] = ({ id }) => {
  return db.cameraTrap.findUnique({
    where: { id },
  });
};

export const cameraTrapFromDeviceId: QueryResolvers['cameraTrapFromDeviceId'] =
  ({ deviceId }) => {
    return db.cameraTrap.findUnique({
      where: { deviceId },
    });
  };

export const createCameraTrap: MutationResolvers['createCameraTrap'] = ({
  input,
}) => {
  return db.cameraTrap.create({
    data: input,
  });
};

export const updateCameraTrap: MutationResolvers['updateCameraTrap'] = ({
  id,
  input,
}) => {
  return db.cameraTrap.update({
    data: input,
    where: { id },
  });
};

export const deleteCameraTrap: MutationResolvers['deleteCameraTrap'] = ({
  id,
}) => {
  return db.cameraTrap.delete({
    where: { id },
  });
};

export const CameraTrap: CameraTrapResolvers = {
  batches: (_obj, { root }) =>
    db.cameraTrap.findUnique({ where: { id: root.id } }).batches(),
  events: (_obj, { root }) =>
    db.cameraTrap
      .findUnique({ where: { id: root.id } })
      .events({ orderBy: { datetimeUpdated: 'desc' } }),
  photos: (_obj, { root }) =>
    db.cameraTrap.findUnique({ where: { id: root.id } }).photos(),
};
