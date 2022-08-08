import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CameraTrapCreateArgs>({
  cameraTrap: {
    one: { data: { deviceId: 'String3306593' } },
    two: { data: { deviceId: 'String541407' } },
  },
});

export type StandardScenario = typeof standard;
