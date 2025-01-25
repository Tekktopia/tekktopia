import contactUsImage from '../assets/images/contactUsImage.png';
import yellowLine from '../assets/images/yellowLine.png';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Map from '../components/Map';
import Form from '../components/Form';
import Hero from '../components/Hero';
// import SignupTrigger from '../components/SignupTrigger';

// ContactUs component
export default function ContactUs() {
  // Array containing contact information
  const contactLinks = [
    {
      icon: 'FaPhone',
      title: 'Call Us at',
      info: ['+234 815 433 2992', '+234 810 596 3769', '+234 909 330 9638'],
      href: 'tel:',
    },
    {
      icon: 'FaMapMarkerAlt',
      title: 'Location',
      info: [
        '43, Baale Street, Idado Estate, Igbo-Efon, Off Lekki - Epe Expressway, Lagos State, Nigeria.',
      ],
      href: 'google.com',
    },
    {
      icon: 'FaEnvelope',
      title: 'Send us a mail',
      info: ['info@tekktopia.com'],
      href: 'mailto:',
    },
  ];

  return (
    <div className="w-full ">
      {/* Hero Section */}
      <Hero
        imageUrl={contactUsImage}
        topText="Let’s build something"
        bottomText=" extraordinary together"
      />

      {/* Contact Info Section */}
      <section className="relative w-full p-10 max-w-[1280px] mx-auto">
        <div className="w-full flex flex-col  lg:w-1/2 items-start">
          <h2 className="text-2xl sm:text-3xl mb-2 font-medium">
            Contact Information
          </h2>
          <img src={yellowLine} alt="yellow line" className="w-1/4 h-[3px]" />
          <p className="text-left text-xs lg:text-[14px] leading-6 mt-2">
            We’re committed to responding promptly and ensuring your experience
            with us is seamless. Whether you have a question, need support, or
            want to explore how we can work together, we’d love to hear from
            you.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 mt-8 ">
          {contactLinks.map((contactLink, index) => (
            // Contact link item
            <div key={index} className="flex gap-2 lg:gap-8 items-center">
              {contactLink.icon === 'FaPhone' && (
                <FaPhone className="text-[#B0610F] text-xl rotate-90" />
              )}
              {contactLink.icon === 'FaMapMarkerAlt' && (
                <FaMapMarkerAlt className="text-[#B0610F] text-3xl" />
              )}
              {contactLink.icon === 'FaEnvelope' && (
                <FaEnvelope className="text-[#B0610F] text-xl" />
              )}
              <div className="flex flex-col gap-1">
                <h4 className="text-xs lg:text-[24px] font-medium">
                  {contactLink.title}
                </h4>
                <div className="flex flex-col">
                  {contactLink.info.length > 1 ? (
                    contactLink.info.map((info, index) => (
                      <a key={index} href={contactLink.href + contactLink.info[index]}>
                        <p  className="text-[#747474]">
                          {info}
                        </p>
                      </a>
                    ))
                  ) : (
                    <a href={contactLink.href + contactLink.info}>
                      <p className="text-[#747474]">{contactLink.info}</p>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full z-0">
        <Map />
      </section>

      {/* Form Section */}
      <section className="relative w-full h-[450px] sm:h-[650px] py-20 px-6">
        <Form />
      </section>
    </div>
  );
}
