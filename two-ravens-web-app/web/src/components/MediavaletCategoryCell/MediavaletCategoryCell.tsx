import type {
  FindMediavaletCategoryQuery,
  FindMediavaletCategoryQueryVariables,
} from 'types/graphql';

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query FindMediavaletCategoryQuery($id: String!) {
    mediavaletCategory: mediavaletCategory(id: $id) {
      id
      name
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({
  error,
}: CellFailureProps<FindMediavaletCategoryQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({
  mediavaletCategory,
}: CellSuccessProps<
  FindMediavaletCategoryQuery,
  FindMediavaletCategoryQueryVariables
>) => {
  return <div>{JSON.stringify(mediavaletCategory)}</div>;
};
