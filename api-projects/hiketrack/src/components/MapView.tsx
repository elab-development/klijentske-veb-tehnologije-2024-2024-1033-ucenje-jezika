import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MapService } from '../lib/MapService';

const pinIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -35],
});

interface MapViewProps {
  lat: number;
  lon: number;
  label: string;
}

export default function MapView({ lat, lon, label }: MapViewProps) {
  const config = MapService.getMapConfig(lat, lon);

  return (
    <div className='mt-6 rounded-xl overflow-hidden border border-stone-200 shadow'>
      <MapContainer
        center={config.center}
        zoom={config.zoom}
        scrollWheelZoom={false}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer attribution={config.attribution} url={config.tileUrl} />
        <Marker position={config.center} icon={pinIcon}>
          <Popup>{label}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
