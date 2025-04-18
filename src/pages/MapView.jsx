import MapChart from "../components/map";
import InfoItemSection from "../components/infoItemSection";
import { useResorts } from "../context/resortContext";

export default function MapView() {

  const { resorts, stats } = useResorts();
  
  const statItems = [
    { title: "Resorts Visited:", text: (stats.resortsVisited || 0).toString() },
    { title: "Countries:", text: (stats.countries || 0).toString() },
    { title: "Favorite Resort:", text: stats.favoriteResort || 'None' },
    { title: "Last Visit:", text: stats.lastHolidayDate || 'No visits yet' },
    { title: "Last Resort:", text: stats.lastHolidayResort || 'None' }
  ];


  return (
    <>
      <div className="h-[400px] w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl lg:mt-0 mt-12">
        <MapChart resorts={resorts || []} />
      </div>
      <InfoItemSection items={statItems} />
    </>
  );
}