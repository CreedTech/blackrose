
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import DownloadModal from '../component/DownloadModal';
import AddToCollectionModal from '../component/AddToCollectionModal';
import CreateCollectionModal from '../component/CreateNewCollection';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useGallery } from '../hooks/useGallery';
import { IoHeartCircleOutline } from 'react-icons/io5';
import { ShopContext } from '../context/ShopContext';
import {
  motion,
} from 'framer-motion';

const PhotographyDetails = () => {
  const { imageId } = useParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { navigate, token } = useContext(ShopContext);


  const {
    useGetSingleImage,
    useImages,
    useLikeImage,
    useDownloadImage,
    useCollections,
    useAddToCollection,
  } = useGallery();
  const [page, setPage] = useState(1);
  const { data: images } = useImages(page);
  const { data: image, isLoading, error } = useGetSingleImage(imageId);
  const { data: collections, isLoading: collectionsLoading } = useCollections();
  const addToCollectionMutation = useAddToCollection();
  const likeMutation = useLikeImage();
  const downloadMutation = useDownloadImage();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleLike = async () => {
    if (!token) {
      navigate('/login', {
        state: { from: `/gallery/${imageId}` }, 
      });
      return;
    }
    likeMutation.mutate(imageId);
  };

  const handleDownload = async () => {
    if (!token) {
      navigate('/login', {
        state: { from: `/gallery/${imageId}` },
      });
      return;
    }

    try {
      const blob = await downloadMutation.mutateAsync(imageId);

      // Create blob URL
      const url = window.URL.createObjectURL(blob);

      // Create temporary link
      const link = document.createElement('a');
      link.href = url;
      link.download = `${image.title || 'image'}.jpg`; // Set filename

      // Append to document, click, and cleanup
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Revoke blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error('Failed to download image');
      console.error('Download error:', error);
    }
  };

  const handleAddToCollection = async (collectionId) => {
    if (!token) {
      navigate('/login', {
        state: { from: `/gallery/${imageId}` },
      });
      return;
    }
    try {
      await addToCollectionMutation.mutateAsync({
        collectionId,
        imageId,
      });
      toast.success('Added to collection');

      // onClose();
      setShowAddToCollection(false);
    } catch (error) {
      console.log(error);
      if (error.status == 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add to collection');
      }
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.download-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(images?.images[index]);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex =
      (currentIndex - 1 + images?.images.length) % images?.images.length;
    setSelectedImage(images?.images[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images?.images.length;
    setSelectedImage(images?.images[newIndex]);
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error.message}
      </div>
    );
  }

  if (!image) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Image not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light text-primary container ">
      {/* Navigation */}
      <Helmet>
        <title>{image.title} | BlackRose</title>
        <meta name="description" content={image.description} />
      </Helmet>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:py-4">
        <div className="flex items-center text-sm text-primary/60 relative">
          <Link to="/" className="hover:text-primary cursor-pointer">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/photography" className="hover:text-primary cursor-pointer">
            Photography
          </Link>
          <span className="mx-2">/</span>
          <span>{image.title}</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto md:px-4 px-2 md:py-4 relative z-[99] overflow-hidden">
        <div className="w-full text-primary md:px-4 py-3 flex md:items-center flex-col space-y-4 md:space-y-0 md:flex-row justify-between ">
          {/* Left side - Profile Info */}
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="w-10 h-10 rounded-full bg-primary overflow-hidden">
              <img
                src={assets.about}
                alt="Kurosaki Tinubu"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Category */}
            <div>
              <h2 className="font-medium md:text-lg text-base text-primary">
                {image.photographer.name}
              </h2>
              <div className="flex items-center md:text-sm text-xs text-primary">
                <span>{image.category != null && 'Category:'}</span>
                <span className="md:ml-1  text-primary">
                  {image.category?.title}
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-2">
            <button
              //  onLike={() => likeMutation.mutate(image._id)}
              onClick={handleLike}
              disabled={likeMutation.isLoading}
              className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                image.isLiked
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-primary hover:bg-primary/90'
              }`}
            >
              <svg
                className={`w-5 h-5 ${image.isLiked ? 'fill-current' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Add Button */}
            <button
              onClick={() => setShowAddToCollection(true)}
              className="w-10 h-10 border border-primary rounded flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {/* Download Button */}
            <div className="relative download-dropdown">
              <button
                onClick={handleDownload}
                disabled={downloadMutation.isLoading}
                className="relative h-10 px-6 overflow-hidden bg-primary text-light rounded flex items-center justify-center group border border-transparent hover:border-primary transition-all duration-300 ease-in-out"
              >
                {/* Sliding white background */}
                <span className="absolute left-0 top-0 h-full w-0 bg-white group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>

                {/* Button content on top */}
                <span className="relative z-10 flex items-center group-hover:text-primary transition-colors duration-300">
                  <span className="mr-4">
                    {downloadMutation.isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Downloading...
                      </span>
                    ) : (
                      'Download'
                    )}
                  </span>
                </span>
              </button>

              <AddToCollectionModal
                isOpen={showAddToCollection}
                onClose={() => setShowAddToCollection(false)}
                collections={collections}
                imageData={image}
                isLoading={collectionsLoading}
                onAddToCollection={handleAddToCollection}
                onCreateNew={() => {
                  setShowAddToCollection(false);
                  setShowCreateCollection(true);
                }}
              />

              <CreateCollectionModal
                isOpen={showCreateCollection}
                onClose={() => {
                  setShowCreateCollection(false);
                  setShowAddToCollection(true);
                }}
                // onCreate={handleCreateCollection}
                imageId={image._id}
              />
              <DownloadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
              {/* Download Dropdown - Hidden by default */}
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                    Download HD
                  </button>
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                    Download SD
                  </button>
                  <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                    Download Mobile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-1 md:gap-12 gap-4 z-[9]">
          {/* Left Column - Images */}
          <div className="md:space-y-6 rounded-md">
            {/* Main Image */}
            <div className="w-full h-[400px] md:h-full bg-gray-900 rounded-md">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover z-[9] rounded-md"
              />
            </div>
          </div>
          <div className="">
            {/* Photographer Info */}

            {/* Title */}
            <h1 className="text-4xl font-bold">{image.title}</h1>

            {/* Description */}
            <p className="text-primary/80 leading-relaxed">
              {image.description}
            </p>
          </div>

          {/* Right Column - Info */}
        </div>

        {/* Recent Shots Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Recent Shots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images?.images.map((photo, index) => (
              <div
                key={photo._id}
                className="group relative aspect-square  overflow-hidden bg-gray-900 rounded-md"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={photo.watermarkedUrl}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 rounded-md group-hover:scale-105"
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
        </div>

        {images?.total == 9 && (
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
        {images?.totalPages > 1 && (
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
                    Page {page} of {image.totalPages}
                  </span>
                </motion.li>

                <motion.li
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <a
                    className="cursor-pointer text-gray-700 hover:text-gray-900"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === image.totalPages}
                  >
                    <i className="fa fa-angle-right"></i>
                  </a>
                </motion.li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 z-[999999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
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
            <div className="relative md:max-w-7xl max-w-[20rem] mx-auto">
              <img
                onClick={() => {
                  setSelectedImage(null);
                  window.scrollTo(0, 0);
                  navigate(`/photography/${selectedImage._id}`);
                }}
                src={selectedImage.watermarkedUrl}
                alt={selectedImage.category?.name}
                className="max-h-[90vh] object-contain"
              />

              {/* Image info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-xl font-bold text-white">
                  {selectedImage.title}
                </h2>
                <p className="text-sm text-white">
                  {selectedImage.category?.title}
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex gap-2 overflow-x-auto p-2">
                {images?.images.map((image, index) => (
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

export default PhotographyDetails;

