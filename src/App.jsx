import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar';

function App() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <Routes>
          {/* Add your routes here */}
          <Route path="/" element={<div>Map View</div>} />
         
        </Routes>
      </main>
    </div>
  )
}

export default App


