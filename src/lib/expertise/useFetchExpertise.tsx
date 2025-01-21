import { IDoctorTypes } from "@/interfaces";
import { FilterState } from "@/interfaces/filter";
import React from "react";
import useApi from "../useApi";
import { IExpertiseTypes, ISpecialistType } from "@/interfaces/expertiseType";

const useFetchExpertise = (filter?: FilterState) => {
  const api = useApi();
  const [data, setData] = React.useState<IExpertiseTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchExpertise = async () => {
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
        url: `specialists?${queryParams}`,
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
    fetchExpertise();
  };
  React.useEffect(() => {
    fetchExpertise();
  }, [filter]);
  return { refresh, data, total, loading, error };
};

const useFetchSpecialist = () => {
  const api = useApi();
  const [data, setData] = React.useState<IExpertiseTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSpecialist = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `specialists`,
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
    fetchSpecialist();
  };
  React.useEffect(() => {
    fetchSpecialist();
  }, []);
  return { refresh, data, total, loading, error };
};
const useFetchSpecialistByDoctorId = (id:string) => {
  const api = useApi();
  const [data, setData] = React.useState<ISpecialistType[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSpecialist = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `doc-specialists/${id}/users`,
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
    fetchSpecialist();
  };
  React.useEffect(() => {
    fetchSpecialist();
  }, []);
  return { refresh, data, total, loading, error };
};
export { useFetchExpertise, useFetchSpecialist, useFetchSpecialistByDoctorId };
