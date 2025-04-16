import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

const skiResorts = [

    {
        name: "Vail",
        position: [39.6061, -106.3550],
        visited: true
      },
      {
        name: "Aspen Snowmass",
        position: [39.2084, -106.9490],
        visited: false
      },
      {
        name: "Park City",
        position: [40.6461, -111.4980],
        visited: true
      }
];

export default function Map() {
  return (
    <div className="h-full w-full">
      <MapContainer 
        center={[39.8283, -98.5795]} 
        zoom={4} 
        className="h-full w-full"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        
        <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={20}
        minZoom= {2}
        noWrap={true}
        bounds={[[-90, -180], [90, 180]]}
        />
                
        {skiResorts.map((resort) => (
          <Marker 
            key={resort.name}
            position={resort.position}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{resort.name}</h3>
                <p className="text-sm text-gray-600">
                  Status: {resort.visited ? 'Visited' : 'Not visited'}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}