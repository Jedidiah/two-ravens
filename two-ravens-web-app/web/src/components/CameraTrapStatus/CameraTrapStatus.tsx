import { useMemo } from 'react';

import { SpectrumStatusLightProps, StatusLight } from '@adobe/react-spectrum';
import { CameraTrapEvent } from 'types/graphql';

const CameraTrapStatus = (props: { latestEvent: Partial<CameraTrapEvent> }) => {
  const { cameraProcedure } = props.latestEvent ?? {};

  const status: {
    variant: SpectrumStatusLightProps['variant'];
    label: string;
  } = useMemo(() => {
    if (!cameraProcedure || cameraProcedure === 'camera_removed') {
      return { variant: 'neutral', label: 'RESTING' };
    }
    if (cameraProcedure === 'stolen') {
      return { variant: 'negative', label: 'NOT WORKING' };
    }
    return { variant: 'positive', label: 'ACTIVE' };
  }, [cameraProcedure]);

  return <StatusLight variant={status.variant}>{status.label}</StatusLight>;
};

export default CameraTrapStatus;
