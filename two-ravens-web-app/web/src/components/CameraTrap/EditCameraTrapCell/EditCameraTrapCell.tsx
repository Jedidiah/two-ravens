import type { EditCameraTrapById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapForm from 'src/components/CameraTrap/CameraTrapForm'

export const QUERY = gql`
  query EditCameraTrapById($id: String!) {
    cameraTrap: cameraTrap(id: $id) {
      id
      deviceId
    }
  }
`
const UPDATE_CAMERA_TRAP_MUTATION = gql`
  mutation UpdateCameraTrapMutation($id: String!, $input: UpdateCameraTrapInput!) {
    updateCameraTrap(id: $id, input: $input) {
      id
      deviceId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrap }: CellSuccessProps<EditCameraTrapById>) => {
  const [updateCameraTrap, { loading, error }] = useMutation(UPDATE_CAMERA_TRAP_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrap updated')
      navigate(routes.cameraTraps())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateCameraTrap({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit CameraTrap {cameraTrap.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapForm cameraTrap={cameraTrap} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
