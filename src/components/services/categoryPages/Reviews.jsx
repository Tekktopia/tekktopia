import PropTypes from 'prop-types'
import { FiChevronRight } from 'react-icons/fi';

export default function Reviews({reviews}) {
  return (
    <section className="bg-white text-black px-6 lg:px-[80px] w-full gap-12  flex flex-col items-center justify-center pt-16 pb-10">
        <h1 className="text-[32px]">What Our Customers Say</h1>
        <div className="grid sm:grid-cols-2 gap-6 mt-10 w-full max-w-[1280px]">
          <img
            src={reviews.image}
            alt="Review Guy"
            className="max-w-[552px] w-full"
          />
          <div className="p-8 bg-gradient-to-r from-[#F4DBBF] to-[#EEDAC4] justify-between flex flex-col">
            <h2 className="text-[14px]">{reviews.name}</h2>
            <p className="sm:text-[20px]">{reviews.comment}</p>
            <a
              href="/contact-us"
              className={`bg-[#070223] lg:mt-auto mt-8 text-[#6797D5] hover:text-white max-w-[170px] px-4 py-2 box-border rounded-md text-xs sm:text-sm font-medium flex items-center`}
            >
              Connect With Us <FiChevronRight className="ml-2" />
            </a>
          </div>
        </div>
      </section>
  )
}

Reviews.propTypes = {
  reviews: PropTypes.object.isRequired
}