import humanize from 'humanize-string';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CameraTrapBatch/CameraTrapBatchesCell';

const DELETE_CAMERA_TRAP_BATCH_MUTATION = gql`
  mutation DeleteCameraTrapBatchMutation($id: String!) {
    deleteCameraTrapBatch(id: $id) {
      id
    }
  }
`;

const MAX_STRING_LENGTH = 150;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const truncate = (text) => {
  let output = text;
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }
  return output;
};

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2));
};

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const CameraTrapBatchesList = ({ cameraTrapBatches }) => {
  const [deleteCameraTrapBatch] = useMutation(
    DELETE_CAMERA_TRAP_BATCH_MUTATION,
    {
      onCompleted: () => {
        toast.success('CameraTrapBatch deleted');
      },
      onError: (error) => {
        toast.error(error.message);
      },
      // This refetches the query on the list page. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [{ query: QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete cameraTrapBatch ' + id + '?')
    ) {
      deleteCameraTrapBatch({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date start</th>
            <th>Date end</th>
            <th>Camera trap id</th>
            <th>Location</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cameraTrapBatches.map((cameraTrapBatch) => (
            <tr key={cameraTrapBatch.id}>
              <td>{truncate(cameraTrapBatch.id)}</td>
              <td>{timeTag(cameraTrapBatch.dateStart)}</td>
              <td>{timeTag(cameraTrapBatch.dateEnd)}</td>
              <td>{truncate(cameraTrapBatch.cameraTrapId)}</td>
              <td>{truncate(cameraTrapBatch.location)}</td>
              <td>{truncate(cameraTrapBatch.status)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.cameraTrapBatch({ id: cameraTrapBatch.id })}
                    title={
                      'Show cameraTrapBatch ' + cameraTrapBatch.id + ' detail'
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCameraTrapBatch({ id: cameraTrapBatch.id })}
                    title={'Edit cameraTrapBatch ' + cameraTrapBatch.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete cameraTrapBatch ' + cameraTrapBatch.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(cameraTrapBatch.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CameraTrapBatchesList;
