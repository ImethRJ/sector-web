import { useEffect } from 'react'; // Import useEffect
import { Routes, Route, useLocation } from 'react-router-dom'; // Import useLocation
import ReactGA from "react-ga4"; // Import React GA4
import SectorHome from './components/SectorHome'
import About from './components/About'
import Footer from './components/Footer'
import TeachersHome from './components/TeachersHome'
import TimetablePage from './components/TimetablePage'
import NoticesPage from './components/NoticesPage'
import AdminPage from './components/AdminPage'
import AllTutors from './components/AllTutors'

// Initialize with your Measurement ID from the screenshot
ReactGA.initialize("G-ETQXPG2C08");

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
  const location = useLocation();

  // This effect runs every time the route (URL) changes
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search
    });
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/all-tutors" element={
        <>
          <AllTutors />
          <Footer />
        </>
      } />
      <Route path="/sector19365" element={<AdminPage />} />
    </Routes>
  );
}

export default App;