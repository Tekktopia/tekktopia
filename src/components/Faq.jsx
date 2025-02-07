import { useState } from 'react';
import chevronDown from '../assets/icons/faq/chevronDown.svg';
import chevronUp from '../assets/icons/faq/chevronUp.svg';
const Faq = () => {
  const faqs = [
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
    },
    {
      question: 'What is Tekktopia?',
      answer:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque vitae dolorem ipsum vel aliquam, suscipit maxime nihil aut totam ea ratione laboriosam odit molestiae inventore nesciunt provident fuga minima odio?',
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
