// useUniqueId.js
import { useRef } from 'react';

// A counter outside the hook to ensure it's truly unique across all instances
let nextId = 0;

const useUniqueId = () => {
  // Use useRef to store a value that persists across re-renders
  const idRef = useRef(null);

  // Check if the ref has a value; if not, set a new ID and increment the counter
  if (idRef.current === null) {
    idRef.current = nextId++;
  }

  // Return the stored ID
  return idRef.current;
};

export default useUniqueId;