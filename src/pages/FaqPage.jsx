import faq from '../assets/images/faq/faq.jpg';

import Faq from '../components/Faq';

const FaqPage = () => {
  return (
    <div className="w-screen ">
      <div className="relative">
        <img src={faq} alt="" className="w-full object-contain " />
        {/* top-[800px] sm:top-[800px] md:top-[600px] */}
        <h1 className="absolute bottom-0 sm:bottom-12 left-0 sm:text-5xl  lg:text-7xl text-2xl text-neutral-300 sm:text-white w-4/5 md:w-1/2 pl-5 pb-7 lg:pl-10 lg:pb-12">
          Frequently Asked Questions
        </h1>
      </div>

      <Faq />
    </div>
  );
};

export default FaqPage;
