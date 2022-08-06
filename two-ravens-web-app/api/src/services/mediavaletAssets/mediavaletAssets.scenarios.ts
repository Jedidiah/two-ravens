import type { Prisma } from '@prisma/client';

export const standard = defineScenario<Prisma.MediavaletAssetCreateArgs>({
  mediavaletAsset: {
    one: {
      data: {
        id: 'String',
        thumb: 'String',
        small: 'String',
        medium: 'String',
        large: 'String',
        original: 'String',
      },
    },
    two: {
      data: {
        id: 'String',
        thumb: 'String',
        small: 'String',
        medium: 'String',
        large: 'String',
        original: 'String',
      },
    },
  },
});

export type StandardScenario = typeof standard;
