import type { Prisma } from '@prisma/client';

export const standard =
  defineScenario<Prisma.CameraTrapBatchApprovalCreateArgs>({
    cameraTrapBatchApproval: {
      one: {
        data: {
          approvedImages: 'String',
          rejectedImages: 'String',
          user: {
            create: {
              name: 'String',
              email: 'String4820040',
              hashedPassword: 'String',
              salt: 'String',
              account: { create: { name: 'String' } },
            },
          },
          cameraTrapBatch: {
            create: {
              dateStart: '2022-08-03T22:13:17Z',
              dateEnd: '2022-08-03T22:13:17Z',
              location: 'String',
              cameraTrap: { create: { deviceId: 'String6832336' } },
            },
          },
        },
      },
      two: {
        data: {
          approvedImages: 'String',
          rejectedImages: 'String',
          user: {
            create: {
              name: 'String',
              email: 'String589394',
              hashedPassword: 'String',
              salt: 'String',
              account: { create: { name: 'String' } },
            },
          },
          cameraTrapBatch: {
            create: {
              dateStart: '2022-08-03T22:13:17Z',
              dateEnd: '2022-08-03T22:13:17Z',
              location: 'String',
              cameraTrap: { create: { deviceId: 'String4106940' } },
            },
          },
        },
      },
    },
  });

export type StandardScenario = typeof standard;
