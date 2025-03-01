import { useState } from 'react';
import chevronDown from '../assets/icons/faq/chevronDown.svg';
import chevronUp from '../assets/icons/faq/chevronUp.svg';
const Faq = () => {
    const faqs = [
        {
          question: 'What does Tekktopia do?',
          answer:
            'Tekktopia is a technology solutions company that helps businesses innovate, optimize, and secure their digital presence. We specialize in mobile and web app development, data analytics, brand identity and design, IT consulting, cloud computing, and cybersecurity solutions. Our goal is to deliver cutting-edge technology that enhances efficiency and drives growth.',
        },
        {
          question: 'Who can benefit from Tekktopia’s services?',
          answer:
            'Our services are designed for startups, small businesses, and large enterprises across various industries. Whether you need a new digital platform, advanced data insights, or enhanced cybersecurity, we provide solutions tailored to your business needs. We work with companies in finance, healthcare, retail, education, government, and more, helping them leverage technology for success.',
        },
        {
          question: 'How can I get a consultation?',
          answer:
            'Getting a consultation with Tekktopia is easy. You can request a free consultation by visiting our website, filling out our contact form, or calling us directly. Our team will review your request and get back to you within 24 hours to discuss your project and how we can help.',
        },
        {
          question: 'Where is Tekktopia located?',
          answer:
            'Tekktopia operates globally, with headquarters in Lagos. We have a team of remote professionals who collaborate with clients across different regions, ensuring businesses worldwide can access our technology solutions regardless of location.',
        },
        {
          question: 'What industries does Tekktopia serve?',
          answer:
            'We provide services to a wide range of industries, including technology, healthcare, finance, retail, education, manufacturing, real estate, and government. Our flexible approach allows us to customize solutions for any business looking to improve efficiency, security, or digital presence. For further inquiries, contact us at info@tekktopia.com',
        },
        {
          question: 'What makes Tekktopia different from other tech companies?',
          answer:
            'Tekktopia stands out because of our expertise, scalability, and security-first approach. We offer end-to-end solutions, meaning we handle everything from strategy to execution. Our team consists of experienced professionals who prioritize innovation and customer satisfaction. We also ensure that every project is built with security and future scalability in mind.',
        },
        {
          question: 'How long has Tekktopia been in business?',
          answer:
            'Tekktopia was founded in 2024 and has since become a trusted provider of technology solutions. Over the years, we have helped businesses develop secure, scalable, and innovative digital solutions that drive growth and efficiency.',
        },
        {
          question: 'How does Tekktopia price its services?',
          answer:
            'Our pricing is customized based on each project’s scope, complexity, and timeline. We assess your requirements and provide a detailed proposal that outlines the cost and expected deliverables. This ensures you get a solution that fits your budget without compromising quality.',
        },
        {
          question: 'Does Tekktopia offer ongoing support and maintenance?',
          answer:
            'Yes! We provide post-launch support, system updates, security monitoring, and technical assistance. Our maintenance services ensure that your technology remains secure, up-to-date, and optimized for long-term success.',
        },
        {
          question: 'How can I get started with Tekktopia?',
          answer:
            'Starting with Tekktopia is simple. Contact us through our website, email, or phone, and our team will set up a consultation to understand your needs. We will then provide a tailored proposal and, once approved, begin working on your solution. Our goal is to make the process seamless and results-driven.',
        },
        {
            question: 'Do you offer refunds for services?',
            answer:
              'Our refund policy depends on the service provided. Contact our support team for case specific inquiries.',
          },
           {
            question: 'Do you offer after sales support?',
            answer:
              'Yes, we provide ongoing support for our services to ensure customer satisfaction. Contact our support team for assistance.',
          },
          {
            question: ' Can I request a custom service package?',
            answer:
              'Absolutely. We offer customized solutions tailored to your business needs. Reach out to us for more details.',
          },
    ];
    
  const [open, setOpen] = useState(null);

  const handleOpen = (index) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };
  return (
    <div className="bg-white h-full w-full grid place-items-center ">
      <div className="grid justify-center items-center  ">
        <div className="flex flex-col items-center justify-center py-7 ">
          <p className="text-[#137CC6] text-lg">Frequently Asked Questions</p>
          <h1 className="sm:text-3xl font-bold text-md text-center transition-[height] ease-in-out">
            Do you have any important concerns that need addressing
          </h1>
        </div>
        <div className="grid px-3 w-full lg:w-[1200px] gap-3 items-center ">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#CCCCCC]/10  p-5 rounded-xl "
              onClick={() => handleOpen(index)}
            >
              <div className="flex justify-between items-center transition duration-200 ease-in-out ">
                <p
                  className={
                    open === index
                      ? 'transition-[border] ease-linear border-b-2'
                      : 'border-b-0'
                  }
                >
                  {faq.question}
                </p>
                <img
                  src={open === index ? chevronUp : chevronDown}
                  alt="chevron down"
                />
              </div>
              <div className="">
                {open === index ? (
                  <p className="py-5 text-[#4F5E71]/70 font-[400px] text-base/6">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
