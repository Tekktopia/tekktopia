import { useState, useEffect } from 'react';
import RightArrowIcon from '../../../icons/RightArrowIcon';
import { getFeaturedBlogPosts } from '../../../../studio/blogsData';

const LatestArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setLoading(true);
        const featuredPosts = await getFeaturedBlogPosts(3);
        setArticles(featuredPosts);
      } catch (err) {
        console.error('Error fetching featured articles:', err);
        setError('Failed to load featured articles');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  if (loading) {
    return (
      <section className="mt-24 px-4 md:px-8 lg:px-16 ">
        <h2 className="text-left text-[24px] sm:text-[28px] md:text-[32px] mb-12">
          Explore our <br />
          Latest Articles
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="w-full h-[220px] sm:h-[260px] bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-24 px-4 md:px-8 lg:px-16 ">
        <h2 className="text-left text-[24px] sm:text-[28px] md:text-[32px] mb-12">
          Explore our <br />
          Latest Articles
        </h2>
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-24 px-4 md:px-8 lg:px-16 ">
      <h2 className="text-left text-[24px] sm:text-[28px] md:text-[32px] mb-12">
        Explore our <br />
        Latest Articles
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <div key={article._id} className="space-y-2 group">
            <img
              src={article.imageUrl || '/default-article.png'}
              alt={article.imageAlt || article.title}
              className="w-full h-[220px] sm:h-[260px] rounded-md object-cover transition-transform transform group-hover:scale-105"
            />
            <p className="text-[18px] leading-[24px]">{article.title}</p>
            <a href={`/blog/${article.slug.current}`} className="inline-block ">
              <button className="mt-2 flex items-center gap-4 py-2 rounded transition">
                {'Read More'}
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
