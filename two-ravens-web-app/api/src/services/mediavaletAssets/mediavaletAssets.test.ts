import {
  mediavaletAssets,
  mediavaletAsset,
  createMediavaletAsset,
  updateMediavaletAsset,
  deleteMediavaletAsset,
} from './mediavaletAssets';
import type { StandardScenario } from './mediavaletAssets.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('mediavaletAssets', () => {
  scenario(
    'returns all mediavaletAssets',
    async (scenario: StandardScenario) => {
      const result = await mediavaletAssets();

      expect(result.length).toEqual(
        Object.keys(scenario.mediavaletAsset).length
      );
    }
  );

  scenario(
    'returns a single mediavaletAsset',
    async (scenario: StandardScenario) => {
      const result = await mediavaletAsset({
        id: scenario.mediavaletAsset.one.id,
      });

      expect(result).toEqual(scenario.mediavaletAsset.one);
    }
  );

  scenario('creates a mediavaletAsset', async () => {
    const result = await createMediavaletAsset({
      input: {
        id: 'String',
        thumb: 'String',
        small: 'String',
        medium: 'String',
        large: 'String',
        original: 'String',
      },
    });

    expect(result.id).toEqual('String');
    expect(result.thumb).toEqual('String');
    expect(result.small).toEqual('String');
    expect(result.medium).toEqual('String');
    expect(result.large).toEqual('String');
    expect(result.original).toEqual('String');
  });

  scenario('updates a mediavaletAsset', async (scenario: StandardScenario) => {
    const original = await mediavaletAsset({
      id: scenario.mediavaletAsset.one.id,
    });
    const result = await updateMediavaletAsset({
      id: original.id,
      input: { id: 'String2' },
    });

    expect(result.id).toEqual('String2');
  });

  scenario('deletes a mediavaletAsset', async (scenario: StandardScenario) => {
    const original = await deleteMediavaletAsset({
      id: scenario.mediavaletAsset.one.id,
    });
    const result = await mediavaletAsset({ id: original.id });

    expect(result).toEqual(null);
  });
});
