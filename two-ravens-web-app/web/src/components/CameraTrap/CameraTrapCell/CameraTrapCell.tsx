import type { FindCameraTrapById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CameraTrap from 'src/components/CameraTrap/CameraTrap'

export const QUERY = gql`
  query FindCameraTrapById($id: String!) {
    cameraTrap: cameraTrap(id: $id) {
      id
      deviceId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CameraTrap not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrap }: CellSuccessProps<FindCameraTrapById>) => {
  return <CameraTrap cameraTrap={cameraTrap} />
}
