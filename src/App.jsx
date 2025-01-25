import { HelmetProvider, Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import 'leaflet/dist/leaflet.css';
import SignupTrigger from './components/SignupTrigger';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const location = useLocation();

  const getTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Home - Tekktopia';
      case '/about':
        return 'About Us - Tekktopia';
      case '/contact':
        return 'Contact - Tekktopia';
      case '/services':
        return 'Services - Tekktopia';
      case '/blog':
        return 'Blog - Tekktopia';
      case '/career':
        return 'Career - Tekktopia';
      case '/*':
        return 'Error - Tekktopia';
      // Add more cases as needed
      default:
        return 'Tekktopia';
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{getTitle(location.pathname)}</title>
      </Helmet>
      <div className="relative">
        <Navbar />
        <ScrollToTop />
        <main className="min-h-screen flex flex-col items-center w-full ">
          <Outlet />
        </main>
        <SignupTrigger />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;