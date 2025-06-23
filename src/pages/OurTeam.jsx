import TeamImage from '../assets/images/Team.png';
import ourTeamImage1 from '../assets/images/ourTeamImage1.png';
import ourTeamImage2 from '../assets/images/ourTeamImage2.png';
import ourTeamImage3 from '../assets/images/ourTeamImage3.png';
import ourTeamImage4 from '../assets/images/ourTeamImage4.png';
import yellowLine from '../assets/images/yellowLine.png';
import Hero from '../components/Hero';
// import SignupTrigger from '../components/SignupTrigger';
import TeamMembers from '../components/TeamMembers';

export default function OurTeam() {
  // Array to store team images to avoid redundancy
  const teamImages = [ourTeamImage2, ourTeamImage3, ourTeamImage4];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero
        imageUrl={TeamImage}
        topText="Meet the minds behind the innovation,"
        bottomText="driven by passion, united by purpose."
      />

      {/* Our Team Section */}
      <section className="container mx-auto p-8 sm:p-16 relative">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Images */}
          <div className="flex flex-col gap-4 w-full lg:w-3/4">
            <img
              src={ourTeamImage1}
              alt="team"
              className="w-full lg:w-1/2 h-64 sm:h-auto filter grayscale object-cover"
            />
            <div className="flex flex-wrap lg:flex-nowrap gap-4 lg:gap-6">
              {teamImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`team ${index + 2}`}
                  className="w-full lg:w-1/3 h-40 sm:h-auto filter grayscale object-cover"
                />
              ))}
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="flex flex-col lg:absolute lg:right-12 w-full lg:w-[600px] lg:top-20">
            <h2 className="text-2xl sm:text-3xl mb-2 font-medium">
              {'Our Team Members'}
            </h2>
            <img src={yellowLine} alt="yellow line" className="w-1/5 h-[3px]" />
            <p className="text-left text-[14px] text-gray-500 mt-2">
              {
                'At Tekktopia, we believe that great work starts with a great team. Our people are the heart of what we do, and together, we bring a mix of creativity, expertise, and passion to every project. We’re not just tech enthusiasts,we’re problem solvers, innovators, and partners who care about making a difference for your business. Get to know the amazing individuals behind the magic.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="container mx-auto p-8 sm:p-16 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl font-medium text-center">
          {'Driving Innovation, Building Prosperity'}
        </h2>
        <img
          src={yellowLine}
          alt="yellow line"
          className="w-1/8 h-[3px] my-4 sm:my-8"
        />
        <TeamMembers />
      </section>
    </div>
  );
}
