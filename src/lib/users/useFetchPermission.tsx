import { FilterState, IRoleDataType, IRoleHasPermissionType } from "@/interfaces";
import React from "react";
import useApi from "../useApi";

const useFetchPermissions = () => {
  const api = useApi();
  const [data, setData] = React.useState<IRoleDataType[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchPermission = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: "getPemissions",
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
    fetchPermission();
  };
  React.useEffect(() => {
    fetchPermission();
  }, []);
  return { refresh, data, total, loading, error };
};

const useFetchPermission = (id: string) => {
  const api = useApi();
  const [data, setData] = React.useState<IRoleHasPermissionType[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchPermission = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `getRolePemission/${id}`,
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
    fetchPermission();
  };
  React.useEffect(() => {
    fetchPermission();
  }, []);
  return { refresh, data, total, loading, error };
};
export { useFetchPermissions, useFetchPermission };
