import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapBatchForm from 'src/components/CameraTrapBatch/CameraTrapBatchForm'

const CREATE_CAMERA_TRAP_BATCH_MUTATION = gql`
  mutation CreateCameraTrapBatchMutation($input: CreateCameraTrapBatchInput!) {
    createCameraTrapBatch(input: $input) {
      id
    }
  }
`

const NewCameraTrapBatch = () => {
  const [createCameraTrapBatch, { loading, error }] = useMutation(CREATE_CAMERA_TRAP_BATCH_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapBatch created')
      navigate(routes.cameraTrapBatches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createCameraTrapBatch({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CameraTrapBatch</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapBatchForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCameraTrapBatch
