import { PropsWithChildren, ReactFragment, useCallback, useState } from 'react';

import {
  ActionButton,
  Cell,
  Column,
  Content,
  Flex,
  Heading,
  Icon,
  IllustratedMessage,
  Row,
  TableBody,
  TableHeader,
  TableView,
  Text,
  View,
  Well,
} from '@adobe/react-spectrum';
import { ViewStyleProps } from '@react-types/shared';
import NoSearchResults from '@spectrum-icons/illustrations/NoSearchResults';
import ArrowDown from '@spectrum-icons/workflow/ArrowDown';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import CameraRefresh from '@spectrum-icons/workflow/CameraRefresh';
import Clock from '@spectrum-icons/workflow/Clock';
import PinOn from '@spectrum-icons/workflow/PinOn';
import User from '@spectrum-icons/workflow/User';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import formatISO9075 from 'date-fns/formatISO9075';
import omit from 'lodash/omit';
import { GiSadCrab } from 'react-icons/gi';
import { CameraTrapEvent } from 'types/graphql';

import EventMap from '../EventMap/EventMap';
import { startCase } from 'lodash';

function FormattedDate(props: { dateString: string }) {
  const date = new Date(props.dateString);
  return (
    <time datatype={props.dateString} title={formatISO9075(date)}>
      {formatDistanceToNow(date, {
        addSuffix: true,
      })}{' '}
    </time>
  );
}

const eventTypeMap = {
  camera_moved: PlacementEvent,
  camera_removed: PickupEvent,
  camera_stolen: StolenEvent,
  battery_memory_replacement: ChangeEvent,
};

function EventTemplate(
  props: PropsWithChildren<{
    event: CameraTrapEvent;
    icon?: ReactFragment;
    blobColor?: ViewStyleProps['backgroundColor'];
  }>
) {
  const { event, icon = null } = props;
  const [detailsCollapsed, setDetailsCollapsed] = useState<boolean>(true);
  const toggleDetails = useCallback(() => {
    setDetailsCollapsed(!detailsCollapsed);
  }, [detailsCollapsed, setDetailsCollapsed]);

  const viewOnGIS = useCallback(() => {
    window.location = event.gisLink;
  }, [detailsCollapsed, setDetailsCollapsed]);

  const location = event.cameraLocation
    ? JSON.parse(event.cameraLocation)
    : undefined;

  return (
    <View marginTop="size-500">
      <View
        backgroundColor={props.blobColor ?? 'static-gray-500'}
        width="size-2400"
        padding="size-10"
        borderRadius="large"
        marginStart="-2rem"
        marginBottom="size-100"
      >
        <p
          style={{
            color: 'white',
            textAlign: 'center',
            margin: 0,
            padding: 0,
            marginLeft: '-8px',
          }}
        >
          ⏺ {formatISO9075(new Date(event.datetimeUpdated))}
        </p>
      </View>
      <View
        backgroundColor="static-white"
        borderRadius="medium"
        borderColor="light"
        borderWidth="thick"
        // key={cameraTrap.id}
        padding="size-400"
        // paddingBottom="size-115"
        width="55rem"
        margin="auto"
        maxWidth="90vw"
        marginBottom="size-500"
      >
        {/* <Heading level={2}>Camera Placed</Heading> */}
        <Flex alignItems="center" direction="row">
          {icon}
          <View marginX="size-100" flexGrow={1}>
            {props.children}
          </View>
          <ActionButton onPress={toggleDetails} width="size-1700">
            {detailsCollapsed ? 'View' : 'Hide'} Details
          </ActionButton>
        </Flex>
        {!detailsCollapsed && (
          <>
            {/* <Divider height="size-10" marginY="size-200" /> */}
            {!!event.gisLink && (
              <a href={event.gisLink} target="_blank" rel="noreferrer">
                <ActionButton marginTop="size-300">
                  View Original Event on ArcGIS
                </ActionButton>
              </a>
            )}

            {!!location && (
              <EventMap
                zoom={14}
                position={[Number(location.y), Number(location.x)]}
              />
            )}

            <TableView marginTop="size-300">
              <TableHeader>
                <Column>Key:</Column>
                <Column width="70%">Value:</Column>
              </TableHeader>
              <TableBody>
                {Object.keys(
                  omit(event, [
                    '__typename',
                    'cameraLocation',
                    'gisLink',
                    'date',
                  ])
                ).map((key) => (
                  <Row key={key}>
                    <Cell>
                      <strong>{startCase(key)}</strong>
                    </Cell>
                    <Cell>{String(event[key])}</Cell>
                  </Row>
                ))}
              </TableBody>
            </TableView>
          </>
        )}
      </View>
    </View>
  );
}

