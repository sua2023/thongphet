import { appointmentEnum, urgencyLevelEnum } from "@/enum/appointment.enum";
import { IDoctorTypes, IPatienTypes, IScheduleTypes } from "./type";

export interface IAppointmentType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: string;
  total: string;
  code: string;
  urgency: string;
  notes: string;
  isReviewed: boolean;
  status: string;
  doctor: IDoctorTypes;
  schedule: IScheduleTypes;
  patient: IPatienTypes;
  consultations: any;
}
