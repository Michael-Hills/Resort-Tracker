import { createContext, useContext, useState, useEffect } from 'react';
import { getVisitedResorts, fetchHolidays, calculateStats, addHoliday } from '../services/resortService';

const ResortContext = createContext(null);

export function ResortProvider({ children }) {
  const [resorts, setResorts] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [stats, setStats] = useState({
    resortsVisited: 0,
    countries: 0,
    lastHolidayDate: null,
    lastHolidayResort: null,
    favoriteResort: 'None'
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const [resortsData, holidaysData] = await Promise.all([
      getVisitedResorts(),
      fetchHolidays()
    ]);
    setResorts(resortsData);
    setHolidays(holidaysData);
    const visitedResorts = resortsData.filter(r => r.visited);
    setStats(calculateStats(visitedResorts, holidaysData, resortsData));
  }

  async function handleAddHoliday(holiday) {
    const newHoliday = await addHoliday(holiday);
    setHolidays(prev => [...prev, newHoliday]);
    await loadData(); // Refresh all data to ensure consistency
  }

  async function updateHolidayPhotos(holidayId) {
    const updatedHolidays = await fetchHolidays();
    const updatedHoliday = updatedHolidays.find(h => h.id === holidayId);
    
    setHolidays(prev => prev.map(h => 
      h.id === holidayId ? updatedHoliday : h
    ));
  }

  const value = {
    resorts,
    holidays,
    stats,
    addHoliday: handleAddHoliday,
    refreshData: loadData,
    updateHolidayPhotos
  };

  return (
    <ResortContext.Provider value={value}>
      {children}
    </ResortContext.Provider>
  );
}

export function useResorts() {
  const context = useContext(ResortContext);
  if (!context) {
    throw new Error('useResorts must be used within a ResortProvider');
  }
  return context;
}