import { IExpertiseCreateTypes } from "@/interfaces/expertiseType";
import useApi from "../useApi";

export const useCreateExpertise = () => {
  const api = useApi();
  const createExpertise = async (
    url?: string,
    params?: IExpertiseCreateTypes
  ) => {
    try {
      const created = await api({
        url: url || "",
        params: params,
        method: "POST",
      });
      return created;
    } catch (error) {
      return error;
    }
  };
  return { createExpertise };
};

interface CreateResult {
  message: string;
  status: number;
}
export const useEditExpertisse = () => {
  const api = useApi();

  const editExpertise = async (url: string, params: IExpertiseCreateTypes) => {
    try {
      const created = await api({ url, params, method: "PUT" });
      const { status } = created;
      if (status == 201) {
        return { message: "success", status: status };
      } else if (status == 400) {
        return { message: "exits", status };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: 500 };
      }
      return { message: "Unknown error", status: 500 };
    }
  };

  return {
    editExpertise,
  };
};
