import CameraTrapCell from 'src/components/CameraTrap/CameraTrapCell';

type CameraTrapPageProps = {
  id: string;
  tab?: string;
};

const CameraTrapPage = ({ id, tab }: CameraTrapPageProps) => {
  return <CameraTrapCell id={id} tab={tab} />;
};

export default CameraTrapPage;
