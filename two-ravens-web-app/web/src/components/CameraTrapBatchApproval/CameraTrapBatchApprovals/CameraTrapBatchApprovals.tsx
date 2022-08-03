import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CameraTrapBatchApproval/CameraTrapBatchApprovalsCell'

const DELETE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION = gql`
  mutation DeleteCameraTrapBatchApprovalMutation($id: String!) {
    deleteCameraTrapBatchApproval(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

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

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
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

const CameraTrapBatchApprovalsList = ({ cameraTrapBatchApprovals }) => {
  const [deleteCameraTrapBatchApproval] = useMutation(DELETE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapBatchApproval deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cameraTrapBatchApproval ' + id + '?')) {
      deleteCameraTrapBatchApproval({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Batch id</th>
            <th>Approved images</th>
            <th>Rejected images</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cameraTrapBatchApprovals.map((cameraTrapBatchApproval) => (
            <tr key={cameraTrapBatchApproval.id}>
              <td>{truncate(cameraTrapBatchApproval.id)}</td>
              <td>{truncate(cameraTrapBatchApproval.userId)}</td>
              <td>{truncate(cameraTrapBatchApproval.batchId)}</td>
              <td>{truncate(cameraTrapBatchApproval.approvedImages)}</td>
              <td>{truncate(cameraTrapBatchApproval.rejectedImages)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.cameraTrapBatchApproval({ id: cameraTrapBatchApproval.id })}
                    title={'Show cameraTrapBatchApproval ' + cameraTrapBatchApproval.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCameraTrapBatchApproval({ id: cameraTrapBatchApproval.id })}
                    title={'Edit cameraTrapBatchApproval ' + cameraTrapBatchApproval.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete cameraTrapBatchApproval ' + cameraTrapBatchApproval.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(cameraTrapBatchApproval.id)}
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
  )
}

export default CameraTrapBatchApprovalsList
