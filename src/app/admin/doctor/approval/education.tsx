"use client";

import { FileIcon } from "@/components/icons/icons";
import ToolTip from "@/components/tooltip";
import { IDoctorTypes, IEducationTypes } from "@/interfaces";

interface IDoctorProps {
  data: IDoctorTypes;
}
export default function DoctorEducation({ data }: IDoctorProps) {
  const handlePreviewCertificate = (certificate: any) => {
    if (typeof certificate === "string" && certificate.trim() !== "") {
      window.open(certificate, "_blank");
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray300 border-0" />
          <h6 className="text-lg text-bold absolute px-3 text-gray700 -translate-x-1/2 bg-white left-1/2">
            Education
          </h6>
        </div>
        <div className="mt-2">
          <div className="mt-2">
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
                        <div key={index} className="flex gap-5 items-center">
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
        </div>
      </div>
    </>
  );
}
