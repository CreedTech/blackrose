import { assets } from '../assets/images/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, EffectFade } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import ImageLightbox from '../component/ImageLightBox';

const Photography = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample data - replace with your actual photos
  //  const dummyPhotos = [
  //   {
  //     id: 1,
  //     imageUrl: '/path-to-wedding-photo.jpg',
  //     category: 'wedding',
  //   },
  //   {
  //     id: 2,
  //     imageUrl: '/path-to-lifestyle-photo.jpg',
  //     category: 'lifestyle',
  //   },
  //   // Add more photos...
  // ];
  const dummyPhotos = Array.from({ length: 32 }, (_, index) => ({
    id: index + 1,
    imageUrl:
      assets[
        `gallery${
          [
            'One',
            'Two',
            'Three',
            'Five',
            'Six',
            'Seven',
            'Eight',
            'Nine',
            'Eleven',
            'Twelve',
            'Thirteen',
            'Fourteen',
            'Fifteen',
            'Sixteen',
            'Seventeen',
            'Eighteen',
            'Nineteen',
            'Twenty',
            'TwentyOne',
            'TwentyTwo',
            'TwentyThree',
            'TwentyFour',
            'TwentyFive',
            'TwentySix',
          ][index]
        }`
      ], // Dynamically access the assets using the correct key names
    category: index % 2 === 0 ? 'wedding' : 'lifestyle', // Alternate categories
  }));

  // console.log(dummyPhotos);

  // console.log(dummyPhotos);

  const loadMorePhotos = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const nextPhotos = dummyPhotos.slice((page - 1) * 9, page * 9);
      setPhotos((prev) => [...prev, ...nextPhotos]);
      setHasMore(nextPhotos.length === 9);
      setPage((prev) => prev + 1);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    console.log('loading');
    loadMorePhotos();
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(photos[index]);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setSelectedImage(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setSelectedImage(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);
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

  return (
    <div className="container">
      <section className="blackrose-section-slider pb-0">
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

      <div className=" bg-black p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center text-white/60 text-sm mb-4">
            <a href="/" className="hover:text-white">
              Home
            </a>
            <span className="mx-2">/</span>
            <span>Photography</span>
          </div>

          {/* Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-white text-3xl font-bold">Recent Shots</h1>

            {/* <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <input
                  type="text"
                  placeholder="Search, filter and Apply"
                  className="w-full md:w-64 bg-transparent border border-white/20 rounded px-4 py-2 text-white focus:outline-none focus:border-white/40"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button className="px-4 py-2 border border-white/20 text-white rounded hover:bg-white/10">
                Apply
              </button>
            </div> */}
          </div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="group relative aspect-square overflow-hidden bg-gray-900"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={photo.imageUrl}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMorePhotos}
              disabled={loading}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full" />
              ) : (
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* No More Photos Message */}
        {!hasMore && photos.length > 0 && (
          <div className="text-center mt-8 text-white/60">
            No more photos to load
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-[999999] bg-black/90 flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation buttons */}
            <button
              className="absolute left-4 text-white hover:text-gray-300 z-50"
              onClick={handlePrevious}
            >
              <svg
                className="w-8 h-8"
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

            <button
              className="absolute right-4 text-white hover:text-gray-300 z-50"
              onClick={handleNext}
            >
              <svg
                className="w-8 h-8"
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

            {/* Main image */}
            <div className="relative max-w-7xl mx-auto">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.category}
                className="max-h-[90vh] object-contain"
              />

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-xl font-bold">{selectedImage.category}</h2>
                {/* <p className="text-sm opacity-75">{image.description}</p> */}
              </div>
            </div>

            {/* Thumbnails */}
            {/* <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
             <div className="flex gap-2 overflow-x-auto p-2">
               {image.map((thumb, index) => (
                 <button
                   key={index}
                   onClick={() => image.onThumbClick(index)}
                   className={`w-16 h-16 flex-shrink-0 ${
                     thumb.active ? 'ring-2 ring-white' : 'opacity-50'
                   }`}
                 >
                   <img
                     src={thumb.url}
                     alt=""
                     className="w-full h-full object-cover"
                   />
                 </button>
               ))}
             </div>
           </div> */}
          </div>
          // <ImageLightbox
          //   image={{
          //     ...selectedImage,
          //     onPrevious: handlePrevious,
          //     onNext: handleNext,
          //     thumbnails: photos.map((img, idx) => ({
          //       url: img.imageUrl,
          //       active: idx === currentIndex,
          //     })),
          //     onThumbClick: handleImageClick,
          //   }}
          //   onClose={handleClose}
          // />
        )}
      </div>
    </div>
  );
};

export default Photography;