function PlacementEvent(props: { event: CameraTrapEvent }) {
  const { event } = props;
  return (
    <EventTemplate
      icon={<ArrowDown color="positive" size="L" />}
      blobColor="green-500"
      event={event}
    >
      Camera placed{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <Clock color="informative" size="S" />
        &nbsp;
        <Text>
          <FormattedDate dateString={event.datetimeUpdated} />
        </Text>
      </strong>{' '}
      in{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <PinOn color="informative" size="S" />
        &nbsp;<Text>{event.areaDeployed}</Text>
      </strong>{' '}
      by{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <User color="informative" size="S" alignSelf="center" />
        &nbsp;<Text>{event.staffName}</Text>
      </strong>{' '}
    </EventTemplate>
  );
}

function ChangeEvent(props: { event: CameraTrapEvent }) {
  const { event } = props;
  return (
    <EventTemplate
      icon={<CameraRefresh size="L" />}
      blobColor="seafoam-500"
      event={event}
    >
      Memory Card Swapped{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <Clock color="informative" size="S" />
        &nbsp;
        <Text>
          <FormattedDate dateString={event.datetimeUpdated} />
        </Text>
      </strong>{' '}
      in{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <PinOn color="informative" size="S" />
        &nbsp;<Text>{event.areaDeployed}</Text>
      </strong>{' '}
      by{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <User color="informative" size="S" alignSelf="center" />
        &nbsp;<Text>{event.staffName}</Text>
      </strong>{' '}
    </EventTemplate>
  );
}

function PickupEvent(props: { event: CameraTrapEvent }) {
  const { event } = props;
  return (
    <EventTemplate
      icon={<ArrowUp color="informative" size="L" />}
      blobColor="blue-400"
      event={event}
    >
      Camera was collected{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <Clock color="informative" size="S" />
        &nbsp;
        <Text>
          <FormattedDate dateString={event.datetimeUpdated} />
        </Text>
      </strong>{' '}
      in{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <PinOn color="informative" size="S" />
        &nbsp;<Text>{event.areaDeployed}</Text>
      </strong>{' '}
      by{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <User color="informative" size="S" alignSelf="center" />
        &nbsp;<Text>{event.staffName}</Text>
      </strong>{' '}
    </EventTemplate>
  );
}

function StolenEvent(props: { event: CameraTrapEvent }) {
  const { event } = props;
  return (
    <EventTemplate
      event={event}
      blobColor="red-500"
      icon={
        <Icon color="negative" size="XL">
          <GiSadCrab />
        </Icon>
      }
    >
      Camera reported stolen{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <Clock color="informative" size="S" />
        &nbsp;
        <Text>
          <FormattedDate dateString={event.datetimeUpdated} />
        </Text>
      </strong>{' '}
      from{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <PinOn color="informative" size="S" />
        &nbsp;<Text>{event.areaDeployed}</Text>
      </strong>{' '}
      by{' '}
      <strong
        style={{
          background: '#eee',
          margin: '0 4px',
          display: 'inline-block',
        }}
      >
        <User color="informative" size="S" alignSelf="center" />
        &nbsp;<Text>{event.staffName}</Text>
      </strong>{' '}
      <Well marginTop="size-225">{event.comments}</Well>
    </EventTemplate>
  );
}

function EventList({ events = [] }: { events: CameraTrapEvent[] }) {
  if (!events || events.length < 1) {
    return (
      <IllustratedMessage marginY="size-400">
        <NoSearchResults />
        <Heading>This camera has no events yet</Heading>
        <Content>
          <p>
            When you record events in the field using the Survey123 app they
            will be listed here. If you believe there should already be events
            here please check the device name matches.
          </p>
          <p>
            To avoid typos you can stick a QR Code inside the camera that
            automatically populates fields like device ID and model.
            <br />
            See the QR Tab for details.
          </p>
        </Content>
      </IllustratedMessage>
    );
  }
  return (
    <div
      style={{
        borderLeft: '5px dotted #777',
        paddingLeft: '1rem',
        marginTop: '1rem',
        paddingBottom: '5rem',
      }}
    >
      {events.map((event) => {
        const Event = eventTypeMap[event.cameraProcedure] ?? PlacementEvent;
        return <Event key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;
