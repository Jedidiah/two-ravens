import { Breadcrumbs, Flex, Item, View } from '@adobe/react-spectrum';
import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import ApproveCameraTrapBatchCell from 'src/components/CameraTrapBatch/ApproveCameraTrapBatchCell';

const BatchApprovalPage = ({ id }: { id: string }) => {
  return (
    <>
      <MetaTags title="BatchApproval" description="BatchApproval page" />

      <ApproveCameraTrapBatchCell id={id} />
    </>
  );
};

export default BatchApprovalPage;
