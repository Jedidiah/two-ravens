import { View } from '@adobe/react-spectrum';
import { TileLayer, MapContainer } from 'react-leaflet';
import { CameraTrapEvent } from 'types/graphql';

const EventLocationsMap = ({ events }: { events: CameraTrapEvent[] }) => {
  return (
    <View width="100%" height="60vh" marginTop="size-250">
      <MapContainer
        center={[40, 40]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position} /> */}
      </MapContainer>
    </View>
  );
};

export default EventLocationsMap;
