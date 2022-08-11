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
  ActionMenu,
  MenuTrigger,
  ActionButton,
  Menu,
  Picker,
} from '@adobe/react-spectrum';
import { ViewStyleProps } from '@react-types/shared/src/style';
import ErrorIcon from '@spectrum-icons/illustrations/Error';
import NoResultsIcon from '@spectrum-icons/illustrations/NoSearchResults';
import ChevronDown from '@spectrum-icons/workflow/ChevronDown';
import Location from '@spectrum-icons/workflow/Location';
import { parse } from 'query-string';
import type {
  CameraTrapBatch,
  CameraTrapBatchesQuery,
  CameraTrapBatchesQueryVariables,
} from 'types/graphql';
import type { CameraTrapBatchQueryVariables } from 'types/graphql';

import { navigate, routes, useLocation } from '@redwoodjs/router';
import {
  CellSuccessProps,
  CellFailureProps,
  useMutation,
} from '@redwoodjs/web';

import useUpdateQueryString from 'src/hooks/useUpdateQueryString';
import LocaleDate from 'src/components/LocaleDate/LocaleDate';
import { toast } from '@redwoodjs/web/dist/toast';

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

function ImageBlock(props: {
  photos: Array<{ __typename?: 'Photo'; id: string; thumb: string } | null>;
}) {
  const photos = props.photos.slice(0, 3);
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
        perspective: '1000px',
        padding: 0,
        margin: 0,
        textIndent: 0,
      }}
    >
      {photos.map((photo, index) => (
        <li
          key={photo.id}
          style={{
            zIndex: props.photos.length - index + 1,
            transform: `translateZ(-${175 * (index + index)}px) translateX(-${
              70 * index
            }px) rotateY(${(index + 1) * 20}deg)`,
            filter: `brightness(${1 - index * 0.15})`,
            background: 'white',
            padding: '6px 6px 9px 6px',
            boxShadow: 'rgba(0,0,0,0.3) 0px 3px 2px',
          }}
        >
          <Image
            alt=""
            width="size-1600"
            height="size-1600"
            src={photo.thumb}
            objectFit="cover"
          />
        </li>
      ))}
    </ul>
  );
}

function BatchContainer({
  children,
  width = '40rem',
  background = 'gray-200',
}: PropsWithChildren<{
  width?: string;
  background?: ViewStyleProps['backgroundColor'];
}>) {
  return (
    <View
      borderRadius="medium"
      padding="size-250"
      backgroundColor={background}
      marginBottom={15}
      minHeight="size-1200"
      maxWidth="100%"
      width={width}
    >
      {children}
    </View>
  );
}

export const Loading = () => (
  <BatchContainer background="transparent">
    <div>Loading...</div>
  </BatchContainer>
);

export const Empty = ({ cameraTraps, cameraTrapBatches, variables }) => (
  <>
    <CameraSelector {...{ cameraTraps, cameraTrapBatches, variables }} />
    <BatchContainer background="transparent">
      <IllustratedMessage>
        <NoResultsIcon />
        <Heading>List Empty</Heading>
        <Content>There are no batches with this status</Content>
      </IllustratedMessage>
    </BatchContainer>
  </>
);

export const Failure = ({
  cameraTraps,
  cameraTrapBatches,
  variables,
  error,
}: CellFailureProps) => (
  <>
    <CameraSelector {...{ cameraTraps, cameraTrapBatches, variables }} />
    <BatchContainer background="transparent">
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

  const cameraNameForId = (id: string | number) =>
    id === 'all'
      ? 'All Camera Traps'
      : cameraTraps.find((t) => t.id === id).deviceId;
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
        areas={['content header', 'content sidebar', 'content footer']}
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
          <Flex alignItems="start" justifyContent="center">
            <ActionGroup onAction={handleMenuAction}>
              <Item key="startApproval">Start Approval</Item>
              <Item key="viewBatch">Batch Details</Item>
              <Item key="viewCamera">View Camera Trap</Item>
            </ActionGroup>
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
}: CellSuccessProps<
  CameraTrapBatchesQuery,
  CameraTrapBatchesQueryVariables
>) => {
  return (
    <>
      <CameraSelector {...{ cameraTraps, cameraTrapBatches, variables }} />
      {cameraTrapBatches.map((cameraTrapBatch: CameraTrapBatch) => (
        <CameraBatch
          key={cameraTrapBatch.id}
          cameraTrapBatch={cameraTrapBatch}
        />
      ))}
    </>
  );
};
