import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NotificationIcon } from "../icons/icons";

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

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
        href="#"
        className="relative flex size-8 items-center justify-center rounded-full border-[0.5px]  border-gray bg-gray hover:text-primary"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 size-2 rounded-full bg-gray ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex size-full animate-ping rounded-full bg-red opacity-75"></span>
        </span>

        <NotificationIcon size={22} />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-12 mt-3 md:mt-4 flex h-96 w-48 sm:w-80 flex-col rounded-sm border border-gray bg-white shadow-default sm:-right-10  ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <div className="px-4 py-3">
          <h5 className="text-sm font-medium text-gray700">Notification</h5>
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          <li>
            <Link
              className="flex flex-col gap-2.5 border-t border-gray px-4 py-3 hover:bg-gray/30"
              href="#"
            >
              <p className="text-sm">
                <span className="text-black dark:text-white">
                  Edit your information in a swipe
                </span>
                Sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim.
              </p>

              <p className="text-xs">12 May, 2025</p>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
