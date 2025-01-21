"use client";

import { IDoctorTypes, ISpecialistType } from "@/interfaces";

interface IDoctorProps {
  data: IDoctorTypes;
  doctorSpecialist: ISpecialistType[];
}
export default function DoctorExpertise({
  data,
  doctorSpecialist,
}: IDoctorProps) {
  


  return (
    <>
      <div className="w-full">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray300 border-0" />
          <h6 className="text-lg text-bold absolute px-3 text-gray700 -translate-x-1/2 bg-white left-1/2">
            Specialists
          </h6>
        </div>
        <div className="mt-2">
          <div className="mt-5">
            <ul className="space-y-4 text-gray700 list-disc list-inside">
              <li>
                <span className="font-bold">Specialist</span>
                <ol className="ps-5 mt-2 space-y-1 list-decimal list-inside">
                  {doctorSpecialist?.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ol>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
