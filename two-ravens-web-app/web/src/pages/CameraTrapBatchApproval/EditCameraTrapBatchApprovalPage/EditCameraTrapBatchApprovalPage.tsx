import EditCameraTrapBatchApprovalCell from 'src/components/CameraTrapBatchApproval/EditCameraTrapBatchApprovalCell'

type CameraTrapBatchApprovalPageProps = {
  id: string
}

const EditCameraTrapBatchApprovalPage = ({ id }: CameraTrapBatchApprovalPageProps) => {
  return <EditCameraTrapBatchApprovalCell id={id} />
}

export default EditCameraTrapBatchApprovalPage
