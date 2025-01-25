import TriangleIcon from '../../../icons/TriangleIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import About2 from '../../../assets/images/about/About2.png';

const OurStory = () => {
  const yearData = [
    {
      year: '2023',
      image: '/about-2023.png',
      title: 'The Beginning',
      description:
        'Tekktopia was born from a vision shared by a group of passionate innovators. In 2023, we laid the foundation of our mission to simplify technology and empower businesses with cutting-edge solutions. It was a year of bold ideas and endless possibilities.',
    },
    {
      year: '2024',
      image: '/about-2024.png',
      title: 'Growth',
      description:
        'In 2024, Tekktopia experienced remarkable growth. We expanded our services, collaborated with diverse clients, and pushed the boundaries of innovation. This was the year we transformed challenges into opportunities and made a lasting impact on the industries we serve.',
    },
    {
      year: '2025',
      image: '/about-2025.png',
      title: 'Present',
      description:
        'As of 2025, Tekktopia stands as a leader in technological innovation. With a growing team and an ever-expanding portfolio, we continue to deliver tailored solutions that simplify complex operations and empower businesses to thrive in a dynamic world.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  // Cycle through the years every 5 seconds, but pause when hovering
  useEffect(() => {
    if (!hovering) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % yearData.length);
      }, 5000);
      return () => clearInterval(interval); // Clean up on unmount
    }
  }, [hovering]);

  return (
    <div>
      <section className="mt-[120px]">
        <div className="flex flex-col md:flex-row gap-[40px]  justify-center px-4 sm:px-6 ldg:px-8">
          <div className="max-w-[620px] flex flex-col justify-center">
            <p className="text-[14px] font-medium mb-4">OUR STORY</p>
            <h2 className="text-[24px] sm:text-[32px] mb-4">
              How We Started Till Date
            </h2>
            <p className="text-[#697D95B2] text-[14px] w-full sm:w-[600px]">
              Tekktopia began as a collaboration between young curious minds,
              driven by a shared passion for innovation and problem-solving. We
              wanted to create a space where ideas could flow freely, a place
              where we could push boundaries while still refining existing
              technologies to help businesses run smoother and smarter.
              <br />
              <br />
              Our mission is simple but bold, to make a meaningful impact on the
              world. In a constantly shifting technology landscape, we aim to be
              a steady force bringing clarity, innovation, and calm amidst the
              chaos of change.
            </p>
          </div>

          <div
            className="relative w-full sm:w-[580px] h-[400px] cursor-pointer mt-6 md:mt-0"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <AnimatePresence>
              {yearData.map((year, index) =>
                index === currentIndex ? (
                  <motion.div
                    key={year.year}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    <img
                      src={year.image}
                      alt={year.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="top-0 absolute h-full flex flex-col justify-between px-[30px] py-[30px] box-border">
                      <h1 className="text-[24px] sm:text-[32px] text-white font-extrabold">
                        {year.year}
                      </h1>
                      <div className="text-white text-[14px] ">
                        <p className="text-[16px] font-medium">{year.title}</p>
                        {year.description}
                      </div>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row gap-[80px] justify-center mt-[120px] px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-[580px] h-[400px]">
          <img
            src={About2}
            alt="About Image"
            className="object-cover w-full h-full rounded-[16px]"
          />
        </div>
        <div className="max-w-[620px] flex flex-col justify-center px-[40px] box-border">
          <h2 className="text-[24px] sm:text-[32px] mb-4">
            We offer diverse tech-related solutions to our diverse range of
            clients
          </h2>
          <p className="text-[#697D95B2] text-[14px] sm:text-[16px] w-full">
            We deliver a range of tech solutions designed to meet the unique
            needs of every client we work with. From startups to established
            businesses, we’re here to simplify technology and empower you to
            achieve your goals with confidence.
          </p>
          <ul className="list-none mt-[16px]">
            <li className="flex items-center mt-[16px]">
              <TriangleIcon />
              <div className="ml-[8px] text-[14px] sm:text-[16px] text-[#697D95B2]">
                Cloud Solutions
              </div>
            </li>
            <li className="flex items-center mt-[16px]">
              <TriangleIcon />
              <div className="ml-[8px] text-[14px] sm:text-[16px] text-[#697D95B2]">
                Cybersecurity Solutions
              </div>
            </li>
            <li className="flex items-center mt-[16px]">
              <TriangleIcon />
              <div className="ml-[8px] text-[14px] sm:text-[16px] text-[#697D95B2]">
                Data Analytics and Business Intelligence
              </div>
            </li>
            <li className="flex items-center mt-[16px]">
              <TriangleIcon />
              <div className="ml-[8px] text-[14px] sm:text-[16px] text-[#697D95B2]">
                Web and Mobile App Development
              </div>
            </li>
            <li className="flex items-center mt-[16px]">
              <TriangleIcon />
              <div className="ml-[8px] text-[14px] sm:text-[16px] text-[#697D95B2]">
                IT Consulting
              </div>
            </li>
            <li className="flex items-center mt-[16px]">
              <TriangleIcon />
              <div className="ml-[8px] text-[14px] sm:text-[16px] text-[#697D95B2]">
                Brand Identity & Design
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
