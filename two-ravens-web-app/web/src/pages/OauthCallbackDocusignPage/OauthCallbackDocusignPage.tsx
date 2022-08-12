import { useEffect } from 'react';

import {
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Header,
  Heading,
  ProgressCircle,
  Text,
} from '@adobe/react-spectrum';
import { parse } from 'query-string';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { MetaTags } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const OauthCallbackDocusignPage = () => {
  const { getToken } = useAuth();
  useEffect(() => {
    const a = async () => {
      const { code } = parse(document.location.search);
      const token = await getToken();
      const response = await fetch(
        `/.redwood/functions/oauthCallbackDocusign?code=${code}`,
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
        title="OauthCallbackDocusign"
        description="OauthCallbackDocusign page"
      />

      <DialogContainer onDismiss={() => {}}>
        {
          <Dialog>
            <Heading>Connecting to DocuSign</Heading>
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

export default OauthCallbackDocusignPage;
