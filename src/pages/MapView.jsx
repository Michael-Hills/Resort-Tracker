import { useState, useEffect } from 'react';
import MapChart from "../components/map";
import InfoItemSection from "../components/infoItemSection";
import { getResortStats } from "../services/resortService";

export default function MapView() {

  const [stats, setStats] = useState({
    resortsVisited: 0,
    countries: 0,
    totalRuns: 0,
    favoriteResort: 'None'
  });

  useEffect(() => {
    async function loadStats() {
      const data = await getResortStats();
      setStats(data);
    }
    loadStats();
  }, []);

  const statItems = [
    { title: "Resorts Visited:", text: stats.resortsVisited.toString() },
    { title: "Countries:", text: stats.countries.toString() },
    { title: "Total Runs:", text: stats.totalRuns.toString() },
    { title: "Favorite Resort:", text: stats.favoriteResort }
  ];


  return (
    <>
      <div className="h-[400px] w-full max-w-6xl mx-auto relative overflow-hidden rounded-2xl lg:mt-0 mt-12">
        <MapChart/>
      </div>
      <InfoItemSection items={statItems}/>
    </>
  );
}