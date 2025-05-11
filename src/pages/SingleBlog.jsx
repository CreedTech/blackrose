// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets } from '../assets/images/assets';

// const SingleBlog = () => {

//   const featuredProducts = [
//     {
//       id: 1,
//       name: 'Court Heels',
//       price: 95.0,
//       rating: 5,
//       reviews: 91,
//       image: assets.blogFive,
//     },
//     {
//       id: 2,
//       name: 'Leather Handbag',
//       price: 150.0,
//       rating: 4.5,
//       reviews: 67,
//       image: assets.blogSeven,
//     },
//     {
//       id: 3,
//       name: 'Wool Scarf',
//       price: 35.0,
//       rating: 4,
//       reviews: 28,
//       image: assets.galleryThirtyThree,
//     },
//     {
//       id: 4,
//       name: 'Classic Watch',
//       price: 250.0,
//       rating: 4.8,
//       reviews: 123,
//       image: assets.galleryNineteen,
//     },
//   ];

//   const blogPosts = [
//     {
//       id: 1,
//       title: '5 Tips for Better Morning Routines',
//       description:
//         'Lorem ipsum dolor sit amet consectetur adipiscing elit ipsum dolor sit amet.',
//       image: assets.galleryTwentyThree,
//     },
//     {
//       id: 2,
//       title: 'How to Choose the Perfect Outfit',
//       description:
//         'Learn the secrets to putting together a stylish and versatile wardrobe.',
//       image: assets.galleryThirtyFour,
//     },
//     {
//       id: 3,
//       title: 'Top 10 Photography Destinations in 2025',
//       description:
//         'Discover the most stunning places to capture your next masterpiece.',
//       image: assets.galleryTwentyEight,
//     },
//   ];
//   return (
//     <div className="container">
//       <div className="bg-black text-white min-h-screen p-4 md:mt-10 mt-0">
//         <div className="max-w-full mx-auto">
//           <a href="/" className="text-white mb-4 block">
//             &larr; Back to Blog
//           </a>
//           <h1 className="text-3xl font-bold mb-2">
//             10 Easy Ways to Stay Healthy While Traveling
//           </h1>
//           <div className="flex justify-between">
//             <p className="text-gray-400 mb-4">November 29, 2024</p>
//             <div className="flex flex-row gap-4">
//               <img
//                 src={assets.x_icon}
//                 className="w-4 h-4 cursor-pointer"
//                 alt="X Icon"
//               />
//               <img
//                 src={assets.facebook_icon}
//                 className="w-4 h-4 cursor-pointer"
//                 alt="Facebook Icon"
//               />
//             </div>
//           </div>
//           <img
//             src={assets.galleryNineteen}
//             alt={assets.blogNine}
//             className="w-full h-auto mb-4"
//           />
//           <div className="p-6 rounded-lg">
//             <p className="mb-4 font-medium text-white">
//               {' '}
//               Lorem ipsum dolor sit amet consectetur adipiscing elit fusce,
//               aliquam vehicula feugiat eu nulla massa sollicitudin platea,
//               pretium est donec arcu netus potenti tempus. Accumsan metus
//               viverra fermentum eu platea facilisi molestie feugiat dignissim,
//               donec neque cubilia urna faucibus praesent aliquam curabitur, est
//               velit senectus ante non aenean nascetur posuere. Placerat a velit
//               risus gravida consequat bibendum tincidunt potenti arcu vel, ad
//               commodo dignissim torquent neque hendrerit sed congue. Scelerisque
//               facilisi ultrices posuere quisque pharetra porta massa iaculis
//               condimentum mattis nascetur, justo sapien vivamus placerat
//               suscipit ridiculus sagittis imperdiet viverra lobortis, nec primis
//               molestie porttitor ornare arcu nullam himenaeos magna morbi.
//               Integer parturient diam hac eleifend condimentum morbi quisque,
//               nec metus curabitur montes turpis pharetra, tortor facilisi
//               malesuada mollis eget ac.
//             </p>
//             {/* Add more content as needed */}
//           </div>

//           <section className="max-w-full mx-auto  py-10 relative">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold">Shop Featured Products</h2>
//               <a
//                 href="/products"
//                 className="flex items-center hover:underline relative"
//               >
//                 Shop All Products
//                 <span className="ml-2">+</span>
//               </a>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
//               {featuredProducts.map((product) => (
//                 <div key={product.id} className=" py-4 rounded">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-64 object-cover mb-4"
//                   />
//                   <div className="flex justify-between items-center mb-2">
//                     <h3>{product.name}</h3>
//                     <span>${product.price.toFixed(2)}</span>
//                   </div>
//                   <div className="flex items-center mb-4">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <svg
//                           key={i}
//                           className={`w-4 h-4 ${
//                             i < product.rating
//                               ? 'text-yellow-400'
//                               : 'text-gray-400'
//                           }`}
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                         </svg>
//                       ))}
//                     </div>
//                     <span className="ml-2 text-sm">({product.reviews})</span>
//                   </div>
//                   <button className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors">
//                     Add to Cart
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Trending Stories Section */}
//           <section className="max-w-full mx-auto px-4 py-12 relative">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-2xl font-bold">
//                 Trending Stories in Lifestyle
//               </h2>
//               <a href="/blogs" className="flex items-center hover:underline">
//                 Read More Blogs
//                 <span className="ml-2">+</span>
//               </a>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {blogPosts.map((post) => (
//                 <div key={post.id} className="group cursor-pointer">
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-64 object-cover mb-4"
//                   />
//                   <h3 className="text-xl font-bold mb-2 group-hover:underline">
//                     {post.title}
//                   </h3>
//                   <p className="text-gray-400">{post.description}</p>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleBlog;

// src/pages/SingleBlog.jsx
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { HeartIcon, ShareIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

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
              <button
                onClick={handleLikePost}
                className="flex items-center space-x-1 text-gray-400 hover:text-primary transition-colors"
              >
                {liked ? (
                  <HeartIconSolid className="w-5 h-5 text-primary" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>

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
                  src="/author-placeholder.jpg"
                  alt={post.author.name}
                  className="w-full h-full object-cover"
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
