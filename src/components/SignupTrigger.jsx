import PropTypes from 'prop-types';
export default function SignupTrigger({ signUpRounded }) {
  return (
    <div
      className={`relative w-full flex flex-col rounded-lg mt-10   ${signUpRounded ? 'lg:rounded-lg' : ''}`}
    >
      <img
        src="/footer.png"
        alt="footer"
        className={`w-full h-[418px] ${signUpRounded ? 'lg:rounded-lg' : ''}`}
      />
      <div className="left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] w-full max-w-6xl px-4 mx-auto absolute text-white gap-4 ">
        <p className="font-[500] hero text-center text-[40px] mb-[20px]">
          Dedicated to Innovating The Future of Technology
        </p>
        <p className="text-center">Tekktopia</p>
      </div>
    </div>
  );
}

SignupTrigger.propTypes = {
  signUpRounded: PropTypes.bool,
};
