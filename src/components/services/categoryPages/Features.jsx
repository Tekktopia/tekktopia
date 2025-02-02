import PropTypes from 'prop-types';
export default function Features({ features }) {
  return (
    <div>
      {features && features.length > 0 && (
        <section className="lg:py-12 px-6 mt-32 lg:px-[80px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex ${index === 1 ? 'lg:flex-col-reverse flex-col gap-0' : 'flex-col'} items-center gap-4 justify-between`}
              >
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-[285px]"
                />
                <div
                  className={`${index === 1 ? 'bg-[#C3C1DA]' : `${index == 2 ? 'bg-[#EEDAC4]' : 'bg-[#fff]'}`} p-6  py-8 min-h-[250px] font-medium shadow-md text-black`}
                >
                  <h3 className="text-[16px] mb-2">{feature.title}</h3>
                  <p className="text-[14px] text-[#13131397]">
                    {feature.description.split('. ').map((line, idx) => (
                      <span key={idx}>
                        {line.trim()}
                        {idx < feature.description.split('. ').length - 1 &&
                          '.'}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
Features.propTypes = {
  features: PropTypes.array.isRequired,
};
