"use client";
import React from "react";
import ContainerContent from "./containerContent";

const Navbar = React.lazy(() => import("./navbar/navbar"));
const Sidebar = React.lazy(() => import("./sidebar"));

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-body">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="bg-body relative">
            <div className="mx-auto max-w-screen-2xl lg:p-6 lg:mx-1 lg:my-1 2xl:p-2">
              {children}
              {/* <ContainerContent>{children}</ContainerContent> */}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
