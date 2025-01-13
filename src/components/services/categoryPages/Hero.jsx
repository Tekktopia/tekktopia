import PropTypes from 'prop-types';

const Hero = ({ imageUrl, topText, bottomText, subtitle, description }) => {
  return (
    <div className="relative w-full h-[850px]  flex flex-col justify-center items-center text-white -mt-8 md:mt-10 lg:mt-24">
      <img
        src={imageUrl}
        alt="hero"
        className="w-full h-[450px] sm:h-[650px] object-cover"
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
        <button className="flex gap-2 h-[40px] text-[16px] w-[240px] sm:ml-[72px] lg:ml-0 bg-white text-black px-4 py-2 lg:mt-[8rem] rounded-[8px]">
          Discover our solutions
          <img src="/arrow-right.png" />
        </button>
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
};

export default Hero;
