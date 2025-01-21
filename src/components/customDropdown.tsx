import { ExpandMoreIcon } from "@/components/icons/icons";
import useOutside from "@/lib/useOutside";
import { useRef, useState } from "react";

interface TypeOptions {
  options?: any[];
  onChange?: (option: any) => void;
}
const CustomSelect = ({ options, onChange }: TypeOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("10");

  const selectRef = useRef<HTMLInputElement>(null);
  useOutside({ ref: selectRef, setIsFocused: setIsOpen });
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen && selectRef.current) {
      selectRef.current.focus();
    }
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="relative" style={{ width: "4rem" }}>
      <div
        className="bg-white flex cursor-pointer items-center justify-between rounded-lg border border-gray300 p-1.5 text-sm text-black focus:outline-none  focus:border-primary active:border-primary"
        onClick={toggleDropdown}
        tabIndex={0}
        ref={selectRef}
      >
        {selectedOption} <ExpandMoreIcon size={20} />
      </div>
      {isOpen && (
        <ul className="absolute z-50 mt-0 w-full rounded-lg border border-gray300 bg-white shadow-lg">
          {options &&
            options.map((option, index) => (
              <li
                key={index}
                className={`w-full cursor-pointer py-0.5 pl-2 ${
                  index === 0 ? "rounded-t-lg" : ""
                } ${
                  index === options.length - 1 ? "rounded-b-lg" : ""
                } hover:bg-primary hover:text-white`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
