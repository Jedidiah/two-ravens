import type { FindCameraTraps } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CameraTraps from 'src/components/CameraTrap/CameraTraps';

export const QUERY = gql`
  query FindCameraTraps {
    cameraTraps {
      id
      deviceId
      manufacturer
      project
      batches {
        id
      }
      events {
        id
      }
      photos {
        id
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No Camera Traps yet. '}
      <Link to={routes.newCameraTrap()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ cameraTraps }: CellSuccessProps<FindCameraTraps>) => {
  return <CameraTraps cameraTraps={cameraTraps} />;
};
