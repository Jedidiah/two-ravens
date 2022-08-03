import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CameraTrapBatchCreateArgs>({
  cameraTrapBatch: {
    one: {
      data: {
        dateStart: '2022-08-03T22:14:39Z',
        dateEnd: '2022-08-03T22:14:39Z',
        location: 'String',
        cameraTrap: { create: { deviceId: 'String9552271' } },
      },
    },
    two: {
      data: {
        dateStart: '2022-08-03T22:14:39Z',
        dateEnd: '2022-08-03T22:14:39Z',
        location: 'String',
        cameraTrap: { create: { deviceId: 'String8665604' } },
      },
    },
  },
});

export type StandardScenario = typeof standard;
