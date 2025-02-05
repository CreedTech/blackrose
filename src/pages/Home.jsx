// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import { useGallery } from '../hooks/useGallery';

const Home = () => {
  const { useCategories, useImages } = useGallery();
  const { data: categories } = useCategories();
  const { data: images } = useImages();

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
    <div>
      <section className="container">
        <section className="blackrose-section-slider mt-10 pb-0">
          <div className="relative h-[600px] w-full ">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={assets.bg_img}
                alt="Photographer capturing city"
                className="w-full h-full object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
              {/* Main Heading */}
              <h1 className="text-2xl md:text-4xl font-bold text-center max-w-2xl mb-8 font-inter">
                Capture Beauty, Explore Stories, and Shop the Extraordinary
              </h1>

              {/* Scroll Down Button */}
              <Link to="/photography">
                <button className="animate-bounce p-2 rounded-full border-2 border-white/50 hover:border-white transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </button>
              </Link>

              {/* Welcome Box */}
              <div className="absolute bottom-0 right-0 bg-black/80 p-6 max-w-md">
                <h2 className="text-sm font-semibold mb-2">
                  WELCOME TO BLACK ROSE
                </h2>
                <p className="text-lg">
                  Immerse yourself in breathtaking visuals, curated blogs, and a
                  premium shopping experience—all in one place.
                </p>
                <a
                  href="/lifestyle"
                  className="inline-flex items-center mt-4 text-sm hover:underline"
                >
                  Explore
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="projects pt-130 mb-30">
        <div className="container">
          <div className="row">
            <div
              className="section-head col-md-12 text-start animate-box"
              data-animate-effect="fadeInUp"
            >
              <h4>Discover the Best of The Black Rose</h4>
            </div>

            {categories?.map((category) => (
              <div
                key={category._id}
                className="col-md-4 animate-box"
                data-animate-effect="fadeInUp"
              >
                <div className="item">
                  <div className="position-re o-hidden aspect-square">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover "
                    />
                  </div>
                  <div className="con">
                    <p className="text-lg">{category.title}</p>
                    <p>{category.description}</p>
                    <a href={category.link}>
                      <i className="fa fa-long-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Gallery */}
      <div className="blackrose-section">
        <div className="container">
          <div className="row mb-4">
            <div
              className="section-head text-start col-md-12 animate-box"
              data-animate-effect="fadeInUp"
            >
              <h4>Spotlight on photography</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images?.images.map((image) => (
                <Link
                  to={`/photography/${image._id}`}
                  key={image._id}
                  className={`relative mb-4 cursor-pointer overflow-hidden group aspect-square`}
                >
                  <img
                    src={image.watermarkedUrl}
                    alt={image.title}
                    className="w-full h-full object-cover  transition-transform duration-300 group-hover:scale-105 aspect-square"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-semibold">{image.title}</h3>
                      {image.photographer && (
                        <p className="text-sm opacity-75">
                          {image.photographer.name}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* <div
              className="col-md-4 animate-box"
              data-animate-effect="fadeInUp"
            >
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryOne}
                  data-caption="Quisque in felis"
                >
                  <img className="img-fluid" src={assets.galleryOne} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryTwo}
                  data-caption="Pellentesque habitant"
                >
                  <img className="img-fluid" src={assets.galleryTwo} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryEleven}
                  data-caption="Curabitur convallis"
                >
                  <img
                    className="img-fluid"
                    src={assets.galleryEleven}
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryThree}
                  data-caption="Quisque in dolor"
                >
                  <img className="img-fluid" src={assets.galleryThree} alt="" />
                </a>
              </figure>
            </div>
            <div
              className="col-md-4 animate-box"
              data-animate-effect="fadeInUp"
            >
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryEighteen}
                  data-caption="Aliquam non luctus"
                >
                  <img
                    className="img-fluid"
                    src={assets.galleryEighteen}
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.gallerySeventeen}
                  data-caption="Quality in felis"
                >
                  <img
                    className="img-fluid"
                    src={assets.gallerySeventeen}
                    alt=""
                  />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.gallerySixteen}
                  data-caption="Vivamus a nisi"
                >
                  <img
                    className="img-fluid"
                    src={assets.gallerySixteen}
                    alt=""
                  />
                </a>
              </figure>
            </div>
            <div
              className="col-md-4 d-none d-lg-block animate-box"
              data-animate-effect="fadeInUp"
            >
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryEight}
                  data-caption="Mauris pretium"
                >
                  <img className="img-fluid" src={assets.galleryEight} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galleryNine}
                  data-caption="Nunc blandit purus"
                >
                  <img className="img-fluid" src={assets.galleryNine} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.gallerySeven}
                  data-caption="Nunc ultrices tellus"
                >
                  <img className="img-fluid" src={assets.gallerySeven} alt="" />
                </a>
              </figure>
              <figure>
                <a
                  className="d-block mb-4"
                  data-fancybox="images"
                  href={assets.galnin}
                  data-caption="Orci varius natoque"
                >
                  <img className="img-fluid" src={assets.galnin} alt="" />
                </a>
              </figure>
            </div> */}
          </div>
          <div className="">
            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto  py-10 relative">
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
            <section className="max-w-7xl mx-auto px-4 py-12 relative">
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

            {/* Newsletter Section */}
            {/* <section className="bg-white text-black py-16">
                  <div className="max-w-2xl mx-auto text-center px-4">
                    <h2 className="text-3xl font-bold mb-4">
                      Stay Connected with The Black Rose
                    </h2>
                    <p className="mb-8">
                      Be the first to know about new arrivals, featured
                      galleries, and exclusive blogs
                    </p>
                    <div className="flex max-w-md mx-auto">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="flex-1 px-4 py-2 border border-gray-300"
                      />
                      <button className="bg-black text-white px-6 py-2 hover:bg-gray-800">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </section> */}

            {/* Call to Action Section */}
            {/* <section className="bg-white text-black py-16 z-30">
                  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-black">
                      Start Your Journey with The Black Rose Today!
                    </h2>
                    <button className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
                      Shop now
                    </button>
                  </div>
                </section> */}
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
