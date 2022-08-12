import { PropsWithChildren, useCallback } from 'react';

import {
  Button,
  Flex,
  Grid,
  SpectrumButtonProps,
  SpectrumStatusLightProps,
  StatusLight,
  Text,
  View,
  Well,
} from '@adobe/react-spectrum';
import type { AccountQuery } from 'types/graphql';

import {
  CellSuccessProps,
  CellFailureProps,
  useMutation,
} from '@redwoodjs/web';
import { useAuth } from '@redwoodjs/auth';

export const QUERY = gql`
  query FindAccountQuery($id: String!) {
    account: account(id: $id) {
      id
      docusignIntegrationStatus
      esriIntegrationStatus
      mediavaletIntegrationStatus
    }
  }
`;

const UPDATE_INTEGRATION_STATUS = gql`
  mutation UpdateAccountMediavaletStatus(
    $id: String!
    $input: UpdateAccountInput!
  ) {
    updateAccount(id: $id, input: $input) {
      id
      docusignIntegrationStatus
      esriIntegrationStatus
      mediavaletIntegrationStatus
    }
  }
`;

export const Loading = () => (
  <IntegrationsGrid>
    <div>Loading...</div>
  </IntegrationsGrid>
);

export const Empty = () => (
  <IntegrationsGrid>
    <div>Empty</div>
  </IntegrationsGrid>
);

export const Failure = ({ error }: CellFailureProps) => (
  <IntegrationsGrid>
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  </IntegrationsGrid>
);

const statusMap: Record<
  string,
  [
    SpectrumStatusLightProps['variant'],
    string,
    string,
    SpectrumButtonProps['variant']
  ]
> = {
  connected: ['positive', 'CONNECTED', 'Remove Connection', 'secondary'],
  unconnected: ['neutral', 'NOT SET UP', 'Begin Connection', 'cta'],
  error: ['negative', 'INTEGRATION ERROR', 'Remove Connection', 'negative'],
};

function IntegrationsGrid({
  children,
  hideHeader = false,
}: PropsWithChildren<{ hideHeader?: boolean }>) {
  return (
    <Grid
      areas={['header header header', 'docusign mediavalet esri']}
      columns={['1fr', '1fr', '1fr']}
      rows={['auto', '1fr', '1fr', '1fr']}
      minHeight="90vh"
      columnGap="size-500"
      maxWidth="90vw"
      marginX="auto"
    >
      {Boolean(!hideHeader) && (
        <View gridArea="header" marginBottom="size-1000">
          <h1>Integrations</h1>
          <Text>
            All three of the required integrations need to be connected for the
            proper functioning of this site. clientIDs and secrets can only be
            configured in the .env file.
          </Text>
        </View>
      )}
      {children}
    </Grid>
  );
}

function IntegrationPane({
  gridArea,
  title,
  status,
  description,
  onPress,
}: {
  gridArea: string;
  title: string;
  status: keyof typeof statusMap;
  description: string;
  onPress?: () => void;
}) {
  return (
    <View
      gridArea={gridArea}
      padding="size-400"
      borderRadius="medium"
      borderColor="default"
      borderWidth="thin"
      flex
    >
      <Flex direction="column" minHeight="100%">
        <View>
          <Flex alignItems="center">
            <View flexGrow={1}>
              <h2>{title}</h2>
            </View>
            <View>
              <StatusLight variant={statusMap[status][0]}>
                {statusMap[status][1]}
              </StatusLight>
            </View>
          </Flex>
        </View>
        <View flexGrow={1} marginBottom="size-200">
          <Well>
            <Text>{description}</Text>
          </Well>
        </View>
        {Boolean(onPress) ? (
          <View>
            <Button onPress={onPress} variant={statusMap[status][3]}>
              {statusMap[status][2]}
            </Button>
          </View>
        ) : (
          <Text>Configured in .env</Text>
        )}
      </Flex>
    </View>
  );
}

export const Success = ({ account }: CellSuccessProps<AccountQuery>) => {
  const [updateIntegrationStatus] = useMutation(UPDATE_INTEGRATION_STATUS);
  const { currentUser } = useAuth();

  const handleDocusign = useCallback(() => {
    if (account.docusignIntegrationStatus !== 'connected') {
      const SCOPES = ['signature', 'impersonation'].join('+');
      const consentUrl =
        `${process.env['DOCUSIGN_OAUTH_SERVER']}/oauth/auth?response_type=code&` +
        `scope=${SCOPES}&client_id=${process.env['DOCUSIGN_CLIENT_ID']}&` +
        `redirect_uri=${process.env['DOCUSIGN_CALLBACK_URL']}`;
      window.location = consentUrl;
    } else {
      updateIntegrationStatus({
        variables: {
          id: currentUser.accountId,
          input: { docusignIntegrationStatus: 'unconnected' },
        },
      });
    }
  }, [
    account.docusignIntegrationStatus,
    currentUser.accountId,
    updateIntegrationStatus,
  ]);

  const handleMediaValet = useCallback(() => {
    if (account.mediavaletIntegrationStatus !== 'connected') {
      const authURL = `${process.env['MEDIAVALET_AUTH_URL']}?response_type=code&client_id=${process.env['MEDIAVALET_CLIENT_ID']}&scope=api%20offline_access&redirect_uri=${process.env['MEDIAVALET_CALLBACK_URL']}`;
      window.location = authURL;
    } else {
      updateIntegrationStatus({
        variables: {
          id: currentUser.accountId,
          input: { mediavaletIntegrationStatus: 'unconnected' },
        },
      });
    }
  }, [
    account.mediavaletIntegrationStatus,
    currentUser.accountId,
    updateIntegrationStatus,
  ]);

  // const handleEsri = useCallback(() => {
  //   if (account.esriIntegrationStatus !== 'connected') {
  //     // const authURL = `${process.env['MEDIAVALET_AUTH_URL']}?response_type=code&client_id=${process.env['MEDIAVALET_CLIENT_ID']}&scope=api%20offline_access&redirect_uri=${process.env['MEDIAVALET_CALLBACK_URL']}`;
  //     // window.location = authURL;
  //   } else {
  //     updateIntegrationStatus({
  //       variables: {
  //         id: currentUser.accountId,
  //         input: { esriIntegrationStatus: 'unconnected' },
  //       },
  //     });
  //   }
  // }, [
  //   account.esriIntegrationStatus,
  //   currentUser.accountId,
  //   updateIntegrationStatus,
  // ]);

  const integrations = [
    {
      title: 'Docusign',
      description:
        'DocuSign is used to approve images for publication by multiple stakeholders.',
      gridArea: 'docusign',
      status: account.docusignIntegrationStatus,
      onPress: handleDocusign,
    },
    {
      title: 'MediaValet',
      description:
        'Camera Trap Images are loaded from MediaValet, and location data pushed back.',
      gridArea: 'mediavalet',
      status: account.mediavaletIntegrationStatus,
      onPress: handleMediaValet,
    },
    {
      title: 'Esri',
      description:
        'Survey123 Form submissions are collected to gather location data for camera traps in different date ranges.',
      gridArea: 'esri',
      status: 'connected', //account.esriIntegrationStatus,
      onPress: undefined, //handleEsri,
    },
  ];
  return (
    <IntegrationsGrid>
      {integrations.map((integration) => (
        <IntegrationPane key={integration.gridArea} {...integration} />
      ))}
    </IntegrationsGrid>
  );
};
