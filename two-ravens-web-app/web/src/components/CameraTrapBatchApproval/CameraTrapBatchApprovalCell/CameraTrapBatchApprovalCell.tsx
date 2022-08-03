import type { FindCameraTrapBatchApprovalById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CameraTrapBatchApproval from 'src/components/CameraTrapBatchApproval/CameraTrapBatchApproval'

export const QUERY = gql`
  query FindCameraTrapBatchApprovalById($id: String!) {
    cameraTrapBatchApproval: cameraTrapBatchApproval(id: $id) {
      id
      userId
      batchId
      approvedImages
      rejectedImages
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CameraTrapBatchApproval not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrapBatchApproval }: CellSuccessProps<FindCameraTrapBatchApprovalById>) => {
  return <CameraTrapBatchApproval cameraTrapBatchApproval={cameraTrapBatchApproval} />
}
