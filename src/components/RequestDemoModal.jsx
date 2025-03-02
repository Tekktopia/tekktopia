import PropTypes from 'prop-types';
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import x from '../assets/icons/x.svg';
import check from '../assets/icons/check.svg';

const RequestDemoModal = ({ isOpen, onClose }) => {
  const form = useRef();
  const modalRef = useRef(); // To track modal content
  const popupRef = useRef(null);
  const [emailSent, setEmailSent] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_mrk3ohv', 'template_n3bfm7c', form.current, {
        publicKey: 'FRzkYgrpiHA_BogGH',
      })
      .then(
        () => {
          setEmailSent('Email sent successfully!');
          setShowPopup(true);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setEmailSent('Failed to send email!');
        }
      );
  };

  // Close modal if clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#241D31] bg-opacity-80 flex justify-center items-center z-50"
      onClick={handleBackdropClick} // Attach click listener to backdrop
    >
      <div
        ref={modalRef} // Ref to track modal content
        className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[80%] lg:w-[650px] p-6"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Request a Quote</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <form className="mt-4 space-y-4" ref={form} onSubmit={sendEmail}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 outline-0 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500  text-black"
              name="full_name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 outline-0 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-black"
              name="user_email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Needed
            </label>
            <select
              className="w-full border border-gray-300 outline-0 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-black"
              name="service_needed"
              required
            >
              <option>Select a service</option>
              {[
                'Mobile & Web Development',
                'Product Design and Envisioning',
                'Cloud Computing Services',
                'IT Consulting',
                'Data Analytics & Business Intelligence',
                'Cybersecurity Solutions',
              ].map((service) => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 outline-0 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-black"
              name="date"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              className="w-full border border-gray-300 outline-0 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-black"
              name="time"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Attach Note
            </label>
            <textarea
              placeholder="Your Note"
              className="w-full border border-gray-300 outline-0 rounded-lg p-2 mt-1 focus:ring-blue-500 focus:border-blue-500 text-black"
              name="message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-[#070223] text-[#6797D5] py-2 rounded-lg hover:bg-blue-800"
          >
            Complete Reservation &gt;
          </button>

          {showPopup && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              onClick={handleClickOutside}
            >
              <div
                ref={popupRef}
                className="bg-white p-6 rounded-xl shadow-md text-center w-[250px] sm:w-[350px] flex flex-col "
              >
                <button
                  onClick={() => setShowPopup(false)}
                  className="mb-4  self-end"
                >
                  <img src={x} alt="close" className="size-7" />
                </button>
                <div className="flex flex-col items-center justify-center p-4 gap-3">
                  <img src={check} alt="check" />
                  <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
                    {emailSent}
                  </h3>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RequestDemoModal;

RequestDemoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
