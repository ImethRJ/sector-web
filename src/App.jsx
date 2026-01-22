// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import SectorHome from './components/SectorHome'
import About from './components/About'
import Footer from './components/Footer'
import TeachersHome from './components/TeachersHome'
import TimetablePage from './components/TimetablePage'
import NoticesPage from './components/NoticesPage'
import AdminPage from './components/AdminPage'
import AllTutors from './components/AllTutors' // 1. Import the new component

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
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* 2. Add the route for the All Tutors page */}
      <Route path="/all-tutors" element={
        <>
          <AllTutors />
          <Footer />
        </>
      } />

      <Route path="/sector19365" element={<AdminPage />} />
    </Routes>
  )
}

export default App