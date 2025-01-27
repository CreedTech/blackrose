// components/PhotographyDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import DownloadModal from '../component/DownloadModal';
import AddToCollectionModal from '../component/AddToCollectionModal';
import CreateCollectionModal from '../component/CreateNewCollection';
import { toast } from 'react-toastify';
import useCollections from '../hooks/customHooks';
import { Helmet } from 'react-helmet';

const PhotographyDetails = () => {
  const { id } = useParams();
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddToCollection, setShowAddToCollection] = useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);

  const { collections, isLoading, saveCollections } = useCollections();
  //   const [loading, setLoading] = useState(false);
  //   const [page, setPage] = useState(1);
  //   const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  //   const [isLoading, setIsLoading] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    console.log(likeCount);
  };

  //   const toggleDropdown = () => {
  //     setIsDropdownOpen(!isDropdownOpen);
  //   };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.download-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Mock data - replace with your actual data fetching logic
  const photoData = {
    id,
    photographer: 'Kunoichi Tinubu',
    title: 'Anna Lussen',
    mainImage: assets.gallerySix,
    thumbnails: [
      assets.blogOne,
      assets.blogTwo,
      assets.blogThree,
      assets.blogFour,
      assets.blogFive,
      assets.blogSix,
    ],
    description: `Donec et elit quis mi tincidunt sollicitudin sed vitae dui. Nulla facilisi. 
    Maecenas faucibus ex sed est. Proin porttitor tristique ex. Quisque mattis lorem ipsum...`,
  };

  const handleCreateCollection = async (name) => {
    const newCollection = {
      id: Date.now(),
      name,
      images: [],
    };

    const success = await saveCollections([...collections, newCollection]);
    if (success) {
      toast.success('Collection created successfully!');
      setShowCreateCollection(false);
    }
  };

  const handleAddToCollection = async (collectionId, imageData) => {
    const updatedCollections = collections.map((collection) => {
      if (collection.id === collectionId) {
        return {
          ...collection,
          images: [...collection.images, imageData],
        };
      }
      return collection;
    });

    const success = await saveCollections(updatedCollections);
    if (success) {
      toast.success('Added to collection!');
      setShowAddToCollection(false);
    }
  };

  const dummyPhotos = Array.from({ length: 24 }, (_, index) => ({
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

  const handleImageClick = (index) => {
    setSelectedImage(dummyPhotos[index]);
    setCurrentIndex(index);
  };

  const handlePrevious = () => {
    const newIndex =
      (currentIndex - 1 + dummyPhotos.length) % dummyPhotos.length;
    setSelectedImage(dummyPhotos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % dummyPhotos.length;
    setSelectedImage(dummyPhotos[newIndex]);
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

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Helmet>
        <title>{photoData.title} | BlackRose</title>
        <meta name="description" content={photoData.description} />
      </Helmet>
      ;{/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center text-sm text-white/60">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/photography" className="hover:text-white">
            Photography
          </Link>
          <span className="mx-2">/</span>
          <span>Anna Lussen</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full bg-black text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
          {/* Left side - Profile Info */}
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
              <img
                src={assets.about}
                alt="Kurosaki Tinubu"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Category */}
            <div>
              <h2 className="font-medium text-lg">Kurosaki Tinubu</h2>
              <div className="flex items-center text-sm text-gray-400">
                <span>Category:</span>
                <span className="ml-1 text-white">Trending</span>
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-3">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`w-10 h-10 border rounded flex items-center justify-center transition-colors ${
                isLiked
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-white/20 hover:bg-white/10'
              }`}
            >
              <svg
                className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
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
              className="w-10 h-10 border border-white/20 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
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
                onClick={() => setIsModalOpen(true)}
                // onClick={toggleDropdown}
                className="h-10 px-6 bg-white text-black rounded flex items-center justify-center hover:bg-white/90 transition-colors"
              >
                <span className="mr-2">Download</span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AddToCollectionModal
                isOpen={showAddToCollection}
                onClose={() => setShowAddToCollection(false)}
                collections={collections}
                imageData={photoData}
                isLoading={isLoading}
                onAddToCollection={handleAddToCollection}
                onCreateNew={() => {
                  setShowAddToCollection(false);
                  setShowCreateCollection(true);
                }}
              />

              <CreateCollectionModal
                isOpen={showCreateCollection}
                onClose={() => setShowCreateCollection(false)}
                onCreate={handleCreateCollection}
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
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="w-full bg-gray-900">
              <img
                src={photoData.mainImage}
                alt={photoData.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="">
            {/* Photographer Info */}

            {/* Title */}
            <h1 className="text-4xl font-bold">{photoData.title}</h1>

            {/* Description */}
            <p className="text-white/80 leading-relaxed">
              {photoData.description}
            </p>
          </div>
          {/* Thumbnails */}
          <div className="grid grid-cols-2 gap-4">
            {photoData.thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={() => setSelectedThumbnail(index)}
                className={`aspect-auto overflow-hidden ${
                  selectedThumbnail === index
                    ? 'ring-2 ring-white'
                    : 'opacity-60'
                }`}
              >
                <img src={thumb} alt="" className="w-full h-60 object-cover" />
              </button>
            ))}
          </div>

          {/* Right Column - Info */}
        </div>

        {/* Recent Shots Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Recent Shots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyPhotos.map((photo, index) => (
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
        </div>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotographyDetails;
