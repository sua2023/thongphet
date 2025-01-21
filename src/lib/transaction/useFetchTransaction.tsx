import React from "react";
import useApi from "../useApi";
import { ITransactionTypes } from "@/interfaces";

const useFetchTransaction = (id?: string) => {
  const api = useApi();
  const [data, setData] = React.useState<ITransactionTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchTransaction = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `transactions?${id}`,
        params: {},
        method: "GET",
      });
      if (result.status == 200) {
        setData(result.data);
        setTotal(result.total);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchTransaction();
  };
  React.useEffect(() => {
    fetchTransaction();
  }, []);
  return { refresh, data, total, loading, error };
};

export { useFetchTransaction };
