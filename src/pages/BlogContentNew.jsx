import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBlogPostBySlug } from '@/studio/blogsData';

const BlogContent = () => {
  const { id } = useParams(); // This is now the slug
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = 'https://tekktopia.com';

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const post = await getBlogPostBySlug(id);
        if (post) {
          setBlog(post);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="mt-36 lg:px-16 sm:px-8 px-6 flex flex-col gap-16 w-full max-w-7xl">
        <div className="text-center py-16">
          <div className="animate-pulse">Loading blog post...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mt-36 lg:px-16 sm:px-8 px-6 flex flex-col gap-16 w-full max-w-7xl">
        <div className="text-center py-16">
          <div className="text-red-500">{error || 'Blog post not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-36 lg:px-16 sm:px-8 px-6 flex flex-col gap-16 w-full max-w-7xl">
      {/* Breadcrumb */}
      <h5 className="text-[14px]">
        <a href="/blog">
          <span className="text-[#28252480]">Blog &gt;</span>
        </a>{' '}
        {blog.title}
      </h5>

      {/* Blog Header */}
      <div className="mx-auto flex flex-col w-full lg:px-12 gap-4">
        <h5 className="font-medium text-[24px] sm:text-[32px] lg:text-[50px]">
          {blog.title}
        </h5>
        <p>
          <span className="text-[#2D5283] text-[14px] italic">
            By {blog.author}
          </span>{' '}
          - {blog.date}
        </p>
        <p className="text-[#697D95]">Share this publication</p>
        <div className="flex gap-4 text-xl">
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${url}/blog/${blog.slug.current}`)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${url}/blog/${blog.slug.current}`)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${url}/blog/${blog.slug.current}`)}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' ' + `${url}/blog/${blog.slug.current}`)}`}
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
      <div>
        <img
          src={blog.imageUrl || '/blog-1.png'}
          alt={blog.imageAlt || blog.title}
          className="w-full"
        />
      </div>
      {/* Blog Sections */}
      <div className="flex flex-col gap-24 lg:px-12">
        {blog.sections &&
          blog.sections.map((section, index) => (
            <div key={section._key || index} className="space-y-4">
              {section.heading && (
                <h3 className="font-medium text-[16px]">{section.heading}</h3>
              )}
              <p className="text-[14px] leading-[24px] text-[#697D95]">
                {section.content}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogContent;
