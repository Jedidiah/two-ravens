import type { FindCameraTrapBatchById } from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import ApproveCameraTrapBatch from 'src/components/CameraTrapBatch/ApproveCameraTrapBatch';

export const QUERY = gql`
  query FindCameraTrapBatchById($id: String!) {
    cameraTrapBatch: cameraTrapBatch(id: $id) {
      id
      dateStart
      dateEnd
      cameraTrapId
      location
      status
      dateStart
      dateEnd
      cameraTrap {
        id
        deviceId
      }
      photos {
        title
        large
        thumb
        cameraTrap {
          deviceId
        }
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>CameraTrapBatch not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({
  cameraTrapBatch,
}: CellSuccessProps<FindCameraTrapBatchById>) => {
  return <ApproveCameraTrapBatch cameraTrapBatch={cameraTrapBatch} />;
};
