import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PhotoCreateArgs>({
  photo: {
    one: {
      data: {
        date: '2022-08-03T22:13:04Z',
        url: 'String',
        cameraTrap: { create: { deviceId: 'String7895336' } },
      },
    },
    two: {
      data: {
        date: '2022-08-03T22:13:04Z',
        url: 'String',
        cameraTrap: { create: { deviceId: 'String8277836' } },
      },
    },
  },
});

export type StandardScenario = typeof standard;
