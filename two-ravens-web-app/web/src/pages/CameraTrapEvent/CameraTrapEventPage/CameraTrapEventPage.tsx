import CameraTrapEventCell from 'src/components/CameraTrapEvent/CameraTrapEventCell'

type CameraTrapEventPageProps = {
  id: string
}

const CameraTrapEventPage = ({ id }: CameraTrapEventPageProps) => {
  return <CameraTrapEventCell id={id} />
}

export default CameraTrapEventPage
