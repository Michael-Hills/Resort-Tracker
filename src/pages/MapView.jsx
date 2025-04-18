import MapChart from "../components/map";
import InfoItemSection from "../components/infoItemSection";

export default function MapView() {

  const stats = [
    { title: "Resorts Visited:", text: "32" },
    { title: "Countries:", text: "8" },
    { title: "Total Runs:", text: "156" },
    { title: "Favorite Resort:", text: "Vail" },
  ];

  return (
    <>
      <div className="h-[400px] w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl lg:mt-0 mt-12">
        <MapChart/>
      </div>
      <InfoItemSection items={stats}/>
    </>
  );
}