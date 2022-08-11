import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.PhotoCreateArgs>({
  photo: {
    one: {
      data: {
        date: '2022-08-08T22:05:26Z',
        thumb: 'String',
        small: 'String',
        medium: 'String',
        large: 'String',
        original: 'String',
        cameraTrap: { create: { deviceId: 'String9070960' } },
      },
    },
    two: {
      data: {
        date: '2022-08-08T22:05:26Z',
        thumb: 'String',
        small: 'String',
        medium: 'String',
        large: 'String',
        original: 'String',
        cameraTrap: { create: { deviceId: 'String1032351' } },
      },
    },
  },
});

export type StandardScenario = typeof standard;
