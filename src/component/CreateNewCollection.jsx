import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const CreateCollectionModal = ({ isOpen, onClose, onCreate }) => {
  const [collectionName, setCollectionName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handleCreate = async () => {
    try {
      setIsCreating(true);
      await onCreate(collectionName);
      setCollectionName('');
      onClose();
    } catch (error) {
      toast.error(`Failed to create collection: ${error}`);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black border border-white/10 rounded-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl text-white font-medium">
            Create new collection
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
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
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Collection name"
          className="w-full bg-white/5 border border-white/10 rounded px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/20 mb-4"
          disabled={isCreating}
        />

        <button
          onClick={handleCreate}
          disabled={!collectionName.trim() || isCreating}
          className="w-full bg-white text-black py-2 rounded font-medium hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-black/20 border-t-black mr-2"></div>
              Creating...
            </span>
          ) : (
            'Create Collection'
          )}
        </button>
      </div>
    </div>
  );
};
CreateCollectionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};

export default CreateCollectionModal;
