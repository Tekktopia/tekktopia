import faq from '../assets/images/faq/faq.jpg';

import Faq from '../components/Faq';
import Hero from '../components/Hero';

const FaqPage = () => {
  return (
    <div className="w-full h-full ">
      <Hero imageUrl={faq} topText="Frequently Asked" bottomText="Questions" />
      {/* <div className="h-full w-full flex flex-col items-center ">
        <Faq />
      </div> */}
      <Faq />
    </div>
  );
};

export default FaqPage;
