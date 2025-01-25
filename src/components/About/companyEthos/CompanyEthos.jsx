import ShadedTriangleIcon from '../../../icons/ShadedTriangleIcon';

import About4 from '../../../assets/images/about/About4.png'

const CompanyEthos = () => {
  const cards = [
    {
      title: 'Mission',
      description:
        'We have tasked ourselves with raising the standard of technology provided in the region by providing quality technical solutions for your business needs.',
    },
    {
      title: 'Vision',
      description:
        'Tekktopia aims to revolutionize cloud and IT services with scalable solutions. Our goal is to enhance the marketability of businesses, positioning them as next-level players in their respective fields.',
    },
    {
      title: 'Core Values',
      description:
        'Our core value is to create solutions that truly empower individuals and businesses, making life simpler, more connected, and full of opportunities. We’re committed to putting human experiences at the heart of every innovation we drive.',
    },
  ];

  return (
    <section className="mt-[176px] max-w-[1280px] mx-auto ">
      <div className="flex flex-col lg:flex-row justify-between">
        {/* Left Image Section */}
        <div className="relative w-full lg:w-[700px] h-[750px] mb-8 lg:mb-0">
          <img
            src={About4}
            alt="Company Ethos Overview"
            className="object-cover w-full h-full"
          />
          <div className="flex flex-col items-center justify-between h-[506px] w-[150px] absolute top-[32px] right-[32px]">
            {['Mission', 'Vision', 'Core Values'].map((title, index) => (
              <div
                key={index}
                className="w-full h-[150px] bg-[#0000004D] rounded-[30px] flex flex-col items-center justify-center text-[white]"
              >
                <div className="text-[50px] mb-[2px]">{index + 1}</div>
                <div>{title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Cards Section */}
        <div className="flex flex-col gap-[32px] items-center w-full lg:w-[544px]">
          {cards.map((card, index) => (
            <div
              className="w-full h-[304px] bg-[#F8F8FA] p-[40px] box-border rounded-[20px]"
              key={index}
            >
              <ShadedTriangleIcon />
              <div className="mt-[40px]">
                <div className="text-[16px] font-bold">{card.title}</div>
                <div className="text-[14px] text-[#697D95B2] mt-[12px]">
                  {card.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyEthos;
