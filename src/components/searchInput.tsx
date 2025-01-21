import React, { useRef } from "react";
import { SearchIcon } from "./icons/icons";
interface TypeProps {
  onChange: (value: string) => void;
}
export default function SearchInput({ onChange }: TypeProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (newValue) {
        onChange(newValue);
      } else {
        onChange(newValue);
      }
    }, 500);
  };
  return (
    <>
      <div>
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchIcon size={18} />
          </div>
          <input
            type="text"
            id="simple-search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-white rounded-lg border-[1.5px] border-gray300 bg-transparent ps-10 p-1.5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            // className="bg-white border border-gray300 text-gray700 text-sm rounded-lg block w-full ps-10 p-2 focus:outline-none focus:ring-1 focus:ring-gray300"
            placeholder="Search.."
            required
          />
        </div>
      </div>
    </>
  );
}
