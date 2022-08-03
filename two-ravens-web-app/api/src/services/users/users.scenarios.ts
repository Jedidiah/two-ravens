import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        name: 'String',
        email: 'String4988318',
        hashedPassword: 'String',
        salt: 'String',
        account: { create: { name: 'String' } },
      },
    },
    two: {
      data: {
        name: 'String',
        email: 'String7901856',
        hashedPassword: 'String',
        salt: 'String',
        account: { create: { name: 'String' } },
      },
    },
  },
});

export type StandardScenario = typeof standard;
