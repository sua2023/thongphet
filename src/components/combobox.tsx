import React, { useCallback, useEffect, useState } from "react";
import { CloseIcon, PreviousIcon } from "./icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addCombobox,
  isOpenConfirm,
  removeCombobox,
} from "@/redux/features/combobox";

interface ComboBoxProps {
  options: any[];
  onSubmit: (selectedOptions: any) => void;
  onDelete?: (selectedOptions: any) => void;
  isConfirm?: boolean;
}

const ComboBox = ({
  options,
  onSubmit,
  onDelete,
  isConfirm,
}: ComboBoxProps) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<any[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const {
    comboboxValue,
    isConfirm: isOpen,
    isComeplete,
  } = useSelector((state: RootState) => state.combobox);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
      setShowOptions(false);
    } else {
      const filtered = options?.filter(
        (option) =>
          option.name.toLowerCase().includes(value.toLowerCase()) &&
          !comboboxValue.some((selected: any) => selected?.name === option?.name)
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    }
  };

  const handleOptionClick = (option: any) => {
    dispatch(addCombobox(option));
    setInputValue("");
    setFilteredOptions([]);
    setShowOptions(false);
  };

  const handleRemoveSelectedOption = (option: any) => {
    dispatch(isOpenConfirm());
    if (isConfirm) {
      onDelete?.(option);
      if (isComeplete) {
        dispatch(removeCombobox(option));
      }
    } else {
      dispatch(removeCombobox(option));
    }
  };
  useEffect(() => {
    if (comboboxValue.length > 0) {
      onSubmit(comboboxValue);
    }
  }, [dispatch, onSubmit, options]);

  return (
    <div className="w-full">
      <div className="w-full">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="bg-white border border-gray300 text-gray700 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary block w-full p-2.5"
          placeholder="Search..."
        />
      </div>
      {showOptions && filteredOptions.length > 0 && (
        <ul
          className={`absolute w-auto mt-1 bg-white ${
            filteredOptions.length > 0 ? "border border-gray300" : ""
          } rounded-md shadow-lg max-h-62 overflow-y-auto z-10`}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-primary cursor-pointer hover:text-white"
              onClick={() => handleOptionClick(option)}
            >
              {option?.name}
            </li>
          ))}
        </ul>
      )}
      <div
        className={`${
          comboboxValue.length > 0 ? "border border-gray" : ""
        } my-2 rounded`}
      >
        {comboboxValue.map((option: any, index: number) => (
          <div
            key={option.id}
            className="flex items-center bg-gray text-base px-2 py-1 my-2"
          >
            <span>
              {index + 1}.&nbsp;{option.name}
            </span>
            &nbsp;&nbsp;&nbsp;
            <button
              type="button"
              onClick={() => handleRemoveSelectedOption(option)}
              className="ml-2 text-red"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComboBox;
