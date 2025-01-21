import useApi from "./useApi";

export const useCreate = () => {
  const api = useApi();

  const createForever = async (url: string, params: any) => {
    try {
      const created = await api({ url, params, method: "POST" });
      const { status, data } = created;
      if (status == 201) {
        return { data, message: "success", status: status };
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
    createForever,
  };
};

export const useEdit = () => {
  const api = useApi();

  const editForever = async (url: string, params: any) => {
    try {
      const updated = await api({ url, params, method: "PUT" });
      const { status, data } = updated;
      if (status == 200) {
        return { data, message: "success", status: status };
      } else if (status == 400) {
        return { message: "Field incorrect", status };
      } else {
        return { message: "Something wrong", status };
      }
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, status: 500 };
      }
      return { message: "Unknown error", status: 500 };
    }
  };

  return {
    editForever,
  };
};
