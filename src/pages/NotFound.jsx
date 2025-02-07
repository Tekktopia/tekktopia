import HeroImage from '../assets/images/contactUsImage.png';
import Hero from '../components/Hero';
export default function NotFound() {
  return (
    <div className="w-full  mx-auto">
      {/* Hero Section */}
      <Hero
        imageUrl={HeroImage}
        topText="Creating Prosperity,"
        bottomText="Ensuring Tomorrow's Success"
      />
      <section className="relative w-full p-10">
        <div className="w-full flex">
          {/* <img src="/400-Error.png" className="mx-auto" /> */}
          <h1>Page Coming Soon</h1>
        </div>
      </section>
    </div>
  );
}
