import type { EditCameraTrapEventById } from 'types/graphql';

import { navigate, routes } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import CameraTrapEventForm from 'src/components/CameraTrapEvent/CameraTrapEventForm';

export const QUERY = gql`
  query EditCameraTrapEventById($id: String!) {
    cameraTrapEvent: cameraTrapEvent(id: $id) {
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
const UPDATE_CAMERA_TRAP_EVENT_MUTATION = gql`
  mutation UpdateCameraTrapEventMutation(
    $id: String!
    $input: UpdateCameraTrapEventInput!
  ) {
    updateCameraTrapEvent(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  cameraTrapEvent,
}: CellSuccessProps<EditCameraTrapEventById>) => {
  const [updateCameraTrapEvent, { loading, error }] = useMutation(
    UPDATE_CAMERA_TRAP_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CameraTrapEvent updated');
        navigate(routes.cameraTrapEvents());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onSave = (input, id) => {
    updateCameraTrapEvent({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit CameraTrapEvent {cameraTrapEvent.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapEventForm
          cameraTrapEvent={cameraTrapEvent}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
