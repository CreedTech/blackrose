import { useState, useEffect, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { HeartIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { assets } from '../assets/images/assets';
import { motion } from 'framer-motion';
import { ShopContext } from '../context/ShopContext';

const SingleBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/blog/posts/${slug}`);
        setPost(response.data.data.post);

        // Check if user has liked this post (could be stored in localStorage)
        const likedPosts = JSON.parse(
          localStorage.getItem('likedPosts') || '[]'
        );
        setLiked(likedPosts.includes(response.data.data.post._id));
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [slug]);

  const handleLikePost = () => {
    // Toggle like status
    const newLikedState = !liked;
    setLiked(newLikedState);

    // Update local storage
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (newLikedState) {
      if (!likedPosts.includes(post._id)) {
        likedPosts.push(post._id);
      }
    } else {
      const index = likedPosts.indexOf(post._id);
      if (index > -1) {
        likedPosts.splice(index, 1);
      }
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

    // You could also update the like count on the server here
  };
  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error || 'Post not found'}</p>
        <button
          onClick={() => navigate('/lifestyle')}
          className="mt-4 px-4 py-2 bg-light text-primary rounded"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  // Parse the content string as HTML
  // Note: For security, consider using a library like DOMPurify to sanitize HTML

  return (
    <div className=" text-primary">
      <div className="container relative mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/" className="text-gray-600 hover:text-primary">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/lifestyle" className="text-gray-600 hover:text-primary">
            Blog
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-primary">{post.title}</span>
        </div>

        {/* Back button */}
        <Link
          to="/lifestyle"
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 font-"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Blog
        </Link>

        {/* Post header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
              {post.category}
            </span>
            {post.tags &&
              post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-100 text-xs font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {post.title}
          </h1>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <p className="text-gray-800 font-medium">
                {new Date(
                  post.publishedAt || post.createdAt
                ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <div className="flex items-center space-x-1 text-gray-800 font-medium">
                <EyeIcon className="w-5 h-5" />
                <span>{post.views} views</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* <button
                onClick={handleLikePost}
                className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors"
              >
                {liked ? (
                  <HeartIconSolid className="w-5 h-5 text-primary" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button> */}

              <button
                onClick={handleShare}
                className="flex items-center space-x-1 text-gray-800 hover:text-primary transition-colors font-medium"
              >
                <ShareIcon className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured image */}
        <div className="mb-8">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-auto max-h-[600px] object-cover rounded-lg"
          />
        </div>

        {/* Article content */}
        <article className="prose prose-lg prose-invert max-w-none mb-12 text-primary">
          <div
            className="blog-content !text-dark"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author section */}
        {post.author && (
          <div className="border-t border-gray-800 py-8 mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary overflow-hidden">
                {/* If author has profile image */}
                <img
                  src={assets.logo}
                  alt={post.author.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-medium text-primary">
                  Written by {post.author.name}
                </p>
                <p className="text-gray-700 text-sm">
                  Photographer & Content Creator
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related products section */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <>
            <section className="mb-16">
              <h2 className="text-2xl font-bold mb-8">
                Shop Featured Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {post?.relatedProducts?.slice(0, 4).map((product, index) => (
                  <>
                    <motion.div
                      key={product._id}
                      className="py-4 rounded cursor-pointer relative"
                      variants={scaleIn}
                      custom={index}
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={`/shop/${product._id}`}
                        className="w-full mx-auto"
                      >
                        <motion.div
                          className="relative w-full h-64 mb-4 overflow-hidden rounded-md"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.img
                            src={product?.images[0]}
                            alt={product.title}
                            className="w-full h-full object-cover aspect-square rounded-md"
                            initial={{ scale: 1.2 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          />
                        </motion.div>
                      </Link>
                      <motion.div
                        className="flex justify-between items-center mb-2 text-lg text-darker font-medium"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        <h3>{product.title}</h3>
                        <motion.span
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{
                            delay: 0.3,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          viewport={{ once: true }}
                        >
                          ₦{product.price.toFixed(2)}
                        </motion.span>
                      </motion.div>
                      <motion.div
                        className="flex items-center mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => {
                            const full = star <= Math.floor(product.rating);
                            const half = !full && star - product.rating < 1;

                            return (
                              <motion.svg
                                key={star}
                                className={`w-4 h-4 ${
                                  full
                                    ? 'text-yellow-400'
                                    : half
                                    ? 'text-yellow-300'
                                    : 'text-gray'
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{
                                  delay: 0.1 * star,
                                  type: 'spring',
                                  stiffness: 200,
                                }}
                                viewport={{ once: true }}
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </motion.svg>
                            );
                          })}
                        </div>

                        <span className="ml-2 text-sm text-darker font-medium">
                          ({product.reviews.length})
                        </span>
                      </motion.div>
                      <motion.button
                        onClick={() => addToCart(product._id, 1)}
                        className="w-1/2 bg-black text-white py-2 hover:bg-secondary transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        Add to Cart
                      </motion.button>
                    </motion.div>
                    {/* <Link
                      key={product._id}
                      to={`/shop/${product._id}`}
                      className="group"
                    >
                      <div className="rounded-lg overflow-hidden mb-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">
                            ${product.price.toFixed(2)}
                          </span>
                          <button className="px-3 py-1 bg-primary text-white text-sm rounded hover:bg-primary/90 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </Link> */}
                  </>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  to="/shop"
                  className="inline-block px-6 py-3 bg-primary text-white font-medium rounded hover:bg-primary/90 transition-colors"
                >
                  Shop All Products
                </Link>
              </div>
            </section>
          </>
        )}

        {/* Related posts section */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  to={`/lifestyle/${relatedPost.slug}`}
                  className="group overflow-hidden rounded-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 bg-gray-900">
                    <div className="text-sm text-gray-400 mb-2">
                      {relatedPost.category} •{' '}
                      {new Date(
                        relatedPost.publishedAt || relatedPost.createdAt
                      ).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                    <h3 className="text-white font-medium group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
