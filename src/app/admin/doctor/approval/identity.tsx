"use client";
import Loader from "@/components/loader";
import { DateFormat } from "@/helps/dateFormat";
import { IDoctorTypes } from "@/interfaces";
import Image from "next/image";
import React from "react";

interface IDoctorProps {
  data: IDoctorTypes;
}
export default function Identity({ data }: IDoctorProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFrontLoading, setiSFrontLoading] = React.useState(true);

  React.useEffect(() => {
    if (data) {
      setTimeout(() => {
        setIsLoading(false);
        setiSFrontLoading(false);
      }, 6000);
    }
  }, [data]);

  return (
    <div className="w-full">
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-64 h-px my-8 bg-gray300 border-0" />
        <h6 className="text-lg text-bold absolute px-3 text-gray700 -translate-x-1/2 bg-white left-1/2">
          Identity
        </h6>
      </div>

      <div className="w-full max-w-96 p-4  bg-white border border-gray300 rounded-lg shadow sm:p-8">
        <div className="flow-root">
          <p className="font-bold">Card information:</p>
          <ul role="list" className="divide-y divide-gray300">
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                <p className="text-sm mb-2 font-medium text-gray700 truncate">
                    Card type:
                  </p>
                  <p className="text-sm mb-2 font-medium text-gray700 truncate">
                    Card Number:
                  </p>
                  <p className="text-sm mb-2 text-gray700 truncate">Created:</p>
                  <p className="text-sm mb-2 text-gray700 truncate">Expired:</p>
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm mb-2 font-medium text-gray700 truncate">
                    {data.documentType}
                  </p>
                  <p className="text-sm mb-2 font-medium text-gray700 truncate">
                    {data.cardNumber}
                  </p>
                  <p className="text-sm mb-2 text-gray700 truncate">
                    {data?.issueDate ? DateFormat(data.issueDate) : ""}
                  </p>
                  <p className="text-sm mb-2 text-gray700 truncate">
                    {data?.expiryDate ? DateFormat(data.expiryDate) : ""}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full mt-5 max-w-96 p-2  bg-white border border-gray300 rounded-lg shadow sm:p-8">
        <div className="flow-root">
          <p className="font-bold">Card Front:</p>
          <div className="flex items-center justify-center h-full">
            {isFrontLoading ? (
              <div className="flex items-center justify-center size-56">
                <Loader />
              </div>
            ) : (
              <a
                href={data?.cardFront ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={data?.cardFront ?? ""}
                  width={100}
                  height={100}
                  alt={data?.firstName ?? ""}
                  className="object-contain p-2 lg:size-62 size-40 rounded-md transition-all duration-300"
                  onLoadingComplete={() => {
                    setIsLoading(false);
                  }}
                />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-5 max-w-96 p-2  bg-white border border-gray300 rounded-lg shadow sm:p-8">
        <div className="flow-root">
          <p className="font-bold">Card Back:</p>
          <div className="flex items-center justify-center h-full">
            {isLoading ? (
              <div className="flex items-center justify-center size-56">
                <Loader />
              </div>
            ) : (
              <a
                href={data?.cardBack ?? ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={data?.cardBack ?? ""}
                  alt={data?.firstName}
                  width={100}
                  height={100}
                  className="size-56 object-contain transition-all duration-300"
                  onLoadingComplete={() => {
                    setIsLoading(false);
                  }}
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
