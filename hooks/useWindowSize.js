import { useState, useEffect, useRef } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  // Store the debounce timeout in a ref so that it doesn't trigger re-renders
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      // Clear the previous timeout if it's still active
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Set a new timeout to update state after the debounce delay
      resizeTimeoutRef.current = setTimeout(() => {
        setWindowDimensions(getWindowDimensions());
      }, 200); // Debounce delay of 200ms (adjust as necessary)
    }

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return windowDimensions;
}
