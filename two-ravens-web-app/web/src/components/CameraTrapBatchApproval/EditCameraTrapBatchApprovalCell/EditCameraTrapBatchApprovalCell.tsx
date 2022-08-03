import type { EditCameraTrapBatchApprovalById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapBatchApprovalForm from 'src/components/CameraTrapBatchApproval/CameraTrapBatchApprovalForm'

export const QUERY = gql`
  query EditCameraTrapBatchApprovalById($id: String!) {
    cameraTrapBatchApproval: cameraTrapBatchApproval(id: $id) {
      id
      userId
      batchId
      approvedImages
      rejectedImages
    }
  }
`
const UPDATE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION = gql`
  mutation UpdateCameraTrapBatchApprovalMutation($id: String!, $input: UpdateCameraTrapBatchApprovalInput!) {
    updateCameraTrapBatchApproval(id: $id, input: $input) {
      id
      userId
      batchId
      approvedImages
      rejectedImages
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrapBatchApproval }: CellSuccessProps<EditCameraTrapBatchApprovalById>) => {
  const [updateCameraTrapBatchApproval, { loading, error }] = useMutation(UPDATE_CAMERA_TRAP_BATCH_APPROVAL_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapBatchApproval updated')
      navigate(routes.cameraTrapBatchApprovals())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateCameraTrapBatchApproval({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit CameraTrapBatchApproval {cameraTrapBatchApproval.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapBatchApprovalForm cameraTrapBatchApproval={cameraTrapBatchApproval} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
