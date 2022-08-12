import { PropsWithChildren, useCallback, useState } from 'react';

import {
  IllustratedMessage,
  Heading,
  Content,
  Header,
  Footer,
  View,
  Image,
  Flex,
  Grid,
  ActionGroup,
  Item,
  Picker,
  Button,
  Text,
  repeat,
} from '@adobe/react-spectrum';
import { ViewStyleProps } from '@react-types/shared/src/style';
import ErrorIcon from '@spectrum-icons/illustrations/Error';
import NoResultsIcon from '@spectrum-icons/illustrations/NoSearchResults';
import Location from '@spectrum-icons/workflow/Location';
import { parse } from 'query-string';
import type {
  CameraTrapBatch,
  CameraTrapBatchesQuery,
  CameraTrapBatchesQueryVariables,
} from 'types/graphql';

import { Link, navigate, routes, useLocation } from '@redwoodjs/router';
import {
  CellSuccessProps,
  CellFailureProps,
  useMutation,
} from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

import LocaleDate from 'src/components/LocaleDate/LocaleDate';
import useUpdateQueryString from 'src/hooks/useUpdateQueryString';
import ImageBlock from 'src/components/ImageBlock/ImageBlock';

export const QUERY = gql`
  query CameraTrapBatchesQuery($status: String, $cameraTrapId: String) {
    cameraTrapBatches: cameraTrapBatches(
      status: $status
      cameraTrapId: $cameraTrapId
    ) {
      id
      location
      dateStart
      dateEnd
      photos {
        id
        thumb
      }
      cameraTrap {
        id
        deviceId
      }
    }
    cameraTraps {
      id
      deviceId
    }
  }
`;

function BatchContainer({
  children,
  width = '40rem',
  background = 'static-white',
  borderColor = 'light',
  borderWidth = 'thick',
}: PropsWithChildren<{
  width?: string;
  background?: ViewStyleProps['backgroundColor'];
  borderColor?: ViewStyleProps['borderColor'];
  borderWidth?: ViewStyleProps['borderWidth'];
}>) {
  return (
    <View
      borderRadius="medium"
      // padding="size-250"
      backgroundColor={background}
      // marginBottom={15}
      minHeight="size-1200"
      maxWidth="100%"
      width={width}
      borderColor={borderColor}
      borderWidth={borderWidth}
      padding="size-400"
      // width="80vw"
    >
      {children}
    </View>
  );
}

export const Loading = () => (
  <BatchContainer background="transparent" borderColor="transparent">
    <div>Loading...</div>
  </BatchContainer>
);

export const Empty = ({
  cameraTraps,
  cameraTrapBatches,
  variables,
  hideCameraSelector,
}) => (
  <>
    {!hideCameraSelector && (
      <CameraSelector {...{ cameraTraps, cameraTrapBatches, variables }} />
    )}
    <BatchContainer background="transparent" borderColor="transparent">
      <IllustratedMessage>
        <NoResultsIcon />
        <Heading>No Batches</Heading>
        <Content>
          <p>There are no batches of photos for this camera yet.</p>
          <p>
            Batches will appear here once there is a matching set of events
            collected from Survey123 for this camera. i.e. A placement followed
            by a collection or memory card change.
          </p>
        </Content>
      </IllustratedMessage>
    </BatchContainer>
  </>
);

export const Failure = ({
  cameraTraps,
  cameraTrapBatches,
  variables,
  error,
  hideCameraSelector,
}: CellFailureProps) => (
  <>
    {!hideCameraSelector && (
      <CameraSelector {...{ cameraTraps, cameraTrapBatches, variables }} />
    )}
    <BatchContainer background="transparent" borderColor="transparent">
      <IllustratedMessage>
        <ErrorIcon />
        <Heading>Failed to load batch</Heading>
        <Content>Error: {error.message}</Content>
      </IllustratedMessage>
    </BatchContainer>
  </>
);

function CameraSelector({ cameraTraps, cameraTrapBatches, variables }) {
  const statusMap = {
    approval: 'awaiting approval',
    signing: 'ready to sign',
    publishing: 'ready to publish',
    published: 'published',
  };
  const { search } = useLocation();
  const { camera: cameraUrl = 'all' } = parse(search);
  const [camera, setCamera] = useState<string | number>(String(cameraUrl));
  const updateQuery = useUpdateQueryString();

  const changeCamera = useCallback(
    (cameraId: string) => {
      updateQuery({ camera: cameraId === 'all' ? null : cameraId });
      setCamera(cameraId);
    },
    [setCamera, updateQuery]
  );

  return (
    <Flex marginBottom="size-250">
      <p>
        Found <strong>{cameraTrapBatches.length}</strong> Batch
        {cameraTrapBatches.length === 1 ? '' : 'es'}{' '}
        {statusMap[variables.status]} from
      </p>
      <Picker
        onSelectionChange={changeCamera}
        selectedKey={camera}
        marginStart="size-100"
        alignSelf="center"
      >
        <Item key="all">All Camera Traps</Item>
        {cameraTraps.map((cameraTrap) => (
          <Item key={cameraTrap.id}>{cameraTrap.deviceId}</Item>
        ))}
      </Picker>
    </Flex>
  );
}

