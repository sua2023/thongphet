import { urgencyLevelEnum } from "@/enum/appointment.enum";

export default function UrgencyStatus(status: string) {
  let color;
  let bgColor;
  switch (status) {
    case urgencyLevelEnum.LOW:
      color = "text-gray700";
      bgColor = "bg-gray100";
      break;
      case urgencyLevelEnum.MEDIUM:
      color = "text-yellow500";
      bgColor = "bg-gray100";
      break;
      case urgencyLevelEnum.HIGH:
      color = "text-red";
      bgColor = "bg-gray100";
      break;
    default:
      return status;
  }
  return (
    <div>
      <div className={`${bgColor} capitalize ${color} flex items-center justify-center rounded-full p-1 w-16`}>
        {status}
      </div>
    </div>
  );
}
