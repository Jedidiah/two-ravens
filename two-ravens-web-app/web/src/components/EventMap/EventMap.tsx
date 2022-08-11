import { View } from '@adobe/react-spectrum';
import { Popup, TileLayer, MapContainer, Marker } from 'react-leaflet';

const EventMap = ({
  position = [0, 0],
  label = 'Event Location',
  zoom = 13,
}: {
  position: [number, number];
  zoom?: number;
  label?: string;
}) => {
  return (
    <View width="100%" height="size-4600" marginTop="size-250">
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </View>
  );
};

export default EventMap;
