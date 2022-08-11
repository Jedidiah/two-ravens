import type { FindCameraTrapEvents } from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CameraTrapEvents from 'src/components/CameraTrapEvent/CameraTrapEvents';

export const QUERY = gql`
  query FindCameraTrapEvents {
    cameraTrapEvents {
      id
      date
      cameraTrapId
      projectName
      staffName
      datetimeUpdated
      cameraLocation
      cameraProcedure
      cameraAttachmentPosition
      cameraHeight
      areaDeployed
      cameraMake
      cameraTarget
      cameraSitePhoto
      cameraWorking
      comments
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No cameraTrapEvents yet. '}
      <Link to={routes.newCameraTrapEvent()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  cameraTrapEvents,
}: CellSuccessProps<FindCameraTrapEvents>) => {
  return <CameraTrapEvents cameraTrapEvents={cameraTrapEvents} />;
};
