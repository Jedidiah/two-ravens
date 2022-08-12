import { Key, useCallback, useState } from 'react';

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
  MenuTrigger,
  ActionButton,
  Menu,
  Provider,
} from '@adobe/react-spectrum';
import { Icon } from '@react-spectrum/icon';
import Camera from '@spectrum-icons/workflow/Camera';
import Info from '@spectrum-icons/workflow/Info';
import LocationBasedEvent from '@spectrum-icons/workflow/LocationBasedEvent';
import MapView from '@spectrum-icons/workflow/MapView';
import { FaRegImages } from 'react-icons/fa';
import { HiOutlineQrcode } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';

import { routes, navigate } from '@redwoodjs/router';

import CameraTrapBatchesCell from 'src/components/CameraTrapBatch/CameraTrapBatchesCell';
import CameraTrapQrCode from 'src/components/CameraTrapQRCode/CameraTrapQRCode';
import CameraTrapStatus from 'src/components/CameraTrapStatus/CameraTrapStatus';
import EventList from 'src/components/EventList/EventList';
import EventLocationsMap from 'src/components/EventLocationsMap/EventLocationsMap';
import MediavaletAssetsCell from 'src/components/MediavaletAssetsCell';

const CameraTrap = ({ cameraTrap, cameraTraps = [], tab }) => {
  const [currentTab, setCurrentTab] = useState(tab);
  const handleBreadcrumbs = useCallback(() => {
    navigate(routes.cameraTraps());
  }, []);

  const switchTab = useCallback(
    (newTab: string) => {
      // Using navigate like the below causes the tabs to lose keyboard focus
      // navigate(routes.cameraTrapTab({ id: cameraTrap.id, tab: newTab }));

      // Using window history preserves keyboard navigation but also does not break reloading the page
      window.history.pushState(
        {},
        '',
        routes.cameraTrapTab({ id: cameraTrap.id, tab: newTab })
      );
      setCurrentTab(newTab);
    },
    [cameraTrap.id, setCurrentTab]
  );

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

  const switchCamera = useCallback(
    (selectionSet: Set<Key>) => {
      console.log({ selectionSet });
      const id = selectionSet.valueOf(0)?.currentKey;
      navigate(routes.cameraTrapTab({ id, tab: currentTab }));
    },
    [currentTab]
  );

  return (
    <>
      <Tabs
        aria-label="Camera Trap Batch Statuses"
        onSelectionChange={switchTab}
        defaultSelectedKey={String(currentTab)}
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
              <Item key="newCameraTrap">
                <MenuTrigger closeOnSelect>
                  {/* <Text>{cameraTrap.deviceId}</Text> */}
                  <Provider marginStart="size-200" colorScheme="dark">
                    <ActionButton>
                      <Icon>
                        <IoMdArrowDropdown />
                      </Icon>
                      <Camera />
                      <Text>{cameraTrap.deviceId}</Text>
                    </ActionButton>
                  </Provider>
                  <Menu
                    selectionMode="single"
                    selectedKeys={[cameraTrap.id]}
                    onSelectionChange={switchCamera}
                  >
                    {cameraTraps.map((cam) => (
                      <Item key={cam.id}>{cam.deviceId}</Item>
                    ))}
                  </Menu>
                </MenuTrigger>
              </Item>
            </Breadcrumbs>
          </View>
          <View flexGrow={1} paddingStart="size-500">
            <TabList>
              <Item key="overview">
                <Info />
                <Text marginEnd="size-200">Overview</Text>
              </Item>
              <Item key="batches">
                <Icon>
                  <FaRegImages />
                </Icon>{' '}
                <Text marginEnd="size-200">Batches</Text>
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

              {/* <ActionGroup onAction={onActionPress} marginTop="size-450">
                <Item key={`viewBatches-${cameraTrap.id}`}>
                  <ImageCheck /> <Text>View Batches</Text>
                </Item>
                <Item key="uploadImages">
                  <ImageAdd /> <Text>Upload Images</Text>
                </Item>
              </ActionGroup> */}
              <Flex direction="row" marginTop="size-450">
                <View width="40%" marginEnd="10%">
                  <Heading>
                    <Info marginBottom="-0.3em" /> <Text>Key Info</Text>
                  </Heading>
                  <Divider height={1} marginBottom="size-400" />
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
                <MediavaletAssetsCell
                  cameraTrapId={cameraTrap.id}
                  categoryId={cameraTrap.mediavaletDownloadsFolderId}
                />
              </Flex>
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
          <Item key="batches">
            <CameraTrapBatchesCell
              cameraTrapId={cameraTrap.id}
              hideCameraSelector
            />
          </Item>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CameraTrap;
