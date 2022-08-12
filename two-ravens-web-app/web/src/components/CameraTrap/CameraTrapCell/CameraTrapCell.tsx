import type { FindCameraTrapById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import CameraTrap from 'src/components/CameraTrap/CameraTrap';

export const QUERY = gql`
  query FindCameraTrapById($id: String!) {
    cameraTrap: cameraTrap(id: $id) {
      id
      deviceId
      manufacturer
      project
      batches {
        id
      }
      events {
        areaDeployed
        cameraAttachmentPosition
        cameraHeight
        cameraLocation
        cameraMake
        cameraProcedure
        cameraSitePhoto
        cameraTarget
        cameraWorking
        comments
        date
        datetimeUpdated
        deviceId
        gisLink
        id
        projectName
        staffName
        userEmail
        userFullname
        userUsername
      }
      photos {
        id
      }
      mediavaletCategoryId
      mediavaletDownloadsFolderId
    }
    cameraTraps {
      id
      deviceId
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Camera Trap not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  cameraTrap,
  cameraTraps,
  tab,
}: CellSuccessProps<FindCameraTrapById> & { tab?: string }) => {
  return (
    <CameraTrap cameraTrap={cameraTrap} cameraTraps={cameraTraps} tab={tab} />
  );
};
