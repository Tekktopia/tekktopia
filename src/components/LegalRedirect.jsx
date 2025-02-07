import { useNavigate } from 'react-router-dom';
import arrowleft from '../assets/icons/arrowleft.svg';

const LegalRedirect = () => {
  const navigate = useNavigate();

  const previousPage = (e) => {
    e.preventDefault();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="flex gap-2 mb-4 cursor-pointer" onClick={previousPage}>
      <a href="">
        <img src={arrowleft} alt="" className="mb-2" />
      </a>

      <p>Legal</p>
    </div>
  );
};

export default LegalRedirect;
