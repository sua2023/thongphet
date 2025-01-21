import useApi from "../useApi";

const useDeleteUser = () => {
  const api = useApi();

  const handleDelete = async (url: string) => {
    try {
      const result = await api({ url, params: {}, method: "DELETE" });
      return result;
    } catch (error) {
      return error;
    }
  };

  return { handleDelete };
};

export default useDeleteUser;
