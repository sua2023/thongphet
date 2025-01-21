"use client";

import {
  CircleFullIcon,
  CircleIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  PreviousLinkIcon,
} from "@/components/icons/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import SidebarLinkGroup from "./SidebarLinkGroup";
import { menuItems } from "./SidebarListItem";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = React.useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div
      ref={sidebar}
      className={`absolute ${
        sidebarOpen ? "shadow-2xl" : "shadow-none"
      } lg:shadow-md left-0 top-0 z-40 flex h-screen w-52 flex-col overflow-y-hidden bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-4 lg:py-6">
        <div></div>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <PreviousLinkIcon size={22} color="#059669" />
        </button>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 p-1 lg:mt-10 lg:px-4">
          <div>
            <ul className="mb-1 flex flex-col gap-1.5">
              {menuItems.map((menu, index) => {
                if (menu.isLinkChild) {
                  return (
                    <SidebarLinkGroup
                      key={index}
                      activeCondition={
                        pathname === `${menu.path}` ||
                        pathname.includes(`${menu.path}`)
                      }
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2 rounded p-2 text-sm text-black duration-300 ease-in-out hover:border-l-4 hover:border-primary hover:text-primary ${
                                (pathname === `${menu.path}` ||
                                  pathname.includes(`${menu.path}`)) &&
                                "hover:border-l-4 hover:border-primary text-primary"
                              }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              {menu.icon}
                              {menu.title}
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 fill-current">
                                {open ? (
                                  <ExpandLessIcon size={18} />
                                ) : (
                                  <ExpandMoreIcon size={18} />
                                )}
                              </span>
                            </Link>

                            <div
                              className={`overflow-hidden ${
                                !open && "hidden"
                              }`}
                            >
                              <ul className="mt-1.5 flex flex-col gap-2">
                                {menu?.children &&
                                  menu?.children?.map((children, index) => {
                                    return (
                                      <li key={index}>
                                        <Link
                                          href={`${children.href}`}
                                          className={`group relative flex items-center gap-2 rounded p-2 text-sm text-black duration-300 ease-in-out hover:border-l-4 hover:border-primary hover:text-primary ${
                                            pathname.startsWith(
                                              children.href
                                            ) &&
                                            "border-l-4 border-primary text-primary"
                                          }`}
                                        >
                                          <div className="ml-6 flex items-center">
                                            {pathname.startsWith(
                                              children.href
                                            ) ? (
                                              <CircleIcon size={8} />
                                            ) : (
                                              <CircleFullIcon size={8} />
                                            )}
                                            <span className="ml-2">
                                              {children.title}
                                            </span>
                                          </div>
                                        </Link>
                                      </li>
                                    );
                                  })}
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>
                  );
                } else
                  return (
                    <li key={index}>
                      <Link
                        href={`${menu.href}`}
                        className={`group relative flex items-center gap-2.5 rounded p-2 text-sm text-black duration-300 ease-in-out hover:border-l-4  hover:border-primary hover:text-primary ${
                          pathname.includes(`${menu.href}`) &&
                          "border-l-4 border-primary text-primary"
                        }`}
                      >
                        {menu.icon}
                        {menu.title}
                      </Link>
                    </li>
                  );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
