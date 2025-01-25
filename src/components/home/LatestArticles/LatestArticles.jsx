import RightArrowIcon from '../../../icons/RightArrowIcon';

const LatestArticles = () => {
  const articles = [
    { id: 1, img: 'article1.png', title: 'AI content detection in the emerging information ecosystem' },
    { id: 2, img: 'article3.png', title: 'How to deal with Big Tech power? The “ Big Tech Rah”, a new form of biopower in the digital age' },
    { id: 3, img: 'article8.png', title: 'The urban-tech feedback loop: A surveillance and development data-walk in South Lake Union' },
  ];

  return (
    <section className="mt-24 px-4 md:px-8 lg:px-16">
      <h2 className="text-left text-[24px] sm:text-[28px] md:text-[32px] mb-12">
        Explore our <br/>Latest Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map(({ id, img, title }) => (
          <div key={id} className="space-y-2 group">
            <img
              src={`/${img}`}
              alt={title}
              className="w-full h-[220px] sm:h-[260px] rounded-md object-cover transition-transform transform group-hover:scale-105"
            />
            <p className="text-[18px] leading-[24px]">{title}</p>
            <a href={`/blog/${id}`} className="inline-block ">
              <button className="mt-2 flex items-center gap-4 py-2 rounded transition">
                Read More{' '}
                <RightArrowIcon className="ml-2 transition-transform  group-hover:translate-x-1" />
              </button>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestArticles;
