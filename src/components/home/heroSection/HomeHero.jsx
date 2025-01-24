import { FiChevronRight } from 'react-icons/fi';
import PropTypes from 'prop-types';
import home1 from '../../../assets/images/home1.png';

const HomeHero = ({ setIsModalOpen }) => {
  return (
    <div className=" px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
        <h1 className="text-[24px] sm:text-[28px] md:text-[60px] font-medium text-[#0B0B0B] leading-[80px]">
          Simplifying Technology,
        </h1>
        <div className="flex mt-4 md:mt-0 relative">
          <img src="/Ellipse23.png" alt="ellipse23" className="relative" />
          <img
            src="/Ellipse24.png"
            alt="ellipse24"
            className="relative right-2"
          />
          <img
            src="/Ellipse25.png"
            alt="ellipse25"
            className="relative right-4"
          />
        </div>
      </div>

      <h2 className="text-[24px] sm:text-[28px] md:text-[60px] bg-gradient-to-r from-[#67BDD5] to-[#4B82CA] text-transparent font-medium bg-clip-text mt-4 text-center leading-[80px]">
        Empowering Your Business
      </h2>

      <p className="text-[#697D95B2] text-[12px] sm:text-[14px] md:text-[16px] mt-4 max-w-[865px] text-center">
        Imagine a world where your technology works seamlessly in the background
        while you focus on growing your business. That’s what we do at Tekktopia, helping you navigate the complex world of IT with ease
      </p>

      <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
        <a href='/contact-us'>
          <button className="bg-[#070223] text-[#6797D5] hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md flex items-center">
            Contact us <FiChevronRight />
          </button>
        </a>
        <button
          className="bg-white text-[#070223] hover:bg-[#6797D5] hover:text-white px-4 py-2 rounded-md flex items-center border  shadow-sm"
          onClick={() => setIsModalOpen(true)}
        >
          Request a demo <FiChevronRight />
        </button>
      </div>

      <div className="mt-10 mb-20 w-full relative">
        <img
          src={home1}
          className="mx-auto w-full max-w-[1240px] h-auto"
          alt="hero"
        />
        <div className="absolute hidden sm:block top-[-40px] left-[180px] w-[289px] bg-white/80 backdrop-blur-sm shadow-lg rounded-md p-[16px]">
          <div className="text-[12px] text-[#697D95B2]">
            Welcome to Tekktopia, your hub for advanced cloud and IT solutions.
            Explore how we can help your business grow and stay ahead of the
            curve.
          </div>
          <div className="flex items-center justify-between mt-[8px] p-[12px] border border-[#CCCCCC4D] rounded-sm">
            <img
              src="/tekktopia-logo.png"
              alt="hero section"
              className="w-[50px] h-[53px]"
            />
            <div className="ml-[12px]">
              {/* <div className="text-[14px]">Akinola Daniel Oshinubi</div>
              <div className="text-[12px] text-[#697D95B2] mt-[4px]">
                Chief Executive Officer
              </div> */}
              <div className="text-[14px]">Ireoluwa Adeoluwa</div>
              <div className="text-[12px] text-[#697D95B2] mt-[4px]">
                Chief Technology Officer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;

HomeHero.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};
