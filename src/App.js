import { Routes, Route } from "react-router-dom";

import "./App.css";

import RedirectToEn from './components/RedirectToEn';

import AboutPage from "./pages/AboutPage/AboutPage";
import EventsPage from "./pages/EventsPage/EventsPage"
import EmbroideryCirclesPage from "./pages/EmbroideryCirclesPage/EmbroideryCirclesPage";
import MainPage from "./pages/MainPage/MainPage";


const App = () => {
  return (
  <Routes>
      <Route path="/" element={<RedirectToEn />} />
      <Route path="/:language" element={<MainPage />} />
      <Route path="/:language/about" element={<AboutPage />} />
      <Route path="/:language/events" element={<EventsPage />} />
      <Route path="/:language/embroidery-circles" element={<EmbroideryCirclesPage />} />
    </Routes>
  );
};

export default App;
