import type { EditCameraTrapBatchById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CameraTrapBatchForm from 'src/components/CameraTrapBatch/CameraTrapBatchForm'

export const QUERY = gql`
  query EditCameraTrapBatchById($id: String!) {
    cameraTrapBatch: cameraTrapBatch(id: $id) {
      id
      dateStart
      dateEnd
      cameraTrapId
      location
      status
    }
  }
`
const UPDATE_CAMERA_TRAP_BATCH_MUTATION = gql`
  mutation UpdateCameraTrapBatchMutation($id: String!, $input: UpdateCameraTrapBatchInput!) {
    updateCameraTrapBatch(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ cameraTrapBatch }: CellSuccessProps<EditCameraTrapBatchById>) => {
  const [updateCameraTrapBatch, { loading, error }] = useMutation(UPDATE_CAMERA_TRAP_BATCH_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrapBatch updated')
      navigate(routes.cameraTrapBatches())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateCameraTrapBatch({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit CameraTrapBatch {cameraTrapBatch.id}</h2>
      </header>
      <div className="rw-segment-main">
        <CameraTrapBatchForm cameraTrapBatch={cameraTrapBatch} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
