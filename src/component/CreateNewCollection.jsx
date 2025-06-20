import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useGallery } from '../hooks/useGallery';

const CreateCollectionModal = ({ isOpen, onClose, imageId }) => {
  // const [collectionName, setCollectionName] = useState('');
  // const [isCreating, setIsCreating] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  const {  useCreateCollection, useAddToCollection } =
    useGallery();

  // Get collections
  

  // Create collection mutation
  const createCollectionMutation = useCreateCollection();

  // Add to collection mutation
  const addToCollectionMutation = useAddToCollection();

  if (!isOpen) return null;

  const handleCreateCollection = async () => {
    try {
      const newCollection = await createCollectionMutation.mutateAsync({
        name: newCollectionName,
      });
      console.log(newCollection);
      toast.success(`Created ${newCollectionName} collection`);

      // Automatically add image to new collection
      await addToCollectionMutation.mutateAsync({
        collectionId: newCollection._id,
        imageId,
      });

      setNewCollectionName('');
      toast.success(`Added to ${newCollectionName} collection`);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Failed to create collection');
    }
  };

  // const handleAddToCollection = async (collectionId) => {
  //   try {
  //     await addToCollectionMutation.mutateAsync({
  //       collectionId,
  //       imageId,
  //     });
  //     toast.success('Added to collection');
  //     onClose();
  //   } catch (error) {
  //     console.log(error);
  //     toast.error('Failed to add to collection');
  //   }
  // };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-light border border-primary/10 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-primary font-medium">
            Create new collection
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

        <input
          type="text"
          value={newCollectionName}
          onChange={(e) => setNewCollectionName(e.target.value)}
          placeholder="Collection name"
          className="w-full bg-light/5 border border-primary/10 rounded px-4 py-2 text-primary placeholder-primary/40 focus:outline-none focus:border-primary/20 mb-4"
          // disabled={isCreating}
        />

        <button
          onClick={handleCreateCollection}
          disabled={
            !newCollectionName.trim() || createCollectionMutation.isLoading
          }
          className="relative group w-full py-2 rounded font-medium bg-primary text-light overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Sliding background effect */}
          <span className="absolute left-0 top-0 h-full w-0 bg-primary group-hover:w-full transition-all duration-300 ease-in-out z-0"></span>

          {/* Button content on top */}
          <span className="relative z-10 flex items-center justify-center">
            {createCollectionMutation.isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-black/20 border-t-black mr-2"></div>
                Creating...
              </>
            ) : (
              'Create Collection'
            )}
          </span>
        </button>
      </div>
      {/* Existing Collections */}
      {/* <div className="space-y-2 max-h-60 overflow-y-auto">
        {collectionsLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white/20 border-t-white mx-auto"></div>
          </div>
        ) : collections?.length > 0 ? (
          collections.map((collection) => (
            <button
              key={collection._id}
              onClick={() => handleAddToCollection(collection._id)}
              disabled={addToCollectionMutation.isLoading}
              className="w-full p-4 bg-gray-800 rounded text-left hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-white">{collection.name}</span>
                <span className="text-white/60">
                  {collection.imageCount} images
                </span>
              </div>
            </button>
          ))
        ) : (
          <p className="text-center text-white/60">No collections yet</p>
        )}
      </div> */}
      {/* </div> */}
    </div>
  );
};
CreateCollectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  // onCreate: PropTypes.func.isRequired,
  imageId: PropTypes.string.isRequired,
};

export default CreateCollectionModal;
