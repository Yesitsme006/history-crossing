import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlacePage from './pages/PlacePage'
import CrossingPage from './pages/CrossingPage'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/place/:id" element={<PlacePage />} />
        <Route path="/crossing" element={<CrossingPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App