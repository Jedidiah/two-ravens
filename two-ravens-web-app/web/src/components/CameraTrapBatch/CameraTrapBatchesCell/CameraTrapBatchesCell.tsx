import type { FindCameraTrapBatches } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CameraTrapBatches from 'src/components/CameraTrapBatch/CameraTrapBatches'

export const QUERY = gql`
  query FindCameraTrapBatches {
    cameraTrapBatches {
      id
      dateStart
      dateEnd
      cameraTrapId
      location
      status
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No cameraTrapBatches yet. '}
      <Link
        to={routes.newCameraTrapBatch()}
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

export const Success = ({ cameraTrapBatches }: CellSuccessProps<FindCameraTrapBatches>) => {
  return <CameraTrapBatches cameraTrapBatches={cameraTrapBatches} />
}
