import { useCallback, useMemo } from 'react';

import {
  Breadcrumbs,
  Divider,
  Flex,
  Heading,
  Item,
  TabList,
  TabPanels,
  Tabs,
  View,
  Text,
  Well,
  StatusLight,
  ActionGroup,
  SpectrumStatusLightProps,
} from '@adobe/react-spectrum';
import { Icon } from '@react-spectrum/icon';
import Image from '@spectrum-icons/workflow/Image';
import ImageAdd from '@spectrum-icons/workflow/ImageAdd';
import ImageCheck from '@spectrum-icons/workflow/ImageCheck';
import Info from '@spectrum-icons/workflow/Info';
import LocationBasedEvent from '@spectrum-icons/workflow/LocationBasedEvent';
import MapView from '@spectrum-icons/workflow/MapView';
import humanize from 'humanize-string';
import { HiOutlineQrcode } from 'react-icons/hi';

import { routes, navigate } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import EventList from 'src/components/EventList/EventList';
import MediavaletAssetsCell from 'src/components/MediavaletAssetsCell';
import CameraTrapQrCode from 'src/components/CameraTrapQRCode/CameraTrapQRCode';
import CameraTrapStatus from 'src/components/CameraTrapStatus/CameraTrapStatus';
import EventLocationsMap from 'src/components/EventLocationsMap/EventLocationsMap';