const UPDATE_PHOTOS_FOR_BATCH_MUTATION = gql`
  mutation UpdateBatchPhotosMutation($input: UpdatePhotoForBatchInput!) {
    updatePhotosForBatch(input: $input) {
      count
    }
  }
`;

function CameraBatch({ cameraTrapBatch }) {
  const [updatePhotosForBatch] = useMutation(UPDATE_PHOTOS_FOR_BATCH_MUTATION, {
    onCompleted: () => {
      console.log('Updated');
      toast.success('Refreshed Photos');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleMenuAction = useCallback(
    (key: string) => {
      switch (key) {
        case 'viewCamera': {
          navigate(routes.cameraTrap({ id: cameraTrapBatch.cameraTrap.id }));
          break;
        }
        case 'viewBatch': {
          navigate(routes.cameraTrapBatch({ id: cameraTrapBatch.id }));
          break;
        }
        case 'startApproval': {
          break;
        }
        default: {
          break;
        }
      }
    },
    [cameraTrapBatch.id, cameraTrapBatch.cameraTrap.id]
  );

  return (
    <BatchContainer key={cameraTrapBatch.id}>
      <Grid
        areas={['content header', 'content sidebar', 'footer footer']}
        columns={['15em', 'auto']}
        rows={['auto', 'auto']}
        gap="size-100"
      >
        <Header gridArea="header">
          <Heading level={2} margin={0}>
            {cameraTrapBatch.cameraTrap.deviceId}:{' '}
            <Location size="S" alignSelf="center" color="notice" />
            {/* {cameraTrapBatch.} */}
          </Heading>
        </Header>

        <View gridArea="sidebar">
          <p style={{ textAlign: 'left' }}>
            This batch contains{' '}
            <strong>
              {cameraTrapBatch.photos.length} Photo
              {cameraTrapBatch.photos.length === 1 ? '' : 's'}
            </strong>{' '}
            captured between{' '}
            <strong>
              <LocaleDate dateString={cameraTrapBatch.dateStart} />
            </strong>
            &nbsp;and&nbsp;
            <strong>
              <LocaleDate dateString={cameraTrapBatch.dateEnd} />
            </strong>
          </p>
        </View>
        <View gridArea="content" paddingEnd="size-125">
          <ImageBlock photos={cameraTrapBatch.photos} />
        </View>
        <Footer gridArea="footer">
          <Flex
            alignItems="center"
            alignContent="center"
            justifyContent="space-between"
            marginTop="size-200"
          >
            <ActionGroup onAction={handleMenuAction} alignSelf="center">
              <Item key="viewBatch">View Batch Details</Item>
            </ActionGroup>
            <View>
              <Link
                to={routes.approveCameraTrapBatch({ id: cameraTrapBatch.id })}
              >
                <Button
                  variant="cta"
                  isDisabled={cameraTrapBatch.photos.length === 0}
                >
                  <Text>Start Approval</Text>
                </Button>
              </Link>
            </View>
          </Flex>
        </Footer>
      </Grid>
    </BatchContainer>
  );
}

export const Success = ({
  cameraTrapBatches,
  cameraTraps,
  variables,
  hideCameraSelector = false,
}: CellSuccessProps<CameraTrapBatchesQuery, CameraTrapBatchesQueryVariables> & {
  hideCameraSelector: boolean;
}) => {
  return (
    <>
      {!hideCameraSelector && (
        <CameraSelector {...{ cameraTraps, cameraTrapBatches, variables }} />
      )}
      <Grid
        width="80vw"
        marginTop="size-500"
        justifyContent="center"
        columnGap="size-200"
        columns={repeat('auto-fit', '40rem')}
        autoRows="auto-fit"
        rowGap="size-200"
      >
        {cameraTrapBatches.map((cameraTrapBatch: CameraTrapBatch) => (
          <CameraBatch
            key={cameraTrapBatch.id}
            cameraTrapBatch={cameraTrapBatch}
          />
        ))}
      </Grid>
    </>
  );
};
