import { client } from "./sanity";

/**
 * Get all blog posts from Sanity
 * @param {Object} options - Query options
 * @param {number} options.limit - Number of posts to return
 * @param {number} options.offset - Number of posts to skip
 * @param {boolean} options.publishedOnly - Only return published posts
 * @returns {Promise<Array>} Array of blog posts
 */
export const getAllBlogPosts = async (options = {}) => {
  const {
    limit = null,
    offset = 0,
    publishedOnly = true
  } = options;

  let query = `*[_type == "blog"`;
  
  // Filter for published posts only
  if (publishedOnly) {
    query += ` && published == true`;
  }
  
  query += `] | order(date desc)`;

  // Add pagination
  if (limit) {
    query += `[${offset}...${offset + limit}]`;
  } else if (offset > 0) {
    query += `[${offset}...]`;
  }

  // Define fields to fetch
  query += `{
    _id,
    title,
    slug,
    author,
    date,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    description,
    excerpt,
    sections,
    tags,
    category,
    featured,
    published,
    readingTime,
    seo
  }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

/**
 * Get blog post by slug
 * @param {string} slug - Blog post slug
 * @returns {Promise<Object|null>} Blog post object or null
 */
export const getBlogPostBySlug = async (slug) => {
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    author,
    date,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    description,
    excerpt,
    sections,
    tags,
    category,
    featured,
    published,
    readingTime,
    seo
  }`;

  try {
    const post = await client.fetch(query, { slug });
    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

/**
 * Get featured blog posts
 * @param {number} limit - Number of featured posts to return
 * @returns {Promise<Array>} Array of featured blog posts
 */
export const getFeaturedBlogPosts = async (limit = 3) => {
  const query = `*[_type == "blog" && featured == true && published == true] | order(date desc)[0...${limit}]{
    _id,
    title,
    slug,
    author,
    date,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    description,
    excerpt,
    category,
    readingTime
  }`;

  try {
    const posts = await client.fetch(query);
    return posts;
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    throw error;
  }
};

/**
 * Get blog posts by category
 * @param {string} category - Category slug
 * @param {number} limit - Number of posts to return
 * @returns {Promise<Array>} Array of blog posts
 */
export const getBlogPostsByCategory = async (category, limit = 10) => {
  const query = `*[_type == "blog" && category == $category && published == true] | order(date desc)[0...${limit}]{
    _id,
    title,
    slug,
    author,
    date,
    "imageUrl": image.asset->url,
    "imageAlt": image.alt,
    description,
    excerpt,
    category,
    readingTime
  }`;

  try {
    const posts = await client.fetch(query, { category });
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    throw error;
  }
};