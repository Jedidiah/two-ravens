import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.MediavaletCategoryCreateArgs>({
  mediavaletCategory: {
    one: { data: { id: 'String', name: 'String', parentId: 'String' } },
    two: { data: { id: 'String', name: 'String', parentId: 'String' } },
  },
});

export type StandardScenario = typeof standard;
