import PropTypes from 'prop-types'
export default function Testimonials({ testimonials }) {
  return (
    <div>
      {testimonials && testimonials.length > 0 && (
        <section className=" py-12 grid lg:grid-cols-2 gap-6 px-6 lg:px-[80px]">
          <div>
            {' '}
            <h1 className="text-[32px] font-medium">
              What sets us apart in this service?
            </h1>
            <p className="text-[14px]">
              Whether you{"'"}re a startup or an enterprise, our solutions cater
              to businesses of all sizes. Let us transform your ideas into
              reality with expert guidance and innovative technology.
            </p>
          </div>
          <img
            src={testimonials}
            alt="Testimonials"
            className="object-cover w-full h-full"
          />
        </section>
      )}
    </div>
  );
}

Testimonials.propTypes ={
    testimonials: PropTypes.string.isRequired
}
