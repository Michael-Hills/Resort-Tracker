import {useState, useEffect} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Button from './button'
import { useResorts } from '../context/resortContext'


// Remove default marker icons
delete L.Icon.Default.prototype._getIconUrl;

// Create custom marker icons
const visitedIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="width: 16px; height: 16px; background: #3b82f6; border-radius: 50%; border: 2px solid #2563eb;"></div>'
});

const unvisitedIcon = L.divIcon({
  className: 'custom-marker',
  html: '<div style="width: 16px; height: 16px; border: 2px solid #3b82f6; border-radius: 50%;"></div>'
});



const regions = {
  world: {
    center: [20, 0],
    zoom: 2
  },
  europe: {
    center: [45, 15],
    zoom: window.innerWidth < 640 ? 4 : 5
  },
  asia: {
    center: [40, 130],
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

  const { resorts, addHoliday } = useResorts();
  const [activeRegion, setActiveRegion] = useState('world');

  const handleAddHoliday = async (resortId) => {
    await addHoliday({
      resortId,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      notes: 'New visit'
    });
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 right-4 z-[1] flex gap-2">
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
        className="h-full w-full z-[0]"
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
        zIndex={1}
        />
                
        {resorts.map((resort) => (
        <Marker 
          key={resort.name}
          position={resort.position}
          icon={resort.visited ? visitedIcon : unvisitedIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{resort.name}</h3>
              <p className="text-sm text-gray-600">
                Status: {resort.visited ? 'Visited' : 'Not visited'}
              </p>
              {!resort.visited && (
                <Button 
                  variant="primary" 
                  className="mt-2"
                  onClick={() => handleAddHoliday(resort.id)}
                >
                  Add Visit
                </Button>
              )}
            </div>
          </Popup>
        </Marker>
        ))}
      </MapContainer>
    </div>
  )
}