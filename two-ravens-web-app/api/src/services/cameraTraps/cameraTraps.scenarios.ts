import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.CameraTrapCreateArgs>({
  cameraTrap: {
    one: { data: { deviceId: 'String2873347' } },
    two: { data: { deviceId: 'String929028' } },
  },
});

export type StandardScenario = typeof standard;
