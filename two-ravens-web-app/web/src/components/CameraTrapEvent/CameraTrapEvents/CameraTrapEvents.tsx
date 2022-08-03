import humanize from 'humanize-string'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/CameraTrapEvent/CameraTrapEventsCell'

const DELETE_CAMERA_TRAP_EVENT_MUTATION = gql`
  mutation DeleteCameraTrapEventMutation($id: String!) {
    deleteCameraTrapEvent(id: $id) {
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

const CameraTrapEventsList = ({ cameraTrapEvents }) => {
  const [deleteCameraTrapEvent] = useMutation(DELETE_CAMERA_TRAP_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapEvent deleted')
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
    if (confirm('Are you sure you want to delete cameraTrapEvent ' + id + '?')) {
      deleteCameraTrapEvent({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Date</th>
            <th>Camera trap id</th>
            <th>Project name</th>
            <th>Staff name</th>
            <th>Datetime updated</th>
            <th>Camera location</th>
            <th>Camera procedure</th>
            <th>Camera attachment position</th>
            <th>Camera height</th>
            <th>Area deployed</th>
            <th>Camera make</th>
            <th>Camera target</th>
            <th>Camera site photo</th>
            <th>Camera working</th>
            <th>Comments</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {cameraTrapEvents.map((cameraTrapEvent) => (
            <tr key={cameraTrapEvent.id}>
              <td>{truncate(cameraTrapEvent.id)}</td>
              <td>{timeTag(cameraTrapEvent.date)}</td>
              <td>{truncate(cameraTrapEvent.cameraTrapId)}</td>
              <td>{truncate(cameraTrapEvent.projectName)}</td>
              <td>{truncate(cameraTrapEvent.staffName)}</td>
              <td>{timeTag(cameraTrapEvent.datetime_updated)}</td>
              <td>{truncate(cameraTrapEvent.cameraLocation)}</td>
              <td>{truncate(cameraTrapEvent.cameraProcedure)}</td>
              <td>{truncate(cameraTrapEvent.cameraAttachmentPosition)}</td>
              <td>{truncate(cameraTrapEvent.cameraHeight)}</td>
              <td>{truncate(cameraTrapEvent.areaDeployed)}</td>
              <td>{truncate(cameraTrapEvent.cameraMake)}</td>
              <td>{truncate(cameraTrapEvent.cameraTarget)}</td>
              <td>{truncate(cameraTrapEvent.cameraSitePhoto)}</td>
              <td>{checkboxInputTag(cameraTrapEvent.cameraWorking)}</td>
              <td>{truncate(cameraTrapEvent.comments)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.cameraTrapEvent({ id: cameraTrapEvent.id })}
                    title={'Show cameraTrapEvent ' + cameraTrapEvent.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editCameraTrapEvent({ id: cameraTrapEvent.id })}
                    title={'Edit cameraTrapEvent ' + cameraTrapEvent.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete cameraTrapEvent ' + cameraTrapEvent.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(cameraTrapEvent.id)}
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

export default CameraTrapEventsList
