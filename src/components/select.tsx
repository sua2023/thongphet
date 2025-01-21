import useOutside from "@/lib/useOutside";
import React, { useRef, useState } from "react";

interface CustomSelectProps {
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
  value?: string;
  placeholder?: string;
  icon?: any;
}

const Select = ({
  options = [],
  onChange,
  value,
  placeholder,
  icon,
}: CustomSelectProps) => {
  const selectRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [alignRight, setAlignRight] = React.useState(false);

  useOutside({ ref: selectRef, setIsFocused: setIsOpen });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && selectRef.current) {
      selectRef.current.focus();
    }
  };
  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  React.useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = 300;
      const dropdownWidth = 200;
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;
      const shouldAlignRight = spaceRight < dropdownWidth && spaceLeft >= dropdownWidth;
      setAlignRight(shouldAlignRight);
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
        className="bg-white border border-gray300 text-gray700 rounded-lg p-1.5 min-w-24 w-full flex justify-between items-center"
      >
        {options.find((option) => option.value === value)?.label ||
          placeholder ||
          "Select..."}
        <span className="ml-2">
          {icon ?? (
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
          )}
        </span>
      </button>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 w-full overflow-auto bg-white border border-gray300 rounded-lg shadow-lg"
          style={{
            maxHeight: "300px",
            top: dropUp ? "auto" : "2.75rem",
            bottom: dropUp ? "2.75rem" : "auto",
            right: alignRight ? '0' : 'auto',
            left: alignRight ? 'auto' : '0',
          }}
        >
          <ul className="py-0">
            {options.map((option, index) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-white ${
                  option.value === value
                    ? "bg-primary font-medium text-white"
                    : ""
                }  ${index === 0 ? "rounded-t-lg" : ""} ${
                  index === options.length - 1 ? "rounded-b-lg" : ""
                } `}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
