import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/images/assets';

const SingleBlog = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     // Replace with your API endpoint
//     fetch(`https://api.example.com/posts/${id}`)
//       .then((response) => response.json())
//       .then((data) => setPost(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, [id]);

  //   if (!post) {
  //     return <div>Loading...</div>;
  //   }

  //   <div id="Lfa-page-loading" className="blackrose-pageloading">
  //   <div className="blackrose-pageloading-inner">
  //     <img src={assets.logo} className="logo" alt="" />
  //   </div>
  // </div>

  const featuredProducts = [
    {
      id: 1,
      name: 'Court Heels',
      price: 95.0,
      rating: 5,
      reviews: 91,
      image: assets.blogFive,
    },
    {
      id: 2,
      name: 'Leather Handbag',
      price: 150.0,
      rating: 4.5,
      reviews: 67,
      image: assets.blogSeven,
    },
    {
      id: 3,
      name: 'Wool Scarf',
      price: 35.0,
      rating: 4,
      reviews: 28,
      image: assets.galleryThirtyThree,
    },
    {
      id: 4,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: '5 Tips for Better Morning Routines',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit ipsum dolor sit amet.',
      image: assets.galleryTwentyThree,
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Outfit',
      description:
        'Learn the secrets to putting together a stylish and versatile wardrobe.',
      image: assets.galleryThirtyFour,
    },
    {
      id: 3,
      title: 'Top 10 Photography Destinations in 2025',
      description:
        'Discover the most stunning places to capture your next masterpiece.',
      image: assets.galleryTwentyEight,
    },
  ];
  return (
    <div className="container">
      <div className="bg-black text-white min-h-screen p-4 mt-10">
        <div className="max-w-full mx-auto">
          <a href="/" className="text-white mb-4 block">
            &larr; Back to Blog
          </a>
          <h1 className="text-3xl font-bold mb-2">
            10 Easy Ways to Stay Healthy While Traveling
          </h1>
          <div className="flex justify-between">
            <p className="text-gray-400 mb-4">November 29, 2024</p>
            <div className="flex flex-row gap-4">
              <img
                src={assets.x_icon}
                className="w-4 h-4 cursor-pointer"
                alt="X Icon"
              />
              <img
                src={assets.facebook_icon}
                className="w-4 h-4 cursor-pointer"
                alt="Facebook Icon"
              />
            </div>
          </div>
          <img
            src={assets.galleryNineteen}
            alt={assets.blogNine}
            className="w-full h-auto mb-4"
          />
          <div className="p-6 rounded-lg">
            <p className="mb-4 font-medium text-white">
              {' '}
              Lorem ipsum dolor sit amet consectetur adipiscing elit fusce,
              aliquam vehicula feugiat eu nulla massa sollicitudin platea,
              pretium est donec arcu netus potenti tempus. Accumsan metus
              viverra fermentum eu platea facilisi molestie feugiat dignissim,
              donec neque cubilia urna faucibus praesent aliquam curabitur, est
              velit senectus ante non aenean nascetur posuere. Placerat a velit
              risus gravida consequat bibendum tincidunt potenti arcu vel, ad
              commodo dignissim torquent neque hendrerit sed congue. Scelerisque
              facilisi ultrices posuere quisque pharetra porta massa iaculis
              condimentum mattis nascetur, justo sapien vivamus placerat
              suscipit ridiculus sagittis imperdiet viverra lobortis, nec primis
              molestie porttitor ornare arcu nullam himenaeos magna morbi.
              Integer parturient diam hac eleifend condimentum morbi quisque,
              nec metus curabitur montes turpis pharetra, tortor facilisi
              malesuada mollis eget ac.
            </p>
            {/* Add more content as needed */}
          </div>

          <section className="max-w-full mx-auto  py-10 relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Shop Featured Products</h2>
              <a
                href="/products"
                className="flex items-center hover:underline relative"
              >
                Shop All Products
                <span className="ml-2">+</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
              {featuredProducts.map((product) => (
                <div key={product.id} className=" py-4 rounded">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover mb-4"
                  />
                  <div className="flex justify-between items-center mb-2">
                    <h3>{product.name}</h3>
                    <span>${product.price.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < product.rating
                              ? 'text-yellow-400'
                              : 'text-gray-400'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm">({product.reviews})</span>
                  </div>
                  <button className="w-1/2 bg-white text-black py-2 hover:bg-gray-200 transition-colors">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Stories Section */}
          <section className="max-w-full mx-auto px-4 py-12 relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">
                Trending Stories in Lifestyle
              </h2>
              <a href="/blogs" className="flex items-center hover:underline">
                Read More Blogs
                <span className="ml-2">+</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2 group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-gray-400">{post.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
