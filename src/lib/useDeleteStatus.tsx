import useApi from "./useApi";

export const useDeleteStatus = () => {
  const api = useApi();

  const deletedStatus = async (url: string, status: string) => {
    try {
      const deleted = await api({
        url,
        params: status,
        method: "PUT",
      });

      if (deleted.status == 200) {
        return { message: "success", status: status };
      } else if (deleted?.status == 400) {
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
    deletedStatus,
  };
};
