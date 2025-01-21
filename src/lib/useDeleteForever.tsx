import useApi from "./useApi";

export const useDeleteForever = () => {
  const api = useApi();

  const deletedForever = async (url: string) => {
    try {
      const deleted = await api({ url, params: {}, method: "DELETE" });
      const { status } = deleted;
      if (status == 200) {
        return { message: "success", status: status };
      } else if (status == 400) {
        return { message: "failed", status };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: 500 };
      }
      return { message: "Unknown error", status: 500 };
    }
  };

  return {
    deletedForever,
  };
};

export const useDeleteBodyForever = () => {
  const api = useApi();

  const deletedForever = async (url: string, params: any) => {
    try {
      const deleted = await api({ url, params, method: "DELETE" });
      const { status, data } = deleted;
      if (status == 200) {
        return { data, message: "success", status: status };
      } else if (status == 400) {
        return { message: "failed", status };
      } else {
        return { message: "failed", status };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: 500 };
      }
      return { message: "Unknown error", status: 500 };
    }
  };

  return {
    deletedForever,
  };
};
