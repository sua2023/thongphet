import { IScheduleTypes, ScheduleFilterState } from "@/interfaces";
import React from "react";
import useApi from "../useApi";

const useFetchSchedule = (filter: ScheduleFilterState) => {
  const api = useApi();
  const [data, setData] = React.useState<IScheduleTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { start_date, end_date } = filter;

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          order_by: filter.order_by,
          ...(start_date && { start_date: String(start_date) }),
          ...(end_date && { end_date: String(end_date) }),
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
        url: `schedules?${queryParams}`,
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
    fetchSchedule();
  };
  React.useEffect(() => {
    fetchSchedule();
  }, [filter]);
  return { refresh, data, total, loading, error };
};

export { useFetchSchedule };
