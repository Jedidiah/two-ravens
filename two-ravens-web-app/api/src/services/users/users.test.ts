import { users, user, createUser, updateUser, deleteUser } from './users';
import type { StandardScenario } from './users.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('users', () => {
  scenario('returns all users', async (scenario: StandardScenario) => {
    const result = await users();

    expect(result.length).toEqual(Object.keys(scenario.user).length);
  });

  scenario('returns a single user', async (scenario: StandardScenario) => {
    const result = await user({ id: scenario.user.one.id });

    expect(result).toEqual(scenario.user.one);
  });

  scenario('creates a user', async (scenario: StandardScenario) => {
    const result = await createUser({
      input: {
        name: 'String',
        email: 'String1439796',
        accountId: scenario.user.two.accountId,
        hashedPassword: 'String',
        salt: 'String',
      },
    });

    expect(result.name).toEqual('String');
    expect(result.email).toEqual('String1439796');
    expect(result.accountId).toEqual(scenario.user.two.accountId);
    expect(result.hashedPassword).toEqual('String');
    expect(result.salt).toEqual('String');
  });

  scenario('updates a user', async (scenario: StandardScenario) => {
    const original = await user({ id: scenario.user.one.id });
    const result = await updateUser({
      id: original.id,
      input: { name: 'String2' },
    });

    expect(result.name).toEqual('String2');
  });

  scenario('deletes a user', async (scenario: StandardScenario) => {
    const original = await deleteUser({ id: scenario.user.one.id });
    const result = await user({ id: original.id });

    expect(result).toEqual(null);
  });
});
