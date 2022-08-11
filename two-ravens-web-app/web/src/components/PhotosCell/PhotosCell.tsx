import type { PhotosQuery } from 'types/graphql';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

export const QUERY = gql`
  query PhotosQuery {
    photos {
      id
      thumbnail
      title
      altText
      description
      date
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({ photos }: CellSuccessProps<PhotosQuery>) => {
  return (
    <ul>
      {photos.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>;
      })}
    </ul>
  );
};
