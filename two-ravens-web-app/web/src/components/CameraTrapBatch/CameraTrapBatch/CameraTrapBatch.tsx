import humanize from 'humanize-string';

import { Link, routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';
import { Document, Page, PDFViewer, Text } from '@react-pdf/renderer';
import PdfPhotoPage from 'src/components/PdfPhotoPage/PdfPhotoPage';

const DELETE_CAMERA_TRAP_BATCH_MUTATION = gql`
  mutation DeleteCameraTrapBatchMutation($id: String!) {
    deleteCameraTrapBatch(id: $id) {
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

const CameraTrapBatch = ({ cameraTrapBatch }) => {
  const [deleteCameraTrapBatch] = useMutation(
    DELETE_CAMERA_TRAP_BATCH_MUTATION,
    {
      onCompleted: () => {
        toast.success('CameraTrapBatch deleted');
        navigate(routes.cameraTrapBatches());
      },
      onError: (error) => {
        toast.error(error.message);
      },
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
    <>
      {/* <p>{JSON.stringify(cameraTrapBatch.photos)}</p> */}
      <PDFViewer
        style={{
          width: '100vw',
          maxWidth: '100%',
          height: '100%',
          minHeight: '70vh',
        }}
      >
        <Document title="Image Approval">
          {cameraTrapBatch.photos.map((photo, index) => {
            return (
              <PdfPhotoPage
                key={photo.large}
                photo={photo}
                index={index}
                total={cameraTrapBatch.photos.length}
              />
            );
          })}
        </Document>
      </PDFViewer>
    </>
  );

  // return (
  //   <>
  //     <div className="rw-segment">
  //       <header className="rw-segment-header">
  //         <h2 className="rw-heading rw-heading-secondary">CameraTrapBatch {cameraTrapBatch.id} Detail</h2>
  //       </header>
  //       <table className="rw-table">
  //         <tbody>
  //           <tr>
  //             <th>Id</th>
  //             <td>{cameraTrapBatch.id}</td>
  //           </tr><tr>
  //             <th>Date start</th>
  //             <td>{timeTag(cameraTrapBatch.dateStart)}</td>
  //           </tr><tr>
  //             <th>Date end</th>
  //             <td>{timeTag(cameraTrapBatch.dateEnd)}</td>
  //           </tr><tr>
  //             <th>Camera trap id</th>
  //             <td>{cameraTrapBatch.cameraTrapId}</td>
  //           </tr><tr>
  //             <th>Location</th>
  //             <td>{cameraTrapBatch.location}</td>
  //           </tr><tr>
  //             <th>Status</th>
  //             <td>{cameraTrapBatch.status}</td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //     <nav className="rw-button-group">
  //       <Link
  //         to={routes.editCameraTrapBatch({ id: cameraTrapBatch.id })}
  //         className="rw-button rw-button-blue"
  //       >
  //         Edit
  //       </Link>
  //       <button
  //         type="button"
  //         className="rw-button rw-button-red"
  //         onClick={() => onDeleteClick(cameraTrapBatch.id)}
  //       >
  //         Delete
  //       </button>
  //     </nav>
  //   </>
  // )
};

export default CameraTrapBatch;
