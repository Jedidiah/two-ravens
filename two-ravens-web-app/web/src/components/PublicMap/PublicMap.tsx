import { View } from '@adobe/react-spectrum';
import { TileLayer, MapContainer } from 'react-leaflet';

const PublicMap = (props: {}) => {
  return (
    <View width="100%" height="90vh" marginTop={0}>
      <MapContainer
        center={[57, -5]}
        zoom={8}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '90vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
          <Popup>{label}</Popup>
        </Marker> */}
      </MapContainer>
    </View>
  );
};
export default PublicMap;
