"use client";

import {
  CallIcon,
  FileIcon,
  MapIcon,
  StarIcon,
} from "@/components/icons/icons";
import Loader from "@/components/loader";
import ToolTip from "@/components/tooltip";
import { CalculatorAge } from "@/helps/calculatorAge";
import { DateFormat } from "@/helps/dateFormat";
import { IDoctorTypes } from "@/interfaces";
import Image from "next/image";
import React from "react";

interface IProfileProps {
  data: IDoctorTypes;
}
export default function Profile({ data }: IProfileProps) {
  const [loading, setLoading] = React.useState(true);

  const handlePreviewCertificate = (certificate: any) => {
    if (typeof certificate === "string" && certificate.trim() !== "") {
      window.open(certificate, "_blank");
    }
  };
  return (
    <>
      <div className="m-2">
        <div className="p-5 rounded-md">
          <div className="lg:flex gap-5">
            <div className="border border-gray m-1 size-56 rounded-lg overflow-hidden flex items-center justify-center">
              {loading ? (
                <Loader />
              ) : (
                <Image
                  src={data?.profile || "/images/user/null_profile.png"}
                  width={100}
                  height={100}
                  alt={data?.firstName ?? ""}
                  className="object-contain p-2 m-2 rounded-lg lg:size-56 size-44 transition-all duration-300"
                  onLoadingComplete={(e) => {
                    if (e) {
                      setLoading(true);
                    } else {
                      setLoading(false);
                    }
                  }}
                />
              )}
            </div>
            <div>
              <p className="text-lg text-bold mt-2">{data?.firstName}</p>
              <p className="text-sm">{data.lastName}</p>
              <p className="flex mt-1 items-center">
                <StarIcon color="#f5844c" /> <StarIcon color="#f5844c" />
                <StarIcon color="#f5844c" /> <StarIcon color="#f5844c" />
                <span className="ml-1">(3)</span>
              </p>
              <div className="mt-3">
                <p className="mt-2 text-sm">{data.email}</p>
                <div className="mt-3">
                  <p className="flex gap-5">
                    <MapIcon size={18} color="#059669" />
                    {data?.address1}
                  </p>
                  <p className="flex gap-5 mt-2">
                    <CallIcon size={18} color="#059669" />
                    {data.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 border-t-2 border-t-gray">
            <p className="text-lg mt-4 mb-2">Personal Information:</p>
            <div className="flex gap-5">
              <div>
                <p className="mt-2  text-sm">Firstname:</p>
                <p className="mt-2  text-sm">Lastname:</p>
                <p className="mt-2  text-sm">Email:</p>
                <p className="mt-2  text-sm">Gender:</p>
                <p className="mt-2  text-sm">Birthday:</p>
                <p className="mt-2  text-sm">Age:</p>
                <p className="mt-2  text-sm">Address:</p>
                <p className="mt-2  text-sm">Register date:</p>
                <p className="mt-2  text-sm">Created by:</p>
              </div>
              <div>
                <p className="mt-2  text-sm">
                  <strong>{data?.firstName}</strong>
                </p>
                <p className="mt-2  text-sm">
                  <strong>{data?.lastName}</strong>
                </p>
                <p className="mt-2  text-sm">
                  <strong>{data?.email}</strong>
                </p>
                <p className="mt-2  text-sm">
                  <strong>{data?.gender}</strong>
                </p>
                <p className="mt-2  text-sm">
                  <strong>{DateFormat(data?.dob)}</strong>
                </p>
                <p className="mt-2  text-sm">
                  <strong>{CalculatorAge(data?.dob)} year old</strong>
                </p>

                <p className="mt-2  text-sm">
                  <strong>{data?.address1}</strong>
                </p>
                <p className="mt-2 text-sm">
                  <strong>{DateFormat(data?.createdAt)}</strong>
                </p>
                <p className="mt-2 text-sm">
                  <strong>{data?.createdBy ?? "Signup"}</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 border-t-2 border-t-gray">
            <p className="text-lg mt-4 mb-2">About:</p>
            <p className="text-sm">{data.bio}</p>
          </div>
          <div className="mt-5 border-t-2 border-t-gray">
            <p className="text-lg mt-4 mb-2">Education:</p>

            {Array.isArray(data?.educations) &&
              data?.educations?.map((edu, index: number) => (
                <ol
                  key={index}
                  className="space-y-4 text-gray-500 list-decimal list-inside"
                >
                  <li>
                    Graduate {`(${edu.from}-${edu.to})`}
                    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                      <li> University: {edu.university}</li>
                      <li>Degree: {edu.degree}</li>
                      {edu?.certificates?.map((cer, index) => (
                        <div
                          key={index}
                          className="flex gap-5 items-center mb-3"
                        >
                          <li>Document: {cer.name}</li>
                          <span
                            className="cursor-pointer relative group"
                            onClick={() => handlePreviewCertificate(cer.photo)}
                          >
                            <FileIcon color="red" />
                            <ToolTip title="view" />
                          </span>
                        </div>
                      ))}
                    </ul>
                  </li>
                </ol>
              ))}
          </div>
          <div className="mt-5 border-t-2 border-t-gray">
            <p className="text-lg mt-4 mb-2">Spacialits:</p>
            <ul className="max-w-md space-y-1 text-gray700 list-disc list-inside">
              {data?.doctorSpecialists &&
                data?.doctorSpecialists?.map((specialis, index) => (
                  <li key={index}>{specialis.name}</li>
                ))}
            </ul>
          </div>
          <div className="mt-5 border-t-2 border-t-gray">
            <p className="text-lg mt-4 mb-2">Experience:</p>
            <p className="text-sm">{data.experience}</p>
          </div>
        </div>
      </div>
    </>
  );
}
