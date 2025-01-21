import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageIcon } from "../icons/icons";

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        className="relative flex size-4 items-center justify-center rounded-full border-[0.5px] border-gray bg-gray hover:text-primary"
        href="#"
      >
        <span
          className={`absolute -right-0.5 -top-0.5 size-2 rounded-full bg-gray ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex size-full animate-ping rounded-full bg-red opacity-75"></span>
        </span>

        <MessageIcon size={18} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-10 mt-3 md:mt-4 flex h-96 w-48 sm:w-80 flex-col rounded-sm border border-gray bg-white shadow-default sm:-right-8 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium">Messages</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex gap-4 border-t border-gray px-4 py-3 hover:bg-gray/30"
              href="/messages"
            >
              <div className="size-8 rounded-full">
                <Image
                  width={112}
                  height={112}
                  src={"/images/user/user-01.png"}
                  alt="User"
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>

              <div>
                <h6 className="text-sm font-medium text-black dark:text-white">
                  Robert Jhon
                </h6>
                <p className="text-sm">Can you share your offer?</p>
                <p className="text-xs">10min ago</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
};

export default DropdownMessage;
