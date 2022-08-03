import type { FindCameraTrapEventById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import CameraTrapEvent from 'src/components/CameraTrapEvent/CameraTrapEvent'

export const QUERY = gql`
  query FindCameraTrapEventById($id: String!) {
    cameraTrapEvent: cameraTrapEvent(id: $id) {
      id
      date
      cameraTrapId
      projectName
      staffName
      datetime_updated
      cameraLocation
      cameraProcedure
      cameraAttachmentPosition
      cameraHeight
      areaDeployed
      cameraMake
      cameraTarget
      cameraSitePhoto
      cameraWorking
      comments
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>CameraTrapEvent not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrapEvent }: CellSuccessProps<FindCameraTrapEventById>) => {
  return <CameraTrapEvent cameraTrapEvent={cameraTrapEvent} />
}
