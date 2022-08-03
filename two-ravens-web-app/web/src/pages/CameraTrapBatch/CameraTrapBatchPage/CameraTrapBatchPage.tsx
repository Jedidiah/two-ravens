import CameraTrapBatchCell from 'src/components/CameraTrapBatch/CameraTrapBatchCell'

type CameraTrapBatchPageProps = {
  id: string
}

const CameraTrapBatchPage = ({ id }: CameraTrapBatchPageProps) => {
  return <CameraTrapBatchCell id={id} />
}

export default CameraTrapBatchPage
