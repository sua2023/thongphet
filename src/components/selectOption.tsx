import useOutside from "@/lib/useOutside";
import React, { useRef, useState } from "react";

interface CustomSelectProps {
  options?: { id: string; name: string }[];
  onChange?: (id: string, name: string) => void;
  value?: string;
  placeholder?: string;
}
interface Option {
  id: string;
  name: string;
}

const SelectOptions = ({
  options = [],
  onChange,
  value,
  placeholder,
}: CustomSelectProps) => {
  const selectRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  useOutside({ ref: selectRef, setIsFocused: setIsOpen });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && selectRef.current) {
      selectRef.current.focus();
    }
  };
  const handleSelect = (optionValue: Option) => {
    if (onChange) {
      onChange(optionValue.id, optionValue.name);
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300;

      if (spaceBelow < dropdownHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [isOpen]);

  return (
    <div className="relative text-left" ref={selectRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="bg-white border border-gray300 text-gray700 rounded-lg p-2 w-full flex justify-between items-center"
      >
        {options.find((option) => option.name === value)?.name ||
          placeholder ||
          "Choose..."}
        <svg
          className="size-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full overflow-auto bg-white border border-gray300 rounded-lg shadow-lg"
          style={{
            maxHeight: "300px",
            top: dropUp ? "auto" : "2.75rem",
            bottom: dropUp ? "2.75rem" : "auto",
          }}
        >
          <ul className="py-0">
            {options.map((option, index) => (
              <li
                key={option.name}
                onClick={() => handleSelect(option)}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-white ${
                  option.name === value
                    ? "bg-primary font-medium text-white"
                    : ""
                }  ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === options.length - 1 ? "rounded-b-lg" : ""
                } `}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectOptions;
