import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapForm from 'src/components/CameraTrap/CameraTrapForm'

const CREATE_CAMERA_TRAP_MUTATION = gql`
  mutation CreateCameraTrapMutation($input: CreateCameraTrapInput!) {
    createCameraTrap(input: $input) {
      id
    }
  }
`

const NewCameraTrap = () => {
  const [createCameraTrap, { loading, error }] = useMutation(CREATE_CAMERA_TRAP_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrap created')
      navigate(routes.cameraTraps())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createCameraTrap({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CameraTrap</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCameraTrap
