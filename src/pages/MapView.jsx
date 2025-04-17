import MapChart from "../components/map";

export default function MapView() {
  return (
    <div className="h-[400px] w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl lg:mt-0 mt-12">
      <MapChart/>
    </div>
  );
}