
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Parallax, EffectFade } from 'swiper/modules';
import 'swiper/css/effect-fade';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import { IoHeartCircleOutline } from 'react-icons/io5';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion';

const Photography = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [page, setPage] = useState(1);
  const { useImages, useLikeImage } = useGallery();
  const { data } = useImages(page);
  const likeMutation = useLikeImage();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -50]);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.div
      className="container bg-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Slider Section */}
      <motion.section
        className="blackrose-section-slider md:mt-10 mt-0 pb-0"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ y }}
      >
        <div className="next-container-center">
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[Navigation, Parallax, EffectFade]}
            speed={3000}
            parallax={true}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            className="swiper-container h-full"
          >
            {data?.images.map((slide, index) => (
              <SwiperSlide key={slide._id}>
                <div className="swiper-slide-block">
                  <motion.div
                    className="swiper-slide-block-img animate-box"
                    data-animate-effect="fadeInLeft"
                    data-swiper-parallax-y="100%"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={`/photography/${slide._id}`}>
                      <img
                        src={slide.watermarkedUrl}
                        alt={slide.title}
                        className="w-full object-cover md:h-full h-[300px]"
                      />
                    </Link>
                  </motion.div>
                  <div
                    className="swiper-slide-block-text animate-box"
                    data-animate-effect="fadeInRight"
                  >
                    <motion.h2
                      data-swiper-parallax-x="-60%"
                      className="next-main-title text-gray-900 mx-4 md:mx-0"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {slide.title}
                    </motion.h2>
                    <motion.h3
                      data-swiper-parallax-x="-50%"
                      className="next-main-subtitle text-gray-600"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {slide.category?.title}
                    </motion.h3>
                    <motion.a
                      data-swiper-parallax-x="-30%"
                      className="next-link text-gray-700 hover:text-gray-900"
                      href="#"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                    </motion.a>
                    <motion.span
                      data-swiper-parallax-y="60%"
                      className="next-number "
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {index + 1}
                    </motion.span>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Navigation buttons */}
            <motion.div
              className="swiper-button-next animate-box text-gray-700 hover:text-gray-900"
              data-animate-effect="fadeInRight"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
            </motion.div>
            <motion.div
              className="swiper-button-prev animate-box text-gray-700 hover:text-gray-900"
              data-animate-effect="fadeInLeft"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fa fa-long-arrow-left" aria-hidden="true"></i>
            </motion.div>
          </Swiper>
        </div>
      </motion.section>

      <div className=" p-4 md:p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <motion.a
              href="/"
              className="hover:text-gray-900 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Home
            </motion.a>
            <span className="mx-2">/</span>
            <span>Photography</span>
          </div>

          {/* Title and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.h1
              className="text-gray-900 text-3xl font-bold"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Recent Shots
            </motion.h1>
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {data?.images.map((photo, index) => (
            <motion.div
              key={photo._id}
              className="group relative aspect-square overflow-hidden bg-primary border border-gray-800 cursor-pointer shadow-sm hover:shadow-lg transition-shadow rounded-md"
              onClick={() => handleImageClick(index)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              layout
              layoutId={`photo-${photo._id}`}
            >
              <motion.img
                src={photo.watermarkedUrl}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              />

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.button
                  className="text-white border border-white px-6 py-2 rounded-full hover:bg-white hover:text-gray-900 transition-colors"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  View Details
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        {/* No More Photos Message */}
        {data?.total == 9 && (
          <motion.div
            className="text-center mt-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            No more photos to load
          </motion.div>
        )}

        {/* Pagination */}
        {data?.totalPages > 1 && (
          <motion.div
            className="row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="col-md-12 mt-40 mb-60 text-center animate-box"
              data-animate-effect="fadeInUp"
            >
              <ul className="blackrose-pagination-wrap align-center relative">
                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    className="cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    <i className="fa fa-angle-left"></i>
                  </a>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="text-gray-700">
                    Page {page} of {data.totalPages}
                  </span>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    className="cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === data.totalPages}
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}

       
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            >
              {/* Close button */}
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 z-50"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
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
              </motion.button>

              {/* Navigation buttons */}
              <motion.button
                className="absolute left-4 text-gray-700 hover:text-gray-900 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                whileHover={{ scale: 1.2, x: -5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
              </motion.button>

              <motion.button
                className="absolute right-4 text-gray-700 hover:text-gray-900 z-50"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                whileHover={{ scale: 1.2, x: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
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
              </motion.button>

              {/* Main image */}
              <motion.div
                className="relative max-w-7xl mx-auto"
                variants={lightboxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                <Link to={`/photography/${selectedImage._id}`}>
                  <motion.img
                    src={selectedImage.watermarkedUrl}
                    alt={selectedImage.category?.name}
                    className="max-h-[90vh] object-contain shadow-2xl"
                    layoutId={`photo-${selectedImage._id}`}
                  />
                </Link>

                {/* Image info */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 text-gray-900 bg-gradient-to-t from-white/90 to-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-xl font-bold">{selectedImage.title}</h2>
                  <p className="text-sm text-gray-600">
                    {selectedImage.category?.title}
                  </p>
                  {/* Additional info */}
                  <div className="flex items-center mt-2 space-x-4">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        likeMutation.mutate(selectedImage._id);
                      }}
                      className="flex items-center space-x-1 text-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <IoHeartCircleOutline
                        className={`w-5 h-5 ${
                          selectedImage.isLiked
                            ? 'text-red-500'
                            : 'text-gray-700'
                        }`}
                      />
                      <span className="text-gray-700">
                        {selectedImage.likeCount}
                      </span>
                    </motion.button>

                    {selectedImage.photographer && (
                      <div className="flex items-center space-x-2 text-gray-700">
                        <span>{selectedImage.photographer.name}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* Optional: Thumbnails */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex gap-2 overflow-x-auto p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg">
                  {data?.images.map((image, index) => (
                    <motion.button
                      key={image._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(index);
                      }}
                      className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden ${
                        currentIndex === index
                          ? 'ring-2 ring-gray-700'
                          : 'opacity-50'
                      }`}
                      whileHover={{ scale: 1.1, opacity: 1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <img
                        src={image.watermarkedUrl}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Photography;
