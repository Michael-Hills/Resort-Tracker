import MapChart from "../components/map";
import InfoItemSection from "../components/infoItemSection";
import PhotoGallery from "../components/photoGallery";
import { useResorts } from "../context/resortContext";

export default function MapView() {

  const { resorts, stats, holidays } = useResorts();

  const lastHoliday = holidays?.length > 0 
    ? holidays.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))[0]
    : null;
  
  const overviewItems = [
    { title: "Resorts:", text: (stats.resortsVisited || 0).toString() },
    { title: "Countries:", text: (stats.countries || 0).toString() },
    { title: "Most Visited:", text: stats.favoriteResort || 'None' },
    
  ];

  const lastItems = [
    { text: stats.lastHolidayDate || 'No visits yet' },
    { text: stats.lastHolidayResort || 'None' }

  ];


  return (
    <>
      <div className="h-[250px] lg:h-[400px] w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl lg:mt-0 mt-12">
        <MapChart resorts={resorts || []} />
      </div>
      <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 px-4">Overview:</h2>
        <InfoItemSection items={overviewItems} />
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 px-4">Last Trip:</h2>
        <InfoItemSection
          items={lastItems}
          className="flex flex-row flex-wrap gap-4"
        />
        <PhotoGallery photos={lastHoliday?.photos || []} />
      </div>
    </>
  );
}