import { useState } from 'react';
import { assets } from '../assets/images/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Home = () => {
  const [email, setEmail] = useState('');

  const projects = [
    {
      id: 1,
      image: assets.serviceTwo,
      title: 'Explore exclusive high-res photo galleries by top photographers',
      link: '',
      categoryLink: '',
      categoryText: '01',
    },
    {
      id: 2,
      image: assets.serviceSix,
      title: 'Read stories, tips, and insights on living your best life',
      link: '',
      categoryLink: '',
      categoryText: '02',
    },
    {
      id: 3,
      image: assets.serviceFive,
      title: 'Shop premium products curated just for you',
      link: '',
      categoryLink: '',
      categoryText: '03',
    },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Court Heels',
      price: 95.0,
      rating: 5,
      reviews: 91,
      image: '/path-to-vest-image.jpg',
    },
    {
      id: 2,
      name: 'Leather Handbag',
      price: 150.0,
      rating: 4.5,
      reviews: 67,
      image: '/path-to-handbag-image.jpg',
    },
    {
      id: 3,
      name: 'Wool Scarf',
      price: 35.0,
      rating: 4,
      reviews: 28,
      image: '/path-to-scarf-image.jpg',
    },
    {
      id: 4,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: '/path-to-watch-image.jpg',
    },
  ];

  const blogPosts = [
    {
      id: 1,
      title: '5 Tips for Better Morning Routines',
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit ipsum dolor sit amet.',
      image: '/path-to-coffee-image.jpg',
    },
    {
      id: 2,
      title: 'How to Choose the Perfect Outfit',
      description:
        'Learn the secrets to putting together a stylish and versatile wardrobe.',
      image: '/path-to-outfit-image.jpg',
    },
    {
      id: 3,
      title: 'Top 10 Photography Destinations in 2025',
      description:
        'Discover the most stunning places to capture your next masterpiece.',
      image: '/path-to-destination-image.jpg',
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: 'The Black Rose has completely transformed how I explore photography and shop!',
      author: 'Joe Title',
      rating: 5,
    },
    {
      id: 2,
      text: 'I found the perfect accessories for every outfit here. Highly recommend!',
      author: 'Emily Johnson',
      rating: 4.8,
    },
    {
      id: 3,
      text: 'Great selection of products and excellent customer service!',
      author: 'Michael Brown',
      rating: 4.7,
    },
    {
      id: 4,
      text: 'The blog posts are so inspiring! I love reading them every morning.',
      author: 'Sarah Lee',
      rating: 5,
    },
    {
      id: 5,
      text: 'A must-visit store for anyone who loves fashion and lifestyle.',
      author: 'Chris Wang',
      rating: 4.9,
    },
  ];

  return (
    <div>
      {/* 
      <div id="blackrose-page-wrapper">
        <div className="content-lines-wrapper">
          <div className="content-lines-inner">
            <div className="content-lines"></div>
          </div>
        </div> */}
      <section className="container">
        <section className="blackrose-section-slider pt-10">
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
                  href="/explore"
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
      {/* <div className="container">
        <section className="blackrose-section-slider pt-130">
          <div className="relative w-full h-[500px] bg-cover bg-center">
            <a href="">
              <img src={assets.bg_img} alt="" />
            </a>
            <div>
              <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'> Capture Beauty, Explore Stories, and Shop the Extraordinary</p>
              <img
                src={assets.arrow_down}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 cursor-pointer"
                alt="Search Icon"
              />
            </div>
          </div>
        </section>
      </div> */}
      <section className="projects pt-130 mb-60">
        <div className="container">
          <div className="row">
            <div
              className="section-head col-md-12 text-start animate-box"
              data-animate-effect="fadeInUp"
            >
              <h4>Discover the Best of The Black Rose</h4>
            </div>

            {projects.map((project) => (
              <div
                key={project.id}
                className="col-md-4 animate-box"
                data-animate-effect="fadeInUp"
              >
                <div className="item">
                  <div className="position-re o-hidden">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="con">
                    <h5>
                      <a href={project.link}>{project.title}</a>
                    </h5>
                    <a href={project.link}>
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
            <div
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
            </div>
          </div>
          {/* Show more section */}
          <div className="row mb-4 align-items-stretch mt-60">
            <div className="col-12">
              <div className="blackrose-show-more-container">
                <div
                  className="row align-items-stretch blackrose-photos"
                  id="blackrose-section-photos"
                >
                  <div
                    className="col-md-4 animate-box"
                    data-animate-effect="fadeInUp"
                  >
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.galleryTwelve}
                        data-caption="Vestibulum leo velit"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryTwelve}
                          alt=""
                        />
                      </a>
                    </figure>
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.galleryFive}
                        data-caption="Etiam imperdiet hendrerit"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryFive}
                          alt=""
                        />
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
                        href={assets.galleryThirteen}
                        data-caption="Nulla turpis elementum"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryThirteen}
                          alt=""
                        />
                      </a>
                    </figure>
                    <figure>
                      <a
                        className="d-block mb-4"
                        data-fancybox="images"
                        href={assets.gallerySix}
                        data-caption="Pellentesque habitant"
                      >
                        <img
                          className="img-fluid"
                          src={assets.gallerySix}
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
                        href={assets.galleryFourteen}
                        data-caption="Quisque in felis"
                      >
                        <img
                          className="img-fluid"
                          src={assets.galleryFourteen}
                          alt=""
                        />
                      </a>
                    </figure>
                  </div>
                </div>
              </div>

              <div className="">
                {/* Featured Products Section */}
                <section className="max-w-7xl mx-auto px-4 py-12">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                      Shop Featured Products
                    </h2>
                    <a
                      href="/products"
                      className="flex items-center hover:underline"
                    >
                      Shop All Products
                      <span className="ml-2">+</span>
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                      <div key={product.id} className="bg-gray-900 p-4 rounded">
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
                          <span className="ml-2 text-sm">
                            ({product.reviews})
                          </span>
                        </div>
                        <button className="w-full bg-white text-black py-2 hover:bg-gray-200 transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Trending Stories Section */}
                <section className="max-w-7xl mx-auto px-4 py-12">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">
                      Trending Stories in Lifestyle
                    </h2>
                    <a
                      href="/blogs"
                      className="flex items-center hover:underline"
                    >
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
                <section className="bg-white text-black py-16">
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
                </section>

                {/* Testimonials Section */}
                <section className="py-16 bg-black">
                  <h2 className="text-3xl font-bold text-center mb-12 text-white">
                    Over 500,000 happy customers
                  </h2>
                  <div className="max-w-4xl mx-auto px-4 relative">
                    <Swiper
                      modules={[Navigation, Pagination, Autoplay]}
                      spaceBetween={30}
                      slidesPerView={1}
                      navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                      }}
                      pagination={{ clickable: true }}
                      autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                      }}
                      loop={true}
                      className="testimonials-swiper"
                    >
                      {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                          <div className="bg-white text-black p-8 rounded-lg shadow-lg">
                            <div className="flex mb-4">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < testimonial.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-lg mb-6 font-medium">
                              {testimonial.text}
                            </p>
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gray-200 rounded-full mr-4">
                                {/* You can add user avatar here */}
                              </div>
                              <div>
                                <p className="font-bold text-lg">
                                  {testimonial.author}
                                </p>
                                <p className="text-gray-600">
                                  {testimonial.jobTitle}
                                </p>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors">
                      <svg
                        className="w-6 h-6 text-black"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-white text-black py-16">
                  <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <h2 className="text-3xl font-bold">
                      Start Your Journey with The Black Rose Today!
                    </h2>
                    <button className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors">
                      Shop now
                    </button>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Home;
