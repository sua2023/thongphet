import { FilterState, IRoleObjType } from "@/interfaces";
import React from "react";
import useApi from "../useApi";

const useFetchRoles = (filter: FilterState) => {
  const api = useApi();
  const [data, setData] = React.useState<IRoleObjType[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          page: filter.page.toString(),
          offset: filter.offset.toString(),
          sort_by: filter.sort_by,
          order_by: filter.order_by,
          start_date: filter.start_date,
          end_date: filter.end_date,
        });

        if (filter.filter) {
          const filterParts = Object.keys(filter.filter).reduce(
            (acc: string[], key) => {
              const value = filter.filter[key];
              if (value !== undefined && value !== null && value !== "") {
                acc.push(`${key}:${value}`);
              }
              return acc;
            },
            []
          );

          if (filterParts.length > 0) {
            params.append("filter", filterParts.join(","));
          }
        }

        return params.toString();
      };

      const queryParams = buildQueryFilter(filter);
      const result = await api({
        url: `roles?${queryParams.toString()}`,
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
    fetchRoles();
  };
  React.useEffect(() => {
    fetchRoles();
  }, [filter]);
  return { refresh, data, total, loading, error };
};

const useFetchRole = (id: string) => {
  const api = useApi();
  const [data, setData] = React.useState<IRoleObjType | null>(null);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRole = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `roles/${id}`,
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
    fetchRole();
  };
  React.useEffect(() => {
    fetchRole();
  }, []);
  return { refresh, data, total, loading, error };
};

const useFetchAllRoles = () => {
  const api = useApi();
  const [data, setData] = React.useState<IRoleObjType[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchRole = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `roles`,
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
    fetchRole();
  };
  React.useEffect(() => {
    fetchRole();
  }, []);
  return { refresh, data, total, loading, error };
};

export { useFetchRole, useFetchRoles, useFetchAllRoles };
