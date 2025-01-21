import { IDoctorTypes } from "./type";

export interface IScheduleCustomTypes {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource: any;
  user?: string;
}

export interface IScheduleTypes {
  resource: any;
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  available: boolean;
  date: string;
  startTime: string;
  endTime: string;
  doctor?: IDoctorTypes;
}
