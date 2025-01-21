import { ExpertiseStatusEnum } from "@/enum/expertise.enum";

export interface IExpertiseTypes {
  id: string;
  status: ExpertiseStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  name: string;
}

export interface IExpertiseCreateTypes {
  id?: string;
  name: string;
}

export interface IDoctorSpecialists {
  id: string;
  name: string;
}

export interface ISpecialistType {
  id: string;
  name: string;
}
