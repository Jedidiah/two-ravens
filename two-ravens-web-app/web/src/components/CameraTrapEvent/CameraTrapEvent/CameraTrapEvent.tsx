import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

const DELETE_CAMERA_TRAP_EVENT_MUTATION = gql`
  mutation DeleteCameraTrapEventMutation($id: String!) {
    deleteCameraTrapEvent(id: $id) {
      id
    }
  }
`;

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

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
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

const CameraTrapEvent = ({ cameraTrapEvent }) => {
  const [deleteCameraTrapEvent] = useMutation(
    DELETE_CAMERA_TRAP_EVENT_MUTATION,
    {
      onCompleted: () => {
        toast.success('CameraTrapEvent deleted');
        navigate(routes.cameraTrapEvents());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  const onDeleteClick = (id) => {
    if (
      confirm('Are you sure you want to delete cameraTrapEvent ' + id + '?')
    ) {
      deleteCameraTrapEvent({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            CameraTrapEvent {cameraTrapEvent.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{cameraTrapEvent.id}</td>
            </tr>
            <tr>
              <th>Date</th>
              <td>{timeTag(cameraTrapEvent.date)}</td>
            </tr>
            <tr>
              <th>Camera trap id</th>
              <td>{cameraTrapEvent.cameraTrapId}</td>
            </tr>
            <tr>
              <th>Project name</th>
              <td>{cameraTrapEvent.projectName}</td>
            </tr>
            <tr>
              <th>Staff name</th>
              <td>{cameraTrapEvent.staffName}</td>
            </tr>
            <tr>
              <th>Datetime updated</th>
              <td>{timeTag(cameraTrapEvent.datetimeUpdated)}</td>
            </tr>
            <tr>
              <th>Camera location</th>
              <td>{cameraTrapEvent.cameraLocation}</td>
            </tr>
            <tr>
              <th>Camera procedure</th>
              <td>{cameraTrapEvent.cameraProcedure}</td>
            </tr>
            <tr>
              <th>Camera attachment position</th>
              <td>{cameraTrapEvent.cameraAttachmentPosition}</td>
            </tr>
            <tr>
              <th>Camera height</th>
              <td>{cameraTrapEvent.cameraHeight}</td>
            </tr>
            <tr>
              <th>Area deployed</th>
              <td>{cameraTrapEvent.areaDeployed}</td>
            </tr>
            <tr>
              <th>Camera make</th>
              <td>{cameraTrapEvent.cameraMake}</td>
            </tr>
            <tr>
              <th>Camera target</th>
              <td>{cameraTrapEvent.cameraTarget}</td>
            </tr>
            <tr>
              <th>Camera site photo</th>
              <td>{cameraTrapEvent.cameraSitePhoto}</td>
            </tr>
            <tr>
              <th>Camera working</th>
              <td>{checkboxInputTag(cameraTrapEvent.cameraWorking)}</td>
            </tr>
            <tr>
              <th>Comments</th>
              <td>{cameraTrapEvent.comments}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCameraTrapEvent({ id: cameraTrapEvent.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(cameraTrapEvent.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default CameraTrapEvent;
