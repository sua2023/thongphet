import { MenuIcon, PreviousLinkIcon } from "../icons/icons";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";

const Navbar = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow">
      <div className="flex grow items-center justify-between px-1 py-2 md:px-3 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-96 block rounded-sm p-1.5 lg:hidden hover:border-1"
          >
            {props.sidebarOpen ? (
              <PreviousLinkIcon size={26} color="#059669" />
            ) : (
              <MenuIcon size={22} color="#059669" />
            )}
          </button>
        </div>

        <div className="hidden sm:block">
          <form method="POST">
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search..."
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
