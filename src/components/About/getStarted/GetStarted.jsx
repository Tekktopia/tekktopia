import GlobalIcon from '../../../icons/GlobalIcon';

const GetStarted = () => {
  const items = [
    {
      title: 'Tailored Solutions',
      description:
        'Customized strategies designed to meet your unique needs and goals',
    },
    {
      title: 'Seamless Integration',
      description:
        'Effortless adoption and implementation for your business processes.',
    },
    {
      title: 'Data-Driven Insights',
      description: 'Harnessing analytics to empower informed decision-making',
    },
    {
      title: '24/7 Support ',
      description:
        'Round-the-clock assistance to ensure smooth operations and reliability.',
    },
  ];

  return (
    <section className="mt-[50px] lg:mt-[200px] px-4 sm:px-8">
      <div className="flex flex-col lg:flex-row text-center justify-between items-center">
        <div className="text-[32px] max-w-[518px] leading-[45px] text-center lg:text-left">
          {'Bridging excellence and innovation across diverse sectors.'}
        </div>
        <div className="max-w-[484px] text-[14px] text-[#697D95B2] text-center sm:text-left mt-4 sm:mt-0">
          {
            'Every client is unique, and so are their challenges. We’re committed to providing personalized tech solutions that fit your specific needs, ensuring you always have the tools to succeed.'
          }
        </div>
        {/* <div className="mt-6 sm:mt-16 text-[#0056b3] font-semibold cursor-pointer">
          Get started {">"}
        </div> */}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mt-[112px] gap-8 sm:gap-16">
        {items.map((item, index) => (
          <div
            className="flex flex-col items-center sm:items-start text-center sm:text-left max-w-[265px]"
            key={index}
          >
            <div className="h-[40px] w-[40px] border-[#CCCCCC4D] border-[1px] flex items-center justify-center rounded-md mb-4">
              <GlobalIcon />
            </div>
            <div className="text-[16px] text-[#697D95] lg:text-left w-full">
              {item.title}
            </div>
            <div className="text-[14px] text-[#697D95B2]">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GetStarted;
