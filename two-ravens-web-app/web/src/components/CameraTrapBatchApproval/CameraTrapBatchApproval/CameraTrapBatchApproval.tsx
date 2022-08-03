import humanize from 'humanize-string'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

const DELETE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION = gql`
  mutation DeleteCameraTrapBatchApprovalMutation($id: String!) {
    deleteCameraTrapBatchApproval(id: $id) {
      id
    }
  }
`

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const CameraTrapBatchApproval = ({ cameraTrapBatchApproval }) => {
  const [deleteCameraTrapBatchApproval] = useMutation(DELETE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapBatchApproval deleted')
      navigate(routes.cameraTrapBatchApprovals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cameraTrapBatchApproval ' + id + '?')) {
      deleteCameraTrapBatchApproval({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">CameraTrapBatchApproval {cameraTrapBatchApproval.id} Detail</h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{cameraTrapBatchApproval.id}</td>
            </tr><tr>
              <th>User id</th>
              <td>{cameraTrapBatchApproval.userId}</td>
            </tr><tr>
              <th>Batch id</th>
              <td>{cameraTrapBatchApproval.batchId}</td>
            </tr><tr>
              <th>Approved images</th>
              <td>{cameraTrapBatchApproval.approvedImages}</td>
            </tr><tr>
              <th>Rejected images</th>
              <td>{cameraTrapBatchApproval.rejectedImages}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editCameraTrapBatchApproval({ id: cameraTrapBatchApproval.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(cameraTrapBatchApproval.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default CameraTrapBatchApproval
