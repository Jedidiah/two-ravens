import CameraTrapBatchApprovalCell from 'src/components/CameraTrapBatchApproval/CameraTrapBatchApprovalCell'

type CameraTrapBatchApprovalPageProps = {
  id: string
}

const CameraTrapBatchApprovalPage = ({ id }: CameraTrapBatchApprovalPageProps) => {
  return <CameraTrapBatchApprovalCell id={id} />
}

export default CameraTrapBatchApprovalPage
