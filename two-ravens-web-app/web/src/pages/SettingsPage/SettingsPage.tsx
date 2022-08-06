import { Button } from '@adobe/react-spectrum';
import { useAuth } from '@redwoodjs/auth';
import { Link, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { useCallback, useEffect } from 'react';
import MediavaletCategoryCell from 'src/components/MediavaletCategoryCell';

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

      <h1>SettingsPage</h1>
      <p>
        Find me in <code>./web/src/pages/SettingsPage/SettingsPage.tsx</code>
      </p>
      <p>
        My default route is named <code>settings</code>, link to me with `
        <Link to={routes.settings()}>Settings</Link>`
      </p>
      <Button variant="cta" onPress={a}>
        Function
      </Button>
      <MediavaletCategoryCell id="614d9567-e602-40cf-9c46-36c8c125a124" />
    </>
  );
};

export default SettingsPage;
