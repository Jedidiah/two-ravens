import EditCameraTrapBatchCell from 'src/components/CameraTrapBatch/EditCameraTrapBatchCell'

type CameraTrapBatchPageProps = {
  id: string
}

const EditCameraTrapBatchPage = ({ id }: CameraTrapBatchPageProps) => {
  return <EditCameraTrapBatchCell id={id} />
}

export default EditCameraTrapBatchPage
