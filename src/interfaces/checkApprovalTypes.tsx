import { ApprovalDoctorEnum } from "@/enum/doctor.enum";

export interface ICheckApprovalDoctorType {
  id: string;
  status: ApprovalDoctorEnum;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  stages: string;
  description: string;
  doctorId: string;
}
