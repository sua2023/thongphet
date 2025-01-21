
import { IDoctorCreateTypes } from "@/interfaces";
import useApi from "../useApi";

export const useCreateDoctor = () => {
  const api = useApi();
  const createDoctor = async (url: string, params: IDoctorCreateTypes) => {
    try {
      const response = await api({
        url: url,
        params: params,
        method: "POST",
      });
      return response;
    } catch (err: any) {
      return err;
    }
  };

  return { createDoctor };
};
