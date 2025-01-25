import PropTypes from 'prop-types';

const Hero = ({ imageUrl, topText, bottomText }) => {
  return (
    <section className="relative w-full mx-auto">
      <img
        src={imageUrl}
        alt="hero"
        className="w-full h-[450px] sm:h-[650px] object-cover mx-auto"
      />
      <h1 className="absolute text-white text-left left-4 sm:left-[80px] top-[200px] sm:top-[390px] font-medium text-[24px] sm:text-[36px] lg:text-[60px]">
        {topText}
        <br />
        {bottomText}
      </h1>
    </section>
  );
};

// Define prop types for the Hero component
Hero.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  topText: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
};

export default Hero;
