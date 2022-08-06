import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';

import IntegrationsCell from 'src/components/IntegrationsCell';

const IntegrationsPage = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <MetaTags title="Integrations" description="Integrations page" />
      <IntegrationsCell id={currentUser.accountId} />
    </>
  );
};

export default IntegrationsPage;
