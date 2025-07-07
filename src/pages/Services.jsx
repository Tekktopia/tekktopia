import Hero from '../components/Hero';
import HeroImage from '../assets/images/Team.png';
import OurServices from '../components/services/ourServices/OurServices';
import TrustOurProcess from '../components/services/trustOurProcess/TrustOurProcess';

export default function Services() {
  return (
    <div className="w-full items-center flex flex-col justify-center  mx-auto -mb-10">
      {/* Hero Section */}
      <Hero
        imageUrl={HeroImage}
        topText="We offer practical solutions that help you"
        bottomText=" grow and stand out in the digital world."
      />

      {/* Our Services Section */}
      <div className=" container mx-auto">
        <OurServices />
      </div>

      {/* Quality Assurance Section */}
      <div className="container">
        <TrustOurProcess />
      </div>
    </div>
  );
}
