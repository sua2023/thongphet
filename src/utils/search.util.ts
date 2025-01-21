import { useRef } from "react";

// This function will return a debounced search handler
export const handleDebounceSearch = (callback: (value: string) => void) => {
  const timeoutRef = useRef<number | null>(null); // Use number to match the browser's setTimeout return type

  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value; // Get the input value

    // Clear the previous timeout if it exists
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = window.setTimeout(() => {
      callback(value); // Call the provided callback after the delay
    }, 500); // 500ms debounce delay
  };
};
