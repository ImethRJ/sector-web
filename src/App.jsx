import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { submitToIndexNow } from './utils/indexNow';

// Lazy load components
const SectorHome = lazy(() => import('./components/SectorHome'));
const About = lazy(() => import('./components/About'));
const TeachersHome = lazy(() => import('./components/TeachersHome'));
const TimetablePage = lazy(() => import('./components/TimetablePage'));
const NoticesPage = lazy(() => import('./components/NoticesPage'));
const AdminPage = lazy(() => import('./components/AdminPage'));
const AllTutors = lazy(() => import('./components/AllTutors'));

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

  // Analytics - Runs on every route change
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search
    });
  }, [location]);

  // IndexNow - Runs ONLY once when the app loads
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      submitToIndexNow();
    }
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/all-tutors" element={<><AllTutors /><Footer /></>} />
        <Route path="/sector19365" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;