import EditCameraTrapEventCell from 'src/components/CameraTrapEvent/EditCameraTrapEventCell'

type CameraTrapEventPageProps = {
  id: string
}

const EditCameraTrapEventPage = ({ id }: CameraTrapEventPageProps) => {
  return <EditCameraTrapEventCell id={id} />
}

export default EditCameraTrapEventPage
