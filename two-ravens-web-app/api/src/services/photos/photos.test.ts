import { photos, photo, createPhoto, updatePhoto, deletePhoto } from './photos';
import type { StandardScenario } from './photos.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('photos', () => {
  scenario('returns all photos', async (scenario: StandardScenario) => {
    const result = await photos();

    expect(result.length).toEqual(Object.keys(scenario.photo).length);
  });

  scenario('returns a single photo', async (scenario: StandardScenario) => {
    const result = await photo({ id: scenario.photo.one.id });

    expect(result).toEqual(scenario.photo.one);
  });

  scenario('creates a photo', async (scenario: StandardScenario) => {
    const result = await createPhoto({
      input: {
        date: '2022-08-08T22:05:26Z',
        cameraTrapId: scenario.photo.two.cameraTrapId,
        thumb: 'String',
        small: 'String',
        medium: 'String',
        large: 'String',
        original: 'String',
      },
    });

    expect(result.date).toEqual('2022-08-08T22:05:26Z');
    expect(result.cameraTrapId).toEqual(scenario.photo.two.cameraTrapId);
    expect(result.thumb).toEqual('String');
    expect(result.small).toEqual('String');
    expect(result.medium).toEqual('String');
    expect(result.large).toEqual('String');
    expect(result.original).toEqual('String');
  });

  scenario('updates a photo', async (scenario: StandardScenario) => {
    const original = await photo({ id: scenario.photo.one.id });
    const result = await updatePhoto({
      id: original.id,
      input: { date: '2022-08-09T22:05:26Z' },
    });

    expect(result.date).toEqual('2022-08-09T22:05:26Z');
  });

  scenario('deletes a photo', async (scenario: StandardScenario) => {
    const original = await deletePhoto({ id: scenario.photo.one.id });
    const result = await photo({ id: original.id });

    expect(result).toEqual(null);
  });
});
