import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Custom hook for collections
const useCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load collections on mount
  useEffect(() => {
    loadCollections();
  }, []);

  const loadCollections = async () => {
    try {
      setIsLoading(true);
      const saved = localStorage.getItem('collections');
      if (saved) {
        setCollections(JSON.parse(saved));
      }
    } catch (error) {
      toast.error(`Failed to load collections: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const saveCollections = async (newCollections) => {
    try {
      localStorage.setItem('collections', JSON.stringify(newCollections));
      setCollections(newCollections);
      return true;
    } catch (error) {
      toast.error(`Failed to save collections: ${error}`);
      return false;
    }
  };

  return { collections, isLoading, saveCollections };
};

export default useCollections; 