const DELETE_CAMERA_TRAP_MUTATION = gql`
  mutation DeleteCameraTrapMutation($id: String!) {
    deleteCameraTrap(id: $id) {
      id
    }
  }
`;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  );
};

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const CameraTrap = ({ cameraTrap }) => {
  const [deleteCameraTrap] = useMutation(DELETE_CAMERA_TRAP_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrap deleted');
      navigate(routes.cameraTraps());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cameraTrap ' + id + '?')) {
      deleteCameraTrap({ variables: { id } });
    }
  };

  const handleBreadcrumbs = useCallback(() => {
    navigate(routes.cameraTraps());
  }, []);

  const switchTab = useCallback((_newStatus: string) => {
    // updateQuery({ status: newStatus });
  }, []);

  const onActionPress = useCallback((key: string) => {
    if (key.startsWith('view-')) {
      const id = key.replace('view-', '');
      navigate(routes.cameraTrap({ id }));
    }
    if (key.startsWith('viewBatches-')) {
      const id = key.replace('viewBatches-', '');
      navigate(routes.cameraTrapBatches({ camera: id }));
    }
  }, []);

  return (
    <>
      <Tabs
        aria-label="Camera Trap Batch Statuses"
        onSelectionChange={switchTab}
        defaultSelectedKey={String(status)}
      >
        <Flex
          direction="row"
          marginTop="size-500"
          alignContent="stretch"
          height="size-600"
        >
          <View alignSelf="center" width="size-3400" maxWidth="20vw">
            <Breadcrumbs onAction={handleBreadcrumbs}>
              <Item key="cameraTraps">Camera Traps</Item>
              <Item key="newCameraTrap">{cameraTrap.deviceId}</Item>
            </Breadcrumbs>
          </View>
          <View flexGrow={1} paddingStart="size-500">
            <TabList>
              <Item key="overview">
                <Info />
                <Text marginEnd="size-200">Overview</Text>
              </Item>
              <Item key="events">
                <LocationBasedEvent />
                <Text marginEnd="size-200">Event Log</Text>
              </Item>
              <Item key="qrcode">
                <Icon>
                  <HiOutlineQrcode />
                </Icon>
                <Text marginEnd="size-200">QR Code</Text>
              </Item>
              <Item key="locations">
                <MapView /> <Text marginEnd="size-200">Locations</Text>
              </Item>
              <Item key="photos">
                <Image /> <Text marginEnd="size-200">Photos</Text>
              </Item>
            </TabList>
          </View>
        </Flex>
        <TabPanels margin="2rem auto">
          <Item key="overview">
            <View
              backgroundColor="static-white"
              borderRadius="medium"
              borderColor="light"
              borderWidth="thick"
              key={cameraTrap.id}
              padding="size-400"
              width="80vw"
              margin="auto"
              marginTop="size-500"
              maxWidth="100%"
              marginBottom="size-500"
            >
              <Flex direction="row">
                <Heading flexGrow={1} level={1}>
                  {cameraTrap.deviceId} Overview
                </Heading>
                <View alignSelf="center">
                  <CameraTrapStatus latestEvent={cameraTrap.events[0]} />
                </View>
              </Flex>
              <Divider />
              <Well>
                This camera has captured{' '}
                <strong>{cameraTrap.photos.length}</strong>&nbsp;photos across{' '}
                <strong>{cameraTrap.batches.length}</strong>&nbsp;batches
              </Well>

              <ActionGroup onAction={onActionPress} marginTop="size-450">
                <Item key={`viewBatches-${cameraTrap.id}`}>
                  <ImageCheck /> <Text>View Batches</Text>
                </Item>
                <Item key="uploadImages">
                  <ImageAdd /> <Text>Upload Images</Text>
                </Item>
                {/* <Item>
                <Delete />
              </Item> */}
              </ActionGroup>

              <View marginTop="size-450">
                <table>
                  <tr>
                    <th style={{ textAlign: 'left', paddingRight: '2rem' }}>
                      Device Name
                    </th>
                    <td>{cameraTrap.deviceId}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left', paddingRight: '2rem' }}>
                      Device Make
                    </th>
                    <td>{cameraTrap.manufacturer}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left', paddingRight: '2rem' }}>
                      Project
                    </th>
                    <td>{cameraTrap.project ?? '-'}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left', paddingRight: '2rem' }}>
                      Internal ID
                    </th>
                    <td>
                      <code>{cameraTrap.id}</code>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left', paddingRight: '2rem' }}>
                      MediaValet Category ID
                    </th>
                    <td>
                      <code>{cameraTrap.mediavaletCategoryId}</code>
                    </td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left', paddingRight: '2rem' }}>
                      Device Serial Number
                    </th>
                    <td>
                      <code>-</code>
                    </td>
                  </tr>
                </table>
              </View>
            </View>
          </Item>
          <Item key="events">
            <EventList events={cameraTrap.events} />
          </Item>
          <Item key="qrcode">
            <View
              backgroundColor="static-white"
              borderRadius="medium"
              borderColor="light"
              borderWidth="thick"
              key={cameraTrap.id}
              padding="size-400"
              width="80vw"
              margin="auto"
              marginTop="size-500"
              maxWidth="100%"
              marginBottom="size-500"
            >
              <Heading level={1}>QR Code</Heading>
              <Divider />
              <CameraTrapQrCode
                deviceId={cameraTrap.deviceId}
                project={cameraTrap.project}
                manufacturer={cameraTrap.manufacturer}
              />
            </View>
          </Item>
          <Item key="locations">
            <View
              backgroundColor="static-white"
              borderRadius="medium"
              borderColor="light"
              borderWidth="thick"
              key={cameraTrap.id}
              padding="size-400"
              width="80vw"
              margin="auto"
              marginTop="size-500"
              maxWidth="100%"
              marginBottom="size-500"
            >
              <Heading level={1}>Locations</Heading>
              <Divider />
              <p>Here are all the places this camera has been.</p>
              <EventLocationsMap events={[]} />
            </View>
          </Item>
          <Item key="photos">
            <MediavaletAssetsCell
              cameraTrapId={cameraTrap.id}
              categoryId={cameraTrap.mediavaletDownloadsFolderId}
            />

            {/* <MediavaletAssetsCell
              cameraTrapId={cameraTrap.id}
              categoryId={cameraTrap.mediavaletProcessedFolderId}
            /> */}
          </Item>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CameraTrap;
