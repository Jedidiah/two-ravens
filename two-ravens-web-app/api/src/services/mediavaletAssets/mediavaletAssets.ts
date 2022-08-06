import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';

export const mediavaletAssets: QueryResolvers['mediavaletAssets'] = () => {
  return db.mediavaletAsset.findMany();
};

export const mediavaletAsset: QueryResolvers['mediavaletAsset'] = ({ id }) => {
  return db.mediavaletAsset.findUnique({
    where: { id },
  });
};

export const createMediavaletAsset: MutationResolvers['createMediavaletAsset'] =
  ({ input }) => {
    return db.mediavaletAsset.create({
      data: input,
    });
  };

export const updateMediavaletAsset: MutationResolvers['updateMediavaletAsset'] =
  ({ id, input }) => {
    return db.mediavaletAsset.update({
      data: input,
      where: { id },
    });
  };

export const deleteMediavaletAsset: MutationResolvers['deleteMediavaletAsset'] =
  ({ id }) => {
    return db.mediavaletAsset.delete({
      where: { id },
    });
  };
