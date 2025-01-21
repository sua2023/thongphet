import { IDoctorTypes } from "@/interfaces";

interface IDoctorProps {
  data: IDoctorTypes;
}
export default function DoctorExperience({ data }: IDoctorProps) {
  return (
    <>
      <div className="w-full">
        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-px my-8 bg-gray300 border-0" />
          <h6 className="text-lg text-bold absolute px-3 text-gray700 -translate-x-1/2 bg-white left-1/2">
            Experience
          </h6>
        </div>

        <div className="mt-5">
          <ul className="space-y-4 text-gray700 list-disc list-inside">
            <ol className="ps-5 indent-8 leading-7 mt-2 text-inde space-y-1 list-decimal list-inside">
              <span>{data?.experience}</span>
            </ol>
          </ul>
        </div>
      </div>
    </>
  );
}
