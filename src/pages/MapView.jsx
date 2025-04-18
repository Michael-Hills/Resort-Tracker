import MapChart from "../components/map";
import InfoItemSection from "../components/infoItemSection";
import { useResorts } from "../context/resortContext";

export default function MapView() {

  const { resorts, stats } = useResorts();
  
  const statItems = [
    { title: "Resorts Visited:", text: stats.resortsVisited.toString() },
    { title: "Countries:", text: stats.countries.toString() },
    { title: "Total Runs:", text: stats.totalRuns.toString() },
    { title: "Favorite Resort:", text: stats.favoriteResort }
  ];


  return (
    <>
      <div className="h-[400px] w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl lg:mt-0 mt-12">
        <MapChart resorts={resorts} />
      </div>
      <InfoItemSection items={statItems} />
    </>
  );
}