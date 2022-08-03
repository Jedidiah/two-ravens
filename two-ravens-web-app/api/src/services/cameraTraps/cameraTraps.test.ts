import {
  cameraTraps,
  cameraTrap,
  createCameraTrap,
  updateCameraTrap,
  deleteCameraTrap,
} from './cameraTraps';
import type { StandardScenario } from './cameraTraps.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cameraTraps', () => {
  scenario('returns all cameraTraps', async (scenario: StandardScenario) => {
    const result = await cameraTraps();

    expect(result.length).toEqual(Object.keys(scenario.cameraTrap).length);
  });

  scenario(
    'returns a single cameraTrap',
    async (scenario: StandardScenario) => {
      const result = await cameraTrap({ id: scenario.cameraTrap.one.id });

      expect(result).toEqual(scenario.cameraTrap.one);
    }
  );

  scenario('creates a cameraTrap', async () => {
    const result = await createCameraTrap({
      input: { deviceId: 'String3936107' },
    });

    expect(result.deviceId).toEqual('String3936107');
  });

  scenario('updates a cameraTrap', async (scenario: StandardScenario) => {
    const original = await cameraTrap({ id: scenario.cameraTrap.one.id });
    const result = await updateCameraTrap({
      id: original.id,
      input: { deviceId: 'String24484372' },
    });

    expect(result.deviceId).toEqual('String24484372');
  });

  scenario('deletes a cameraTrap', async (scenario: StandardScenario) => {
    const original = await deleteCameraTrap({ id: scenario.cameraTrap.one.id });
    const result = await cameraTrap({ id: original.id });

    expect(result).toEqual(null);
  });
});
