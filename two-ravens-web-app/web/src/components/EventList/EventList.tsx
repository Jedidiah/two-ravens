import { PropsWithChildren, ReactFragment, useCallback, useState } from 'react';

import {
  ActionButton,
  Content,
  Divider,
  Flex,
  Heading,
  IllustratedMessage,
  Provider,
  Text,
  View,
  Well,
} from '@adobe/react-spectrum';
import NoSearchResults from '@spectrum-icons/illustrations/NoSearchResults';
import ArrowDown from '@spectrum-icons/workflow/ArrowDown';
import ArrowUp from '@spectrum-icons/workflow/ArrowUp';
import Clock from '@spectrum-icons/workflow/Clock';
import MapView from '@spectrum-icons/workflow/MapView';
import PinOn from '@spectrum-icons/workflow/PinOn';
import RealTimeCustomerProfile from '@spectrum-icons/workflow/RealTimeCustomerProfile';
import User from '@spectrum-icons/workflow/User';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import formatISO9075 from 'date-fns/formatISO9075';
import { CameraTrapEvent } from 'types/graphql';

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
  battery_memory_replacement: PlacementEvent,
};

function EventTemplate(
  props: PropsWithChildren<{ event: CameraTrapEvent; icon?: ReactFragment }>
) {
  const { event, icon = null } = props;
  const [detailsCollapsed, setDetailsCollapsed] = useState<boolean>(true);
  const toggleDetails = useCallback(() => {
    setDetailsCollapsed(!detailsCollapsed);
  }, [detailsCollapsed, setDetailsCollapsed]);

  const viewOnGIS = useCallback(() => {
    window.location = event.gisLink;
  }, [detailsCollapsed, setDetailsCollapsed]);
  return (
    <View marginTop="size-500">
      <View
        backgroundColor="blue-400"
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

            <Well marginTop="size-300">
              <table>
                <tr>
                  <th>Key:</th>
                  <th>Value:</th>
                </tr>
                {Object.keys(event).map((key) => (
                  <tr key={key}>
                    <th
                      style={{
                        paddingRight: '2rem',
                        paddingBottom: '1rem',
                        paddingTop: '0.5rem',
                        borderTop: '1px solid #ccc',
                      }}
                    >
                      {key}
                    </th>
                    <td
                      style={{
                        borderTop: '1px solid #ccc',
                        paddingBottom: '1rem',
                        paddingTop: '0.5rem',
                      }}
                    >
                      {String(event[key])}
                    </td>
                  </tr>
                ))}
              </table>
            </Well>
          </>
        )}
      </View>
    </View>
  );
}

function PlacementEvent(props: { event: CameraTrapEvent }) {
  const { event } = props;
  return (
    <EventTemplate icon={<ArrowDown color="positive" size="L" />} event={event}>
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

function PickupEvent(props: { event: CameraTrapEvent }) {
  const { event } = props;
  return (
    <EventTemplate
      icon={<ArrowUp color="informative" size="L" />}
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
    <EventTemplate event={event}>
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
