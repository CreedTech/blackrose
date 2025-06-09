
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { HeartIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { assets } from '../assets/images/assets';

const SingleBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

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
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  // Parse the content string as HTML
  // Note: For security, consider using a library like DOMPurify to sanitize HTML

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container relative mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6 text-sm">
          <Link to="/" className="text-gray-400 hover:text-white">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/lifestyle" className="text-gray-400 hover:text-white">
            Blog
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-primary">{post.category}</span>
        </div>

        {/* Back button */}
        <Link
          to="/lifestyle"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6"
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
                  className="px-3 py-1 bg-gray-800 text-gray-300 text-xs font-medium rounded-full"
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
              <p className="text-gray-400">
                {new Date(
                  post.publishedAt || post.createdAt
                ).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <div className="flex items-center space-x-1 text-gray-400">
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
                className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors"
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
        <article className="prose prose-lg prose-invert max-w-none mb-12">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Author section */}
        {post.author && (
          <div className="border-t border-gray-800 py-8 mb-12">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                {/* If author has profile image */}
                <img
                  src={assets.logo}
                  alt={post.author.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="font-medium text-white">
                  Written by {post.author.name}
                </p>
                <p className="text-gray-400 text-sm">
                  Photographer & Content Creator
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related products section */}
        {post.relatedProducts && post.relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Shop Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {post.relatedProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/shop/product/${product._id}`}
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
                </Link>
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
