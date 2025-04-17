import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Button from './button'
import { useState, useEffect } from 'react'

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

const regions = {
  world: {
    center: [20, 0],
    zoom: 2
  },
  europe: {
    center: [54, 15],
    zoom: 4
  },
  asia: {
    center: [34, 100],
    zoom: 4
  }
};

function MapController({ region }) {
  const map = useMap();
  
  useEffect(() => {
    if (region) {
      map.flyTo(regions[region].center, regions[region].zoom);
    }
  }, [region, map]);

  return null;
}

export default function Map() {
  const [activeRegion, setActiveRegion] = useState('world');
  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 right-4 z-[10000000] flex gap-2">
        <Button 
          variant={activeRegion === 'world' ? 'primary' : 'default'}
          onClick={() => setActiveRegion('world')}
        >
          World
        </Button>
        <Button 
          variant={activeRegion === 'europe' ? 'primary' : 'default'}
          onClick={() => setActiveRegion('europe')}
        >
          Europe
        </Button>
        <Button 
          variant={activeRegion === 'asia' ? 'primary' : 'default'}
          onClick={() => setActiveRegion('asia')}
        >
          Asia
        </Button>
      </div>

      <MapContainer 
        center={regions.world.center} 
        zoom={regions.world.zoom} 
        className="h-full w-full"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        zoomControl={false}
      >
        <MapController region={activeRegion} />
        
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