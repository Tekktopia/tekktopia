import OurStory from '../components/About/ourStory/OurStory';
import AboutBanner from '../components/About/banner/AboutBanner';
import GetStarted from '../components/About/getStarted/GetStarted';
import CompanyEthos from '../components/About/companyEthos/CompanyEthos';

const About = () => {
  return (
    <section className="w-full flex-col flex items-center justify-center mt-16 ">
      {/* First about section */}
      <div className="relative w-full">
        {/* Background Image */}
        <img
          src="/about-banner.png"
          alt="About Banner"
          className="w-full h-[450px] sm:h-[650px] object-cover"
        />

        {/* Overlay Div */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <img
            src="/about2.png"
            alt="About Us"
            className="w-[120px] sm:w-[150px] lg:w-[180px] object-contain"
          />
          <p className="mt-4 text-sm sm:text-base text-white">ABOUT US</p>
          <div className="text-3xl lg:text-[60px] font-medium lg:leading-[70px] text-center text-white mt-3">
            {'Crafting'} <br />
            {'Customized Wealth Solutions'}
          </div>
        </div>
      </div>
      <div className="container mx-auto w-full">
        {/* Second about section */}
        <OurStory />
      </div>
      {/* Fourth about section */}
      <AboutBanner />

      <div className="container mx-auto w-full">
        {/* Fifth about section */}
        <GetStarted />

        <CompanyEthos />
      </div>
    </section>
  );
};

export default About;
