import type { FindCameraTrapBatchApprovals } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CameraTrapBatchApprovals from 'src/components/CameraTrapBatchApproval/CameraTrapBatchApprovals'

export const QUERY = gql`
  query FindCameraTrapBatchApprovals {
    cameraTrapBatchApprovals {
      id
      userId
      batchId
      approvedImages
      rejectedImages
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No cameraTrapBatchApprovals yet. '}
      <Link
        to={routes.newCameraTrapBatchApproval()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrapBatchApprovals }: CellSuccessProps<FindCameraTrapBatchApprovals>) => {
  return <CameraTrapBatchApprovals cameraTrapBatchApprovals={cameraTrapBatchApprovals} />
}
