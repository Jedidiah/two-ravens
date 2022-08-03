import EditCameraTrapCell from 'src/components/CameraTrap/EditCameraTrapCell'

type CameraTrapPageProps = {
  id: string
}

const EditCameraTrapPage = ({ id }: CameraTrapPageProps) => {
  return <EditCameraTrapCell id={id} />
}

export default EditCameraTrapPage
