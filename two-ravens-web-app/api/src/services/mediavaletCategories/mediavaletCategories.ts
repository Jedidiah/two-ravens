import { stringify } from 'query-string';
import type { QueryResolvers, MutationResolvers } from 'types/graphql';

import { db } from 'src/lib/db';
import { mediavaletApi } from 'src/lib/mediavaletAuth';
import { logger } from 'src/lib/logger';

// Hardcoded here for the hackathon as all users are in one account and we've agreed to make a root category each
const ROOT_CATEGORY = '02476362-502f-4cd4-9f2e-9aea32ee2a15';

function formatCategory(
  category: { id?: string; name?: string; parentId?: string } = {}
) {
  const { id, name, parentId } = category;
  return { id, name, parentId };
}

export const mediavaletCameraTrapCategories: QueryResolvers['mediavaletCameraTrapCategories'] =
  async () => {
    const response = await mediavaletApi(
      'GET',
      `/categories/${ROOT_CATEGORY}/subcategories`
    );
    if (response.error) return [];

    return response.payload.map(formatCategory);
  };

export const mediavaletCategory: QueryResolvers['mediavaletCategory'] = async ({
  id: categoryId,
}) => {
  const response = await mediavaletApi('GET', `/categories/${categoryId}`);
  if (response.error) return null;
  return formatCategory(response.payload);
};

export const createMediavaletCategory: MutationResolvers['createMediavaletCategory'] =
  async ({ input }) => {
    const response = await mediavaletApi(
      'POST',
      `/categories`,
      stringify({
        parentId: input.parentId,
        treeName: input.name,
      })
    );
    // logger.info(JSON.stringify(response));
    if (response.error) return { id: response.error };
    return formatCategory(response.payload);
  };

// export const updateMediavaletCategory: MutationResolvers['updateMediavaletCategory'] =
//   ({ id, input }) => {
//     return db.mediavaletCategory.update({
//       data: input,
//       where: { id },
//     });
//   };

// export const deleteMediavaletCategory: MutationResolvers['deleteMediavaletCategory'] =
//   ({ id }) => {
//     return db.mediavaletCategory.delete({
//       where: { id },
//     });
//   };
