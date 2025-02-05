import { useRef } from 'react';
import PropTypes from 'prop-types';

const AddToCollectionModal = ({
  isOpen,
  onClose,
  collections,
  isLoading,
  onAddToCollection,
  onCreateNew,
  imageData,
}) => {
  const modalRef = useRef();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-black border border-white/10 rounded-lg w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-white font-medium">
              Add to Collection
            </h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white"
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white"></div>
            </div>
          ) : (
            <>
              <button
                className="w-full py-3 px-4 border border-white/20 rounded flex items-center justify-between text-white text-left hover:bg-white/5 transition-colors mb-4"
                onClick={onCreateNew}
              >
                <span> Create a new collection</span>

                <svg
                  className="w-5 h-5 inline"
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

              <div className="space-y-2">
                {isLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white mx-auto"></div>
                  </div>
                ) : collections?.length > 0 ? (
                  collections.map((collection) => (
                    <button
                      key={collection._id}
                      onClick={() =>
                        onAddToCollection(collection._id, imageData)
                      }
                      style={{
                        '--image-url': `url(${collection.images[collection.images.length -1].watermarkedUrl})`,
                      }}
                      className="w-full h-20 py-3 px-4 relative bg-white/10 rounded text-white text-left hover:bg-white/20 transition-colors flex items-center justify-between bg-[image:var(--image-url)] bg-fill"
                    >
                      <div className="absolute inset-0 bg-black/40"></div>
                      <span className="relative">{collection.name}</span>
                      <span className="text-white/60 relative">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-center text-white/60">
                    No collections yet
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
AddToCollectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  collections: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onAddToCollection: PropTypes.func.isRequired,
  onCreateNew: PropTypes.func.isRequired,
  imageData: PropTypes.object.isRequired,
};

export default AddToCollectionModal;
