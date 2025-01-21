import React from "react";

interface ICheckBoxProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  title?: string;
}
export default function Checkbox({
  isChecked,
  setIsChecked,
  title,
}: ICheckBoxProps) {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="flex items-center">
        <input
          id="custom-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="hidden"
        />
        <div
          onClick={handleCheckboxChange}
          className={`w-4 h-4 flex items-center justify-center border-2 rounded cursor-pointer ${
            isChecked ? "bg-primary border-primary" : "bg-white border-gray400"
          }`}
        >
          {isChecked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        {title && (
          <label
            htmlFor="custom-checkbox"
            className="ms-2 text-sm font-medium text-gray700"
          >
            {title ? title : "Check box"}
          </label>
        )}
      </div>
    </>
  );
}
