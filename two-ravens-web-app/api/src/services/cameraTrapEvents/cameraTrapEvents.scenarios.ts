import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CameraTrapEventCreateArgs>({
  cameraTrapEvent: {
    one: {
      data: {
        date: '2022-08-03T22:14:16Z',
        datetime_updated: '2022-08-03T22:14:16Z',
        cameraLocation: 'String',
        cameraProcedure: 'String',
        cameraWorking: true,
        cameraTrap: { create: { deviceId: 'String9357571' } },
      },
    },
    two: {
      data: {
        date: '2022-08-03T22:14:16Z',
        datetime_updated: '2022-08-03T22:14:16Z',
        cameraLocation: 'String',
        cameraProcedure: 'String',
        cameraWorking: true,
        cameraTrap: { create: { deviceId: 'String7011740' } },
      },
    },
  },
});

export type StandardScenario = typeof standard;
