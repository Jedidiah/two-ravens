import {
  cameraTrapEvents,
  cameraTrapEvent,
  createCameraTrapEvent,
  updateCameraTrapEvent,
  deleteCameraTrapEvent,
} from './cameraTrapEvents';
import type { StandardScenario } from './cameraTrapEvents.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cameraTrapEvents', () => {
  scenario(
    'returns all cameraTrapEvents',
    async (scenario: StandardScenario) => {
      const result = await cameraTrapEvents();

      expect(result.length).toEqual(
        Object.keys(scenario.cameraTrapEvent).length
      );
    }
  );

  scenario(
    'returns a single cameraTrapEvent',
    async (scenario: StandardScenario) => {
      const result = await cameraTrapEvent({
        id: scenario.cameraTrapEvent.one.id,
      });

      expect(result).toEqual(scenario.cameraTrapEvent.one);
    }
  );

  scenario('creates a cameraTrapEvent', async (scenario: StandardScenario) => {
    const result = await createCameraTrapEvent({
      input: {
        date: '2022-08-03T22:14:16Z',
        cameraTrapId: scenario.cameraTrapEvent.two.cameraTrapId,
        datetime_updated: '2022-08-03T22:14:16Z',
        cameraLocation: 'String',
        cameraProcedure: 'String',
        cameraWorking: true,
      },
    });

    expect(result.date).toEqual('2022-08-03T22:14:16Z');
    expect(result.cameraTrapId).toEqual(
      scenario.cameraTrapEvent.two.cameraTrapId
    );
    expect(result.datetime_updated).toEqual('2022-08-03T22:14:16Z');
    expect(result.cameraLocation).toEqual('String');
    expect(result.cameraProcedure).toEqual('String');
    expect(result.cameraWorking).toEqual(true);
  });

  scenario('updates a cameraTrapEvent', async (scenario: StandardScenario) => {
    const original = await cameraTrapEvent({
      id: scenario.cameraTrapEvent.one.id,
    });
    const result = await updateCameraTrapEvent({
      id: original.id,
      input: { date: '2022-08-04T22:14:16Z' },
    });

    expect(result.date).toEqual('2022-08-04T22:14:16Z');
  });

  scenario('deletes a cameraTrapEvent', async (scenario: StandardScenario) => {
    const original = await deleteCameraTrapEvent({
      id: scenario.cameraTrapEvent.one.id,
    });
    const result = await cameraTrapEvent({ id: original.id });

    expect(result).toEqual(null);
  });
});
