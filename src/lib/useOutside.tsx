
import React, { useState, useRef } from "react";

interface UseOutsideProps {
  ref: React.RefObject<HTMLInputElement>;
  setIsFocused: React.Dispatch<boolean>;
}

const useOutside = ({ ref, setIsFocused }: UseOutsideProps) => {
 
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, setIsFocused]);
};
export default useOutside;
