import { assets } from '../assets/images/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';

const Shop = () => {
  const sliderData = [
    {
      id: 1,
      image: assets.sliderTwo,
      title: 'Anna Lussen',
      subtitle: 'Model, Moscow',
      description:
        'Quisque pellentesque odio ut libero iaculis, nec fringilla sapien tincidunt. Sed laoree nulvinar ex sed estas in duru rana.',
    },
    {
      id: 2,
      image: assets.sliderOne,
      title: 'Tomas & Isabel',
      subtitle: 'Wedding, Norwalk',
      description:
        'Quisque pellentesque odio ut libero iaculis, nec fringilla sapien tincidunt. Sed laoree nulvinar ex sed estas in duru rana.',
    },
    {
      id: 3,
      image: assets.galleryTwentyOne,
      title: 'Jenna & James',
      subtitle: 'Wedding, London',
      description:
        'Quisque pellentesque odio ut libero iaculis, nec fringilla sapien tincidunt. Sed laoree nulvinar ex sed estas in duru rana.',
    },
  ];
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
    {
      id: 5,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
    {
      id: 6,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
    {
      id: 7,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
    {
      id: 8,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
    {
      id: 9,
      name: 'Classic Watch',
      price: 250.0,
      rating: 4.8,
      reviews: 123,
      image: assets.galleryNineteen,
    },
  ];
  return (
    <div className="container">
      <section className="blackrose-section-slider pb-0 md:mt-10 mt-0">
        <div className="next-container-center">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            // modules={[EffectCards]}
            modules={[Navigation, Parallax, EffectFade]}
            speed={3000}
            parallax={true}
            loop={true}
            // effect="fade"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="swiper-container h-full"
          >
            {sliderData.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="swiper-slide-block">
                  <div
                    className="swiper-slide-block-img animate-box"
                    data-animate-effect="fadeInLeft"
                    data-swiper-parallax-y="100%"
                  >
                    <Link to={`/photography/${slide.id}`}>
                      <img src={slide.image} alt={slide.title} />
                    </Link>
                  </div>
                  <div
                    className="swiper-slide-block-text animate-box"
                    data-animate-effect="fadeInRight"
                  >
                    <h2
                      data-swiper-parallax-x="-60%"
                      className="next-main-title"
                    >
                      {slide.title}
                    </h2>
                    <h3
                      data-swiper-parallax-x="-50%"
                      className="next-main-subtitle"
                    >
                      {slide.subtitle}
                    </h3>
                    <p data-swiper-parallax-x="-40%" className="next-paragraph">
                      {slide.description}
                    </p>
                    <a
                      data-swiper-parallax-x="-30%"
                      className="next-link"
                      href="#"
                    >
                      View Details
                    </a>
                    <span data-swiper-parallax-y="60%" className="next-number">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation buttons */}
            <div
              className="swiper-button-next animate-box"
              data-animate-effect="fadeInRight"
            >
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </div>
            <div
              className="swiper-button-prev animate-box"
              data-animate-effect="fadeInLeft"
            >
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
            </div>
          </Swiper>
        </div>
          </section>
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
                  <Link to={`/shop/${product.name}`} key={product.id} className=" py-4 rounded cursor-pointer relative">
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
                  </Link>
                ))}
              </div>
            </section>
    </div>
  );
};

export default Shop;
