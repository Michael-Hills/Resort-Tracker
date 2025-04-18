import { Routes, Route } from 'react-router-dom';
import { ResortProvider } from './context/resortContext';
import Sidebar from './components/sidebar';
import MapView from './pages/MapView'
import Profile from './pages/Profile'
import Visited from './pages/Visited'

function App() {
  return (
    <ResortProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 lg:ml-64">
          <Routes>
            <Route path="/" element={<MapView/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/visited" element={<Visited/>} />
          </Routes>
        </main>
      </div>
    </ResortProvider>
  )
}

export default App


