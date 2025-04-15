import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';
import MapView from './pages/MapView'
import Profile from './pages/Profile'
import Visited from './pages/Visited'

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <Routes>

          <Route path="/" element={<MapView/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/visited" element={<Visited/>} />
         
        </Routes>
      </main>
    </div>
  )
}

export default App


