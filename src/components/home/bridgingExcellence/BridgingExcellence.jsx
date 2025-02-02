// import React from 'react';
import innovation1 from '../../../assets/images/innovation1.png';
import innovation2 from '../../../assets/images/innovation2.png';
const BridgingExcellence = () => {
  return (
    <section className="bg-[#081527] w-full px-4 lg:px-16">
      <div className="flex flex-col _s-center ">
        {/* Heading Section */}
        <div className="mt-16 md:mt-[115px] text-center">
          <div className="text-[#FFFFFF] text-[22px] sm:text-[24px] md:text-[32px] font-[DM Sans] font-medium leading-[28px] sm:leading-[30px] md:leading-[45px] mb-2">
            {' Bridging excellence and'} <br />
            {' innovation across diverse sectors.'}
          </div>
          <div className="text-[#FFFFFFB2] text-center text-[14px] leading-[24px]">
            Empowering businesses to thrive with tailored solutions and
            innovative technology. Our expertise spans multiple <br />
            industries, ensuring that no matter your needs, we have the tools
            and strategies to drive success.
          </div>
        </div>

        {/* Image Section with Overlay */}
        <div className="flex flex-col lg:flex-row mt-16 _s-center justify-center gap-[24px] h-auto w-full">
          <div className="w-full lg:w-[588px] h-auto relative">
            <img
              src={innovation1}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 flex items-center w-full h-full bg-gradient-to-r from-[#231506]/90 via-[#372511]/90 to-[#554c3b]/0 text-white py-[80px] px-[40px]">
              <div className="max-w-[300px] lg:my-auto">
                <p className="text-[20px] font-medium">
                  Businesses trying to grow
                </p>
                <p className="mt-[8px] text-[14px]">
                  {
                    'Running a business is challenging enough without worrying about technology. That’s why we deliver customized solutions designed to meet your specific needs, because one size never fits all'
                  }
                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[588px] h-auto relative">
            <img
              src={innovation2}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 w-full flex items-center h-full bg-gradient-to-r from-[#231506]/90 via-[#372511]/90 to-[#554c3b]/0 text-white py-[80px] px-[40px]">
              <div className="max-w-[300px] lg:my-auto ">
                <p className="text-[20px] font-medium">
                  Innovative Solutions That <br /> Work for You
                </p>
                <p className="mt-[8px] text-[14px]">
                  {"At Tekktopia, creativity meets precision. We design, build, and implement technology solutions that transform challenges into opportunities. Let’s build a smarter future together"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 mt-16 w-full justify-center">
          <div className="max-w-[600px] w-full">
            <div className="text-[32px] text-[#FFFFFF] font-[400]">
             {" Why should you choose Tekktopia?"}
            </div>
            <p className="w-full text-[#FFFFFFB2] leading-[24px] text-[14px] lg:text-[16px]"></p>
          </div>

          <div className="grid lg:grid-cols-2 gap-[30px] mb-24 w-full max-w-[1280px] lg:justify-center">
            {[
              {
                title: 'Scalability',
                subtitle: '',
                description: 'Easily grow with Tekktopia as your needs evolve.',
              },
              {
                title: 'Reliability',
                subtitle: '',
                description: 'Count on consistent, high performance solutions.',
              },
              {
                title: 'Customer Success ',
                subtitle: '',
                description:
                  'We prioritize your goals to ensure long term satisfaction.',
              },
              {
                title: '24/7 Support ',
                subtitle: '',
                description:
                  'Access help anytime with our round the clock service.',
              },
            ].map((_, index) => (
              <div key={index} className="flex-grow h-full ">
                <div className="text-[20px] sm:text-[24px] lg:text-[32px] leading-[46px] mb-2 font-bold text-[#C2813B]">
                  {_.title}
                </div>
                <p className="text-[14px] border-b-[0.05px] border-[#CCCCCC] py-8 text-[#FFFFFF]">
                  {_.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridgingExcellence;
