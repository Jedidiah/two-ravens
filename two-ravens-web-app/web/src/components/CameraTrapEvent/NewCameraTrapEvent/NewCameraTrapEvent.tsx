import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapEventForm from 'src/components/CameraTrapEvent/CameraTrapEventForm'

const CREATE_CAMERA_TRAP_EVENT_MUTATION = gql`
  mutation CreateCameraTrapEventMutation($input: CreateCameraTrapEventInput!) {
    createCameraTrapEvent(input: $input) {
      id
    }
  }
`

const NewCameraTrapEvent = () => {
  const [createCameraTrapEvent, { loading, error }] = useMutation(CREATE_CAMERA_TRAP_EVENT_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapEvent created')
      navigate(routes.cameraTrapEvents())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createCameraTrapEvent({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CameraTrapEvent</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapEventForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCameraTrapEvent
