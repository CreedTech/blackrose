// import { assets } from '../assets/images/assets';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import { IoHeartCircleOutline } from 'react-icons/io5';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import ImageLightbox from '../component/ImageLightBox';

const Photography = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { useImages, useLikeImage } = useGallery();
  const { data } = useImages(page, category, search);
  // const { data: singleImage } = useGetSingleImage();
  const likeMutation = useLikeImage();

  const handleImageClick = (index) => {
    setSelectedImage(data?.images[index]);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex =
      (currentIndex - 1 + data?.images.length) % data?.images.length;
    setSelectedImage(data?.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % data?.images.length;
    setSelectedImage(data?.images[newIndex]);
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

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <section className="blackrose-section-slider mt-10 pb-0">
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
            {data?.images.map((slide, index) => (
              <SwiperSlide key={slide._id}>
                <div className="swiper-slide-block">
                  <div
                    className="swiper-slide-block-img animate-box"
                    data-animate-effect="fadeInLeft"
                    data-swiper-parallax-y="100%"
                  >
                    <Link to={`/photography/${slide._id}`}>
                      <img src={slide.watermarkedUrl} alt={slide.title} />
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
                      {slide.category.title}
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
          {data?.images.map((photo, index) => (
            <div
              key={photo._id}
              className="group relative aspect-square overflow-hidden bg-gray-900"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={photo.watermarkedUrl}
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
        {data?.totalPages > 1 && (
          <div className="row">
            <div
              className="col-md-12 mt-40 mb-60 text-center animate-box"
              data-animate-effect="fadeInUp"
            >
              <ul className="blackrose-pagination-wrap align-center relative">
                <li>
                  <a
                    // href=""
                    className="cursor-pointer"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    <i className="fa fa-angle-left"></i>
                  </a>
                </li>

                <li>
                  <span href="" className="">
                    Page {page} of {data.totalPages}
                  </span>
                </li>

                <li>
                  <a
                    // href=""
                    className="cursor-pointer"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === data.totalPages}
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
        {/* Pagination */}
        {/* {data?.totalPages == 1 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded mr-2"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {page} of {data.totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === data.totalPages}
              className="px-4 py-2 border rounded ml-2"
            >
              Next
            </button>
          </div>
        )} */}
        {/* Load More Button */}

        {/* {hasMore && (
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
        )} */}

        {/* No More Photos Message */}
        {data?.images.length == 9 && (
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
              <Link to={`/photography/${selectedImage._id}`}>
                <img
                  src={selectedImage.watermarkedUrl}
                  alt={selectedImage.category.name}
                  className="max-h-[90vh] object-contain"
                />
              </Link>

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-xl font-bold">{selectedImage.title}</h2>
                <p className="text-sm text-white">
                  {selectedImage.category.title}
                </p>
                {/* Additional info */}
                <div className="flex items-center mt-2 space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      likeMutation.mutate(selectedImage._id);
                    }}
                    className="flex items-center space-x-1 text-sm"
                  >
                    <IoHeartCircleOutline
                      className={`w-5 h-5 ${
                        selectedImage.isLiked ? 'text-red-500' : 'text-white'
                      }`}
                    />
                    <span>{selectedImage.likeCount}</span>
                  </button>

                  {selectedImage.photographer && (
                    <div className="flex items-center space-x-2">
                      {/* <img
                        src={selectedImage.photographer.avatar}
                        alt={selectedImage.photographer.name}
                        className="w-6 h-6 rounded-full"
                      /> */}
                      <span>{selectedImage.photographer.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* Optional: Thumbnails */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2 overflow-x-auto p-2">
                {data?.images.map((image, index) => (
                  <button
                    key={image._id}
                    onClick={() => handleImageClick(index)}
                    className={`w-16 h-16 flex-shrink-0 ${
                      currentIndex === index
                        ? 'ring-2 ring-white'
                        : 'opacity-50'
                    }`}
                  >
                    <img
                      src={image.watermarkedUrl}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Photography;
