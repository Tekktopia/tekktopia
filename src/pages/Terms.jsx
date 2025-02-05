import { Link } from 'react-router-dom';
import LegalTerms from '../components/LegalTerms';
import arrowleft from '../assets/icons/arrowleft.svg';

const Terms = () => {
  return (
    <section className="mt-20 w-full h-screen px-6 py-4 relative mb-36">
      <Link to="/" className="">
        <img src={arrowleft} alt="" className="mb-2" />
      </Link>
      <LegalTerms />
    </section>
  );
};

export default Terms;
