import type {
  FindMediavaletAssetQuery,
  FindMediavaletAssetQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query FindMediavaletAssetQuery($id: String!) {
    mediavaletAsset: mediavaletAsset(id: $id) {
      id
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindMediavaletAssetQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({
  mediavaletAsset,
}: CellSuccessProps<
  FindMediavaletAssetQuery,
  FindMediavaletAssetQueryVariables
>) => {
  return <div>{JSON.stringify(mediavaletAsset)}</div>;
};
