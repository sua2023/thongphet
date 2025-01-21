import React from "react";

export default function ContainerContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative max-h-full rounded lg:p-4 2xl:p-3 p-1 lg:m-0 m-1 bg-white shadow-md">
      {children}
    </div>
  );
}
