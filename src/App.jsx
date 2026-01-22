// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import SectorHome from './components/SectorHome'
import About from './components/About'
import Footer from './components/Footer'
import TeachersHome from './components/TeachersHome'
import TimetablePage from './components/TimetablePage'
import NoticesPage from './components/NoticesPage'
import AdminPage from './components/AdminPage'

// 1. We group the "Normal Website" components into one big component here
const LandingPage = () => (
  <div className="flex flex-col min-h-screen">
    <SectorHome />
    <About />
    <TeachersHome />
    <TimetablePage />
    <NoticesPage />
    <Footer />
  </div>
);

function App() {
  return (
    // 2. We use Routes to decide which component to show based on the URL
    <Routes>
      {/* If URL is just "/", show the normal website */}
      <Route path="/" element={<LandingPage />} />

      {/* If URL matches your secret key, show ONLY the Admin Panel */}
      <Route path="/sector19365" element={<AdminPage />} />
    </Routes>
  )
}

export default App