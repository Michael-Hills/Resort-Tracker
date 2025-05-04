import {useEffect, useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import Button from './button'
import { useResorts } from '../context/resortContext'
import HolidayForm from './holidayForm';


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
    zoom: window.innerWidth < 640 ? 1 : 2
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


function RegionButtons({ map }) {
  const handleRegionClick = (region) => {
    const { center, zoom } = regions[region];
    map.flyTo(center, zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  };

  return (
    <div className="absolute top-4 right-4 z-[1000] flex gap-2">
      {Object.keys(regions).map((region) => (
        <Button
          key={region}
          onClick={() => handleRegionClick(region)}
          className="capitalize"
        >
          {region}
        </Button>
      ))}
    </div>
  );
}

function MapControllerWithButtons() {
  const map = useMap();
  
  useEffect(() => {
    const handleCenterOnResort = (event) => {
      const { position } = event.detail;
      map.flyTo(position, 8, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    };

    window.addEventListener('map:centerOnResort', handleCenterOnResort);
    return () => window.removeEventListener('map:centerOnResort', handleCenterOnResort);
  }, [map]);

  return <RegionButtons map={map} />;
}

export default function Map() {

  const { resorts, addHoliday, holidays} = useResorts();
  const [showHolidayForm, setShowHolidayForm] = useState(false);
  const [selectedResortId, setSelectedResortId] = useState(null);

  const handleShowForm = (resortId) => {
    setSelectedResortId(resortId);
    setShowHolidayForm(true);
  };

  const handleAddHoliday = async (holidayData) => {
    await addHoliday(holidayData);
    setShowHolidayForm(false);
  };

  const getHolidayCount = (resortId) => {
    return holidays.filter(h => h.resortId === resortId).length;
  };


  return (
    <div className="h-full w-full relative">

      <MapContainer 
        center={[20,0]} 
        zoom={window.innerWidth < 640 ? 1 : 2}
        className="h-full w-full z-[0]"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        zoomControl={false}
        minZoom={window.innerWidth < 640 ? 1 : 2}
      >
        <MapControllerWithButtons />
        
        <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        maxZoom={20}
        minZoom= {window.innerWidth < 640 ? 1 : 2}
        noWrap={true}
        bounds={[[-90, -180], [90, 180]]}
        zIndex={1}
        />
                
        {resorts.map((resort) => (
          <Marker key={resort.name} position={resort.position} icon={resort.visited ? visitedIcon : unvisitedIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{resort.name}</h3>
                <p className="text-sm text-gray-600">
                  Status: {resort.visited ? 'Visited' : 'Not visited'}
                </p>
                {resort.visited && (
                  <p className="text-sm text-gray-600">
                    Visits: {getHolidayCount(resort.id)}
                  </p>
                )}
                {!resort.visited && (
                  <Button 
                    variant="primary" 
                    className="mt-2"
                    onClick={() => handleShowForm(resort.id)}
                  >
                    Add Holiday
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {showHolidayForm && (
        <HolidayForm
          resorts={resorts}
          initialResortId={selectedResortId}
          onSubmit={handleAddHoliday}
          onCancel={() => setShowHolidayForm(false)}
        />
      )}
    </div>
  )
}