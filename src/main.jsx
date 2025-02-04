import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OurTeam from './pages/OurTeam';
import ContactUs from './pages/ContactUs';
import './index.css';
import App from './App';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Services from './pages/Services';
import Career from './pages/Career';
import Projects from './pages/Projects';
import About from './pages/About';
// import { BlogContent } from './pages/BlogContent';
import BlogContent from './pages/BlogContentNew';
import ServicePage from './pages/ServicePage';
import NotFound from './pages/NotFound';
import FaqPage from './pages/FaqPage';
import Terms from './pages/Terms';
import Policy from './pages/Policy';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/career" element={<Career />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogContent />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/services/:name" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
