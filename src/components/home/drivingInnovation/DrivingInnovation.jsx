const DrivingInnovation = () => {
  const inno = [
    { id: 1, img: '/inno1.png', title: 'Transportation' },
    { id: 2, img: '/inno2.png', title: 'Corporate Organisation' },
    { id: 3, img: '/inno3.png', title: 'Health care' },
    { id: 4, img: '/inno4.png', title: 'Finance' },
  ];

  return (
    <section className="mt-40 flex flex-col items-center px-4 lg:px-16">
      {/* Heading Section */}
      <div className="relative text-center">
        <span className="inline-block pb-4 text-[24px] sm:text-[28px] md:text-[32px] font-[400] relative">
          {"Tekktopia"}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-[-2px] w-[120px] sm:w-[150px] md:w-[200px] border-b-[3px] border-[#F8901F80]"></span>
        </span>
      </div>

      {/* Description Text */}
      <div className="text-center text-[14px] leading-[24px] mx-auto text-[#697D95B2] mt-6 max-w-[700px]">
        <p>{'Driving Innovation, Building Prosperity.'}</p>
        {
          "Whether you're scaling your business, optimizing operations, or exploring new markets, our technology solutions are designed to make growth seamless."
        }
      </div>

      {/* Innovation Sections */}
      <div className="mt-24 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {inno.map((inn) => (
          <div
            key={inn.id}
            className="relative transform hover:-translate-y-2 transition duration-300 ease-in-out"
          >
            <img src={inn.img} alt="" className="w-full h-auto object-cover" />
            <h1 className="text-[16px] sm:text-[18px] md:text-[20px] text-left absolute mb-4 left-6 bottom-0 font-[700] text-[#FFFFFF]">
              {inn.title}
            </h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DrivingInnovation;
