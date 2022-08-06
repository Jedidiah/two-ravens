import {
  mediavaletCategories,
  mediavaletCategory,
  createMediavaletCategory,
  updateMediavaletCategory,
  deleteMediavaletCategory,
} from './mediavaletCategories';
import type { StandardScenario } from './mediavaletCategories.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('mediavaletCategories', () => {
  scenario(
    'returns all mediavaletCategories',
    async (scenario: StandardScenario) => {
      const result = await mediavaletCategories();

      expect(result.length).toEqual(
        Object.keys(scenario.mediavaletCategory).length
      );
    }
  );

  scenario(
    'returns a single mediavaletCategory',
    async (scenario: StandardScenario) => {
      const result = await mediavaletCategory({
        id: scenario.mediavaletCategory.one.id,
      });

      expect(result).toEqual(scenario.mediavaletCategory.one);
    }
  );

  scenario('creates a mediavaletCategory', async () => {
    const result = await createMediavaletCategory({
      input: { id: 'String', name: 'String', parentId: 'String' },
    });

    expect(result.id).toEqual('String');
    expect(result.name).toEqual('String');
    expect(result.parentId).toEqual('String');
  });

  scenario(
    'updates a mediavaletCategory',
    async (scenario: StandardScenario) => {
      const original = await mediavaletCategory({
        id: scenario.mediavaletCategory.one.id,
      });
      const result = await updateMediavaletCategory({
        id: original.id,
        input: { id: 'String2' },
      });

      expect(result.id).toEqual('String2');
    }
  );

  scenario(
    'deletes a mediavaletCategory',
    async (scenario: StandardScenario) => {
      const original = await deleteMediavaletCategory({
        id: scenario.mediavaletCategory.one.id,
      });
      const result = await mediavaletCategory({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
