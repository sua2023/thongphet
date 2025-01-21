import { ICategoriesTypes } from "@/interfaces";
import { FilterState } from "@/interfaces/filter";
import React from "react";
import useApi from "../useApi";

const useFetchCategory = (filter?: FilterState) => {
  const api = useApi();
  const [data, setData] = React.useState<ICategoriesTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          page: filter.page.toString(),
          offset: filter.offset.toString(),
          sort_by: filter.sort_by,
          order_by: filter.order_by,
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
        url: `categories?${queryParams}`,
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
    fetchCategory();
  };
  React.useEffect(() => {
    fetchCategory();
  }, [filter]);
  return { refresh, data, total, loading, error };
};

const useFetchAllCategory = () => {
  const api = useApi();
  const [data, setData] = React.useState<ICategoriesTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchAllCategory = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `categories`,
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
    fetchAllCategory();
  };
  React.useEffect(() => {
    fetchAllCategory();
  }, []);
  return { refresh, data, total, loading, error };
};

export { useFetchAllCategory, useFetchCategory };

