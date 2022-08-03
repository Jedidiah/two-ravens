import CameraTrapCell from 'src/components/CameraTrap/CameraTrapCell'

type CameraTrapPageProps = {
  id: string
}

const CameraTrapPage = ({ id }: CameraTrapPageProps) => {
  return <CameraTrapCell id={id} />
}

export default CameraTrapPage
