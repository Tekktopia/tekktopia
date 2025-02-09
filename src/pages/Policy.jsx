import LegalPolicy from '../components/LegalPolicy';
import LegalRedirect from '../components/LegalRedirect';

const Policy = () => {
  return (
    <section className="mt-20 w-full h-full px-[40px] sm:px-[80px] py-4 mb-36 bg-[#FCFDFF]">
      <LegalRedirect />
      <LegalPolicy />
    </section>
  );
};

export default Policy;
