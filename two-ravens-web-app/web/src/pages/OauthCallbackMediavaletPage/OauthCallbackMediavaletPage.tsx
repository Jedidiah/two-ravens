import { useEffect, useState } from 'react';

import {
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Header,
  Heading,
  IllustratedMessage,
  ProgressCircle,
  Text,
} from '@adobe/react-spectrum';
import Upload from '@spectrum-icons/illustrations/Timeout';
import { parse } from 'query-string';

import { useAuth } from '@redwoodjs/auth';
import { Link, navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const OauthCallbackMediavaletPage = () => {
  const { getToken } = useAuth();
  useEffect(() => {
    const a = async () => {
      const { code } = parse(document.location.search);
      const token = await getToken();
      const response = await fetch(
        `/.redwood/functions/oauthCallbackMediavalet?code=${code}`,
        {
          credentials: 'include',
          headers: {
            'auth-provider': 'dbAuth',
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast('Connected to MediaValet');
      } else {
        toast.error('MediaValet Integration Failed');
      }
      navigate(routes.integrations());
    };
    a();
  }, [getToken]);
  return (
    <>
      <MetaTags
        title="OauthCallbackMediavalet"
        description="OauthCallbackMediavalet page"
      />
      <DialogContainer onDismiss={() => {}}>
        {
          <Dialog>
            <Heading>Connecting to MediaValet</Heading>
            <Header>
              <ProgressCircle isIndeterminate aria-label="" />
            </Header>
            <Divider />
            <Content>
              <Text>Requesting access token&hellip;</Text>
            </Content>
          </Dialog>
        }
      </DialogContainer>
    </>
  );
};

export default OauthCallbackMediavaletPage;
