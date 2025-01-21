import { IUsersTypes } from "@/interfaces";
import React from "react";
import useApi from "../useApi";
import { FilterState } from "@/interfaces/filter";

type NewIUsersTypes = IUsersTypes[];

const useFetchUsers = (filter: FilterState) => {
  const fetchAPI = useApi();
  const [data, setData] = React.useState<NewIUsersTypes>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
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

      const response = await fetchAPI({
        url: `users?${queryParams.toString()}`,
        params: "",
        method: "GET",
      });
      if (response.status === 200) {
        const data = await response.data;
        setData(data);
        setTotal(response.total);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    fetchUsers();
  };
  React.useEffect(() => {
    fetchUsers();
  }, [filter]);

  return { data, total, loading, error, refresh };
};

const useFetchMe = () => {
  const fetchAPI = useApi();
  const [data, setData] = React.useState<IUsersTypes | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const customUseGetMe = async () => {
    setLoading(true);
    try {
      const response = await fetchAPI({
        url: `users/me`,
        params: {},
        method: "GET",
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const refresh = () => {
    customUseGetMe();
  };
  React.useEffect(() => {
    customUseGetMe();
  },[]);

  return { data, loading, error, refresh };
};

const useFetchUser = (id: string) => {
  const fetchAPI = useApi();
  const [data, setData] = React.useState<IUsersTypes | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUserById = async () => {
    setLoading(true);
    try {
      const response = await fetchAPI({
        url: `users/${id}`,
        params: {},
        method: "GET",
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const refresh = () => {
    fetchUserById();
  };
  React.useEffect(() => {
    fetchUserById();
  },[id]);

  return { data, loading, error, refresh };
};
export { useFetchUsers, useFetchMe, useFetchUser };
