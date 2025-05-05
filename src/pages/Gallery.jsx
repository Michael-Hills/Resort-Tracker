import { useState} from 'react';
import { useResorts } from '../context/resortContext';
import PhotoGallery from '../components/photoGallery';
import Button from '../components/button';
import HolidayForm from '../components/holidayForm';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Gallery() {
  const { holidays, resorts, updateHolidayPhotos, addHoliday } = useResorts();
  const [showHolidayForm, setShowHolidayForm] = useState(false);
  const [filters, setFilters] = useState({
    resort: '',
    country: '',
    year: 'all'
  });
  const [sortBy, setSortBy] = useState('date-desc');
  const [expandedHolidays, setExpandedHolidays] = useState(new Set());

  const handleClearFilters = () => {
    setFilters({
      resort: '',
      country: '',
      year: 'all'  // Updated from dateRange to year
    });
    setSortBy('date-desc');
  };

  const toggleHoliday = (holidayId) => {
    setExpandedHolidays(prev => {
      const newSet = new Set(prev);
      if (newSet.has(holidayId)) {
        newSet.delete(holidayId);
      } else {
        newSet.add(holidayId);
      }
      return newSet;
    });
  };

  const handleAddHoliday = async (holidayData) => {
    await addHoliday(holidayData);
    setShowHolidayForm(false);
  };

  const countries = [...new Set(resorts.map(r => r.country))];
  const resortNames = resorts.map(r => ({ id: r.id, name: r.name }));
  const years = [...new Set(holidays.map(h => 
    new Date(h.startDate).getFullYear()
  ))].sort((a, b) => b - a);

  const filteredHolidays = holidays
    .filter(holiday => {
      const resort = resorts.find(r => r.id === holiday.resortId);
      if (!resort) return false;

      const matchesResort = !filters.resort || holiday.resortId === filters.resort;
      const matchesCountry = !filters.country || resort.country === filters.country;
      
      if (filters.year !== 'all') {
        const holidayYear = new Date(holiday.startDate).getFullYear().toString();
        return matchesResort && matchesCountry && holidayYear === filters.year;
      }
      
      return matchesResort && matchesCountry;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.startDate) - new Date(b.startDate);
        case 'date-desc':
          return new Date(b.startDate) - new Date(a.startDate);
        default:
          return 0;
      }
    });
  
  return (
    <div className="w-full mx-auto px-0.5 sm:px-2 max-w-7xl">
      {showHolidayForm && (
        <HolidayForm
          resorts={resorts}
          onSubmit={handleAddHoliday}
          onCancel={() => setShowHolidayForm(false)}
        />
      )}


      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-8 bg-white p-1 sm:p-2 rounded-lg shadow">
        <select
          value={filters.resort}
          onChange={(e) => setFilters(prev => ({ ...prev, resort: e.target.value }))}
          className="border rounded px-1 py-0.5 sm:p-1.5 text-xs sm:text-sm w-full min-w-0"
        >
          <option value="">All Resorts</option>
          {resortNames.map(resort => (
            <option key={resort.id} value={resort.id}>
              {resort.name}
            </option>
          ))}
        </select>

        <select
          value={filters.country}
          onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value }))}
          className="border rounded px-1 py-0.5 sm:p-1.5 text-xs sm:text-sm w-full min-w-0"
        >
          <option value="">All Countries</option>
          {countries.map(country => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={filters.year}
          onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
          className="border rounded px-1 py-0.5 sm:p-1.5 text-xs sm:text-sm w-full min-w-0"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year.toString()}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-1 py-0.5 sm:p-1.5 text-xs sm:text-sm w-full min-w-0"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
        </select>
      </div>

      <div className="flex justify-between mb-4">
        <Button 
          onClick={() => setShowHolidayForm(true)}
          variant="primary"
          className="text-xs sm:text-sm"
        >
          Add Holiday
        </Button>
        <Button 
          onClick={handleClearFilters}
          variant="default"
          className="text-xs sm:text-sm"
        >
          Clear Filters
        </Button>
      </div>

      {/* Holiday Cards */}

      <div className="space-y-2 sm:space-y-4">
        {filteredHolidays.map(holiday => {
          const resort = resorts.find(r => r.id === holiday.resortId);
          const isExpanded = expandedHolidays.has(holiday.id);

          return (
            <div key={holiday.id} className="bg-white rounded-lg shadow-md p-1 sm:p-4">
              <div className="flex justify-between items-center mb-1 sm:mb-4">
                <div>
                  <h2 className="text-sm sm:text-lg font-semibold">{resort?.name}</h2>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {new Date(holiday.startDate).toLocaleDateString()} - {new Date(holiday.endDate).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  onClick={() => toggleHoliday(holiday.id)}
                  className="p-1"
                >
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </Button>
              </div>

              {isExpanded && (
                <>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2">{resort?.country}</p>
                  <PhotoGallery 
                    photos={holiday.photos || []}
                    holidayId={holiday.id}
                    onPhotoAdded={() => updateHolidayPhotos(holiday.id)}
                    variant='gallery'
                  />
                </>
              )}
            </div>
          );
        })}
      

        {filteredHolidays.length === 0 && (
          <div className="text-center text-gray-500 py-2 sm:py-4">
            No holidays found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}