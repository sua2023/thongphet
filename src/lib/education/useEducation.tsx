import { IEducationTypes } from "@/interfaces";
import useApi from "../useApi";

export const useCreateEducation = () => {
  const api = useApi();
  const createEducation = async (url: string, params: IEducationTypes) => {
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

  return { createEducation };
};
