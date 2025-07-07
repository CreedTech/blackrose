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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-light border border-primary/50 rounded-lg w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-primary font-medium">
              Add to Collection
            </h2>
            <button
              onClick={onClose}
              className="text-primary/60 hover:text-primary"
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
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/60 border-t-primary"></div>
            </div>
          ) : (
            <>
              <button
                className="w-full py-3 px-4 border border-primary/70 rounded flex items-center justify-between text-primary text-left hover:bg-main transition-colors mb-4"
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
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary/20 border-t-primary mx-auto"></div>
                  </div>
                ) : collections?.length > 0 ? (
                  collections?.map((collection) => (
                    <button
                      key={collection._id}
                      onClick={() =>
                        onAddToCollection(collection._id, imageData)
                      }
                      style={{
                        backgroundImage: `url(${
                          collection.images.at(-1)?.watermarkedUrl
                        })`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      className="w-full h-20 py-3 px-4 relative bg-primary/40 rounded text-primary text-left hover:bg-primary/20 transition-colors flex items-center justify-between"
                    >
                      <div className="absolute inset-0 bg-primary/40"></div>
                      <span className="relative text-light font-medium">
                        {collection.name}
                      </span>
                      <span className="text-light/60 relative">
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
                  <p className="text-center text-primary/70">
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
