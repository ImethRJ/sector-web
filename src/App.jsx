import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";
import SectorHome from './components/SectorHome';
import About from './components/About';
import Footer from './components/Footer';
import TeachersHome from './components/TeachersHome';
import TimetablePage from './components/TimetablePage';
import NoticesPage from './components/NoticesPage';
import AdminPage from './components/AdminPage';
import AllTutors from './components/AllTutors';
import { submitToIndexNow } from './utils/indexNow';

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

  // EFFECT 1: Google Analytics (Triggers on every URL change)
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search
    });
  }, [location]);

  // EFFECT 2: IndexNow (Triggers ONLY once per session)
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      submitToIndexNow();
    }
  }, []); // Empty array ensures this never causes a routing loop

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