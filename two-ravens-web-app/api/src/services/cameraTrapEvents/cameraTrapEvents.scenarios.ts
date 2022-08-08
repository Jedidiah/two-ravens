import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CameraTrapEventCreateArgs>({
  cameraTrapEvent: {
    one: {
      data: {
        cameraLocation: 'String',
        cameraProcedure: 'String',
        cameraWorking: true,
        date: '2022-08-08T01:19:03Z',
        datetimeUpdated: '2022-08-08T01:19:03Z',
        deviceId: 'String',
      },
    },
    two: {
      data: {
        cameraLocation: 'String',
        cameraProcedure: 'String',
        cameraWorking: true,
        date: '2022-08-08T01:19:03Z',
        datetimeUpdated: '2022-08-08T01:19:03Z',
        deviceId: 'String',
      },
    },
  },
});

export type StandardScenario = typeof standard;
