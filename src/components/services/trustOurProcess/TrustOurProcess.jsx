import { useEffect, useState, useRef } from 'react';

const TrustOurProcess = () => {
  const progressBarData = [
    { text: '24/7 Support', barPercent: 94 },
    { text: 'Technical Assistance', barPercent: 89 },
    { text: 'Bug Fixing', barPercent: 87 },
    { text: 'Customer Service', barPercent: 92 },
  ];

  const [isVisible, setIsVisible] = useState([false, false, false, false]);
  const progressRefs = useRef([]);

  const handleIntersection = (entries, index) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      setIsVisible((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    } else {
      setIsVisible((prev) => {
        const updated = [...prev];
        updated[index] = false;
        return updated;
      });
    }
  };

  useEffect(() => {
    const observers = progressBarData.map((_, index) => {
      const observer = new IntersectionObserver(
        (entries) => handleIntersection(entries, index),
        { threshold: 0.5 }
      );
      if (progressRefs.current[index]) {
        observer.observe(progressRefs.current[index]);
      }
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="w-full bg-[url('/qualityAssuranceBg.png')] p-12 mt-[100px] rounded-md">
      <div className="mx-auto  gap-5 flex flex-col lg:flex-row text-white items-center">
        <div className="lg:w-[542px] mr-auto flex flex-col">
          <h2 className="text-2xl sm:text-3xl mb-2 font-medium">
            Trust Us Process
            <img
              src="/src/assets/images/yellowLine.png"
              alt="yellow line"
              className="w-1/2 my-2 h-[3px]"
            />
          </h2>
          <p className="text-[22px] font-semibold my-3">
            Our world class services that are unbeatable by no other
          </p>
          <p>
            With Tekktopia, you’re not just getting a service, you’re gaining a
            partner. We’re dedicated to building trust through reliable support,
            quick response times, and a commitment to keeping your technology
            running flawlessly.
            <br/><br/>
            Focus on growing your business while we take
            care of your IT. We’re here to make your technology work as hard as
            you do.
          </p>
        </div>
        <div className="w-full lg:w-[40%] gap-3 h-[158px] flex flex-col justify-between">
          {progressBarData.map((item, index) => (
            <div key={index}>
              <div className="text-[white]">{item.text}</div>
              <div
                ref={(el) => (progressRefs.current[index] = el)}
                className="relative w-full h-[7px] rounded-[50px] bg-[white] mt-[6px]"
              >
                <div
                  className={`h-full bg-[#F5901F] relative transition-width duration-1000 ease-in-out rounded-md`}
                  style={{
                    width: isVisible[index] ? `${item.barPercent}%` : '0%',
                  }} // Dynamically update width based on visibility
                >
                  <div
                    className={`absolute top-[-35px] right-0 transform translate-x-[50%] bg-[white] text-[black] text-xs py-1 px-2 rounded transition-opacity duration-1500 ease-in-out ${isVisible[index] ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transitionDelay: isVisible[index] ? '1s' : '0s' }} // Tooltip delay to show after bar fills
                  >
                    {item.barPercent}%
                    <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-[white]"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustOurProcess;
