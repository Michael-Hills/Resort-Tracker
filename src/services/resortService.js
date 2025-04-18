const API_BASE_URL = 'https://api.example.com'; 


const mockResorts = [
  {
    id: 'vail',
    name: "Vail",
    position: [39.6061, -106.3550],
    country: "USA"
  },
  {
    id: 'aspen',
    name: "Aspen Snowmass",
    position: [39.2084, -106.9490],
    country: "USA"
  },
  {
    id: 'parkcity',
    name: "Park City",
    position: [40.6461, -111.4980],
    country: "USA",
  },
  {
    id: 'zermatt',
    name: "Zermatt",
    position: [46.0207, 7.7491],
    country: "Switzerland",
  },
  {
    id: 'chamonix',
    name: "Chamonix",
    position: [45.9237, 6.8694],
    country: "France",
  },
  {
    id: 'stmoritz',
    name: "St. Moritz",
    position: [46.4908, 9.8355],
    country: "Switzerland",
  },
  {
    id: 'valthorens',
    name: "Val Thorens",
    position: [45.2982, 6.5800],
    country: "France",
  },
  {
    id: 'kitzbuehel',
    name: "Kitzbühel",
    position: [47.4492, 12.3919],
    country: "Austria",
  },
  {
    id: 'niseko',
    name: "Niseko United",
    position: [42.8648, 140.6874],
    country: "Japan",
  },
  {
    id: 'hakuba',
    name: "Hakuba Valley",
    position: [36.6984, 137.8320],
    country: "Japan",
  },
  {
    id: 'yongpyong',
    name: "Yongpyong Resort",
    position: [37.6435, 128.6799],
    country: "South Korea",
  },
];

const mockHolidays = [
  {
    id: '1',
    resortId: 'vail',
    startDate: '2023-12-15',
    endDate: '2023-12-22',
    notes: 'Amazing powder days'
  },
  {
    id: '2',
    resortId: 'parkcity',
    startDate: '2024-01-05',
    endDate: '2024-01-12',
    notes: 'Great spring conditions'
  }
];

// API functions
export async function fetchResorts() {
  // Simulate API call
  // In production, this would be: return fetch(`${API_BASE_URL}/resorts`).then(res => res.json());
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockResorts;
}

export async function fetchHolidays() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockHolidays;
}

export async function addHoliday(holiday) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  const newHoliday = {
    ...holiday,
    id: crypto.randomUUID()
  };
  mockHolidays.push(newHoliday);
  return newHoliday;
}

export async function getVisitedResorts() {
  const [resorts, holidays] = await Promise.all([
    fetchResorts(),
    fetchHolidays()
  ]);
  
  const visitedResortIds = new Set(holidays.map(h => h.resortId));
  
  return resorts.map(resort => ({
    ...resort,
    visited: visitedResortIds.has(resort.id)
  }));
}

export async function getResortStats() {
  const [resorts, holidays] = await Promise.all([
    fetchResorts(),
    fetchHolidays()
  ]);
  
  const visitedResortIds = new Set(holidays.map(h => h.resortId));
  const visitedResorts = resorts.filter(r => visitedResortIds.has(r.id));
  
  const countries = new Set(visitedResorts.map(r => r.country));
  const totalRuns = visitedResorts.reduce((sum, r) => sum + r.runs, 0);
  
  return {
    resortsVisited: visitedResorts.length,
    countries: countries.size,
    totalRuns,
    favoriteResort: visitedResorts.length > 0 ? visitedResorts[0].name : 'None'
  };
}

export async function searchResorts(query) {
  const resorts = await fetchResorts();
  return resorts.filter(resort => 
    resort.name.toLowerCase().includes(query.toLowerCase()) ||
    resort.country.toLowerCase().includes(query.toLowerCase())
  );
}

export function calculateStats(visitedResorts, holidays = [], resorts = []) {
  const countries = new Set(visitedResorts.map(r => r.country));

  const visitCounts = holidays.reduce((counts, holiday) => {
    counts[holiday.resortId] = (counts[holiday.resortId] || 0) + 1;
    return counts;
  }, {});

  const mostVisitedResortId = Object.entries(visitCounts)
    .sort(([, a], [, b]) => b - a)[0]?.[0];

  const favoriteResort = mostVisitedResortId
    ? resorts.find(r => r.id === mostVisitedResortId)?.name
    : 'None';

  const lastHoliday = [...holidays].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  )[0];

  const lastHolidayResort = lastHoliday 
    ? resorts.find(r => r.id === lastHoliday.resortId)?.name 
    : 'None';
  
    return {
      resortsVisited: visitedResorts.length,
      countries: countries.size,
      favoriteResort,
      lastHolidayDate: lastHoliday ? lastHoliday.startDate : null,
      lastHolidayResort
    };
}