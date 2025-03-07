// import HeroImage from '../assets/images/contactUsImage.png';
// import Hero from '../components/Hero';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Career() {
  return (
    //<div className="w-full flex flex-col min-h-screen mx-auto">
    <div className="w-full flex flex-col min-h-screen mx-auto items-center justify-center ">
      {/* Hero Section */}
      {/* <Hero
        imageUrl={HeroImage}
        topText="Creating Prosperity,"
        bottomText="Ensuring Tomorrow's Success"
      /> */}
      <div className="relative">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-lg opacity-70  animate-blob "></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob animation-delay-2"></div>
        <div className="absolute left-20 -bottom-8 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob animation-delay-4"></div>
        <div className="mt-24 p-10 bg-neutral-200 inline-flex w-[400px] items-center justify-center flex-col  rounded-full    ">
          <FaExclamationTriangle className="text-blue-400 text-6xl mb-4" />
          <h1 className="text-2xl text-neutral-700">{"No Available Jobs"}</h1>
        </div>
      </div>

      {/* Image Section */}
      {/* <div className="w-full flex-1 flex items-center justify-center">
        <img src="/400-Error.png" className="mx-auto" />
      </div> */}
    </div>
  );
}
