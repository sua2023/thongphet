import { IDoctorCeritificate } from "./type";

export interface IEducationTypes {
  id?: string;
  degree: string;
  university: string;
  from?: string | undefined | null;
  to?: string | undefined | null;
  certificates?: IDoctorCeritificate[] | null;
}
