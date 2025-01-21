import { PatientStatusEnum } from "@/enum/patient.enum";

interface ColumnStatusProps {
  status?: string;
}

export default function ColumnStatus({ status }: ColumnStatusProps) {
  
  switch (status) {
    case PatientStatusEnum.ACTIVE:
      return (
        <>
          <div className="flex items-center">
          <p className="size-2 me-1 bg-primary rounded-full"></p>
          </div>
        </>
      );

    case PatientStatusEnum.INACTIVE:
      return (
        <>
          <p className="size-2 me-1 bg-gray700 rounded-full"></p>
        </>
      );

    case PatientStatusEnum.DELETED:
      return (
        <>
          <p className="size-2 me-1 bg-red rounded-full"></p>
        </>
      );

    case PatientStatusEnum.LOCKED:
      return (
        <>
          <p className="size-2 me-1 bg-blur800 rounded-full"></p>
        </>
      );
    case PatientStatusEnum.BLOCKED:
      return (
        <>
          <p className="size-2 me-1 bg-pink800 rounded-full"></p>
        </>
      );
    case "pending":
      return (
        <>
          <div className="bg-red950/20 capitalize text-red950 flex items-center justify-center rounded-full w-20">
            <span className="size-2 me-1  bg-red950 rounded-full"></span>
            {status}
          </div>
        </>
      );
    case "approved":
      return (
        <>
          <div className="bg-primary/20 capitalize text-primary flex items-center justify-center rounded-full py-1">
            {status}
          </div>
        </>
      );
    default:
      return status;
  }
}
