import { Link } from 'react-router-dom';
import LegalPolicy from '../components/LegalPolicy';
import arrowleft from '../assets/icons/arrowleft.svg';

const Policy = () => {
  return (
    <section className="mt-20 w-full h-screen px-6 py-4 relative mb-36">
      <Link to="/" className="">
        <img src={arrowleft} alt="" className="mb-2" />
      </Link>
      <LegalPolicy />
    </section>
  );
};

export default Policy;
