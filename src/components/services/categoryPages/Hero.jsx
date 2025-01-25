import { useState, useEffect, useRef } from 'react';
import RequestDemoModal from '../../RequestDemoModal';
import PropTypes from 'prop-types';

const Hero = ({ imageUrl, topText, bottomText, subtitle, description, isCloudComputing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div
      className={`relative w-full h-[850px] mt-0 flex flex-col justify-center items-center text-white  ${isCloudComputing ? 'pt-56' : 'pt-40'}`}
    >
      <img
        src={imageUrl}
        alt="hero"
        className="w-full h-[450px] sm:h-[650px] object-cover 
        "
      />
      <div className="absolute text-white text-left left-4 sm:left-[80px] top-[204px] sm:top-[150px] lg:top-[150px] font-medium ">
        <h1 className="text-[24px] sm:text-[36px] lg:text-[60px]">
          {topText}
          <br />
          {bottomText}
        </h1>
        <p>{subtitle}</p>
      </div>
      <section className="lg:-mt-72 -mt-48 bg-gradient-to-b from-transparent via-[#081527] to-[#081527] flex flex-col w-full px-4 lg:px-[80px]">
        <button
          className="flex gap-2 h-[40px] text-[16px] w-[240px] sm:ml-[72px] lg:ml-0 bg-white text-black px-4 py-2 lg:mt-[8rem] rounded-[8px]"
          onClick={() => setIsModalOpen(true)}
        >
          Discover our solutions
          <img src="/arrow-right.png" />
        </button>

        {isModalOpen && (
          <div ref={modalRef}>
            <RequestDemoModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        )}
        <p className="sm:mt-64 mt-48 text-center sm:text-[20px] text-[14px] font-light sm:px-16">
          {description}
        </p>
      </section>
    </div>
  );
};

// Define prop types for the Hero component
Hero.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isCloudComputing: PropTypes.bool,
};

export default Hero;
