import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { MdArrowForward } from 'react-icons/md';
import { getAllBlogPosts } from '@/studio/blogsData';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await getAllBlogPosts({ limit: 8 });
        setBlogPosts(posts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex flex-col gap-16">
        <Hero
          imageUrl={'/blog-hero.png'}
          topText="Tech that simplifies,"
          bottomText="Solutions that deliver"
        />
        <div className="text-center py-16">
          <div className="animate-pulse">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col gap-16">
        <Hero
          imageUrl={'/blog-hero.png'}
          topText="Tech that simplifies,"
          bottomText="Solutions that deliver"
        />
        <div className="text-center py-16">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-16 ">
      <Hero
        imageUrl={'/blog-hero.png'}
        topText="Tech that simplifies,"
        bottomText="Solutions that deliver"
      />

      <h2 className="text-center text-[32px] font-normal">
        {'Latest Articles'}
      </h2>

      <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center space-y-16 px-8">
        {/* Blog Posts Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {blogPosts.map((post) => (
            <Link
              to={`/blog/${post.slug.current}`}
              key={post._id}
              className="flex flex-col gap-2"
            >
              <img
                src={post.imageUrl || '/blog-1.png'}
                alt={post.imageAlt || post.title}
                className="w-full h-[200px] object-cover"
              />
              <p className="w-full leading-6 text-[18px]">{post.title}</p>
              {/* <p className="text-[16px] leading-5 text-gray-600">
                {post.excerpt || post.description}
              </p> */}
              <span className="cursor-pointer mt-auto text-[16px] leading-6 flex gap-2 items-center">
                {'Read More'} <MdArrowForward className="w-[18px]" />
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Blog;
