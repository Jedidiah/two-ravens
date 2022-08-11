import { useAuth } from '@redwoodjs/auth';
import { MetaTags } from '@redwoodjs/web';
import { useCallback } from 'react';
import CameraTrapBatchCell from 'src/components/CameraTrapBatch/CameraTrapBatchCell';

const SettingsPage = () => {
  const { getToken } = useAuth();
  const a = useCallback(async () => {
    const token = await getToken();

    await fetch(
      'https://ravens.ursaluna.studio/.redwood/functions/testRefesh',
      {
        credentials: 'include',
        headers: {
          'auth-provider': 'dbAuth',
          authorization: `Bearer ${token}`,
        },
      }
    );
  }, [getToken]);

  return (
    <>
      <MetaTags title="Settings" description="Settings page" />
      {/* <PDFViewer
        style={{
          width: '100vw',
          maxWidth: '100%',
          height: '90vh',
          border: 'none',
        }}
      >
        <TestPdf /> */}
      {/* </PDFViewer> */}
      <CameraTrapBatchCell id="cl6l5okaj0257z8owiaaqtb7f" />
    </>
  );
};

export default SettingsPage;
