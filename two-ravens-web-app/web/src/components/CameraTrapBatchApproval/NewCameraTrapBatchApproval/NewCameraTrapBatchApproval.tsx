import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapBatchApprovalForm from 'src/components/CameraTrapBatchApproval/CameraTrapBatchApprovalForm'

const CREATE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION = gql`
  mutation CreateCameraTrapBatchApprovalMutation($input: CreateCameraTrapBatchApprovalInput!) {
    createCameraTrapBatchApproval(input: $input) {
      id
    }
  }
`

const NewCameraTrapBatchApproval = () => {
  const [createCameraTrapBatchApproval, { loading, error }] = useMutation(CREATE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapBatchApproval created')
      navigate(routes.cameraTrapBatchApprovals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createCameraTrapBatchApproval({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New CameraTrapBatchApproval</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapBatchApprovalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCameraTrapBatchApproval
