import {
  cameraTrapBatches,
  cameraTrapBatch,
  createCameraTrapBatch,
  updateCameraTrapBatch,
  deleteCameraTrapBatch,
} from './cameraTrapBatches';
import type { StandardScenario } from './cameraTrapBatches.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cameraTrapBatches', () => {
  scenario(
    'returns all cameraTrapBatches',
    async (scenario: StandardScenario) => {
      const result = await cameraTrapBatches();

      expect(result.length).toEqual(
        Object.keys(scenario.cameraTrapBatch).length
      );
    }
  );

  scenario(
    'returns a single cameraTrapBatch',
    async (scenario: StandardScenario) => {
      const result = await cameraTrapBatch({
        id: scenario.cameraTrapBatch.one.id,
      });

      expect(result).toEqual(scenario.cameraTrapBatch.one);
    }
  );

  scenario('creates a cameraTrapBatch', async (scenario: StandardScenario) => {
    const result = await createCameraTrapBatch({
      input: {
        dateStart: '2022-08-03T22:14:39Z',
        dateEnd: '2022-08-03T22:14:39Z',
        cameraTrapId: scenario.cameraTrapBatch.two.cameraTrapId,
        location: 'String',
      },
    });

    expect(result.dateStart).toEqual('2022-08-03T22:14:39Z');
    expect(result.dateEnd).toEqual('2022-08-03T22:14:39Z');
    expect(result.cameraTrapId).toEqual(
      scenario.cameraTrapBatch.two.cameraTrapId
    );
    expect(result.location).toEqual('String');
  });

  scenario('updates a cameraTrapBatch', async (scenario: StandardScenario) => {
    const original = await cameraTrapBatch({
      id: scenario.cameraTrapBatch.one.id,
    });
    const result = await updateCameraTrapBatch({
      id: original.id,
      input: { dateStart: '2022-08-04T22:14:39Z' },
    });

    expect(result.dateStart).toEqual('2022-08-04T22:14:39Z');
  });

  scenario('deletes a cameraTrapBatch', async (scenario: StandardScenario) => {
    const original = await deleteCameraTrapBatch({
      id: scenario.cameraTrapBatch.one.id,
    });
    const result = await cameraTrapBatch({ id: original.id });

    expect(result).toEqual(null);
  });
});
