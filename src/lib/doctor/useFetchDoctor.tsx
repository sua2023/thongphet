import useAuth from "@/app/context/useAuth";
import { IDoctorTypes, IScheduleTypes } from "@/interfaces";
import { IAppointmentType } from "@/interfaces/appointment";
import { ICheckApprovalDoctorType } from "@/interfaces/checkApprovalTypes";
import { FilterState, ScheduleFilterState } from "@/interfaces/filter";
import React from "react";
import useApi from "../useApi";

const useFetchDoctors = (filter: FilterState) => {
  const api = useApi();
  const [data, setData] = React.useState<IDoctorTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { end_date, start_date } = filter;
  const fetchDotors = async () => {
    setLoading(true);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          page: filter.page.toString(),
          offset: filter.offset.toString(),
          sort_by: filter.sort_by,
          order_by: filter.order_by,
          ...(start_date && end_date && { start_date }),
          ...(start_date && end_date && { end_date }),
        });

        if (filter.filter) {
          const filterParts = Object.keys(filter.filter).reduce(
            (acc: string[], key) => {
              const value = filter.filter[key];

              if (
                value !== undefined &&
                value !== null &&
                value !== "" &&
                !(key === "isApproved" && value === "all")
              ) {
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
        url: `doctors?${queryParams}`,
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
    fetchDotors();
  };
  React.useEffect(() => {
    fetchDotors();
  }, [filter]);
  return { refresh, data, total, loading, error };
};

const useFetchDoctor = (id: string) => {
  const fetchAPI = useApi();
  const [data, setData] = React.useState<IDoctorTypes | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchUserById = async () => {
    setLoading(true);
    try {
      const response = await fetchAPI({
        url: `doctors/${id}`,
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
  }, [id]);

  return { data, loading, error, refresh };
};

const useFetchCheckList = (id: string) => {
  const fetchAPI = useApi();
  const [data, setData] = React.useState<ICheckApprovalDoctorType | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchCheckApproval = async () => {
    setLoading(true);
    try {
      const response = await fetchAPI({
        url: `doc-checklists/${id}/users`,
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
    fetchCheckApproval();
  };
  React.useEffect(() => {
    fetchCheckApproval();
  }, [id]);

  return { data, loading, error, refresh };
};

const useFetchByDoctorSchedule = (
  filter: ScheduleFilterState,
  userId: string
) => {
  const api = useApi();
  const newDate = new Date();

  const [data, setData] = React.useState<IScheduleTypes[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const result = await api({
        url: `schedules/doctor/${userId}`,
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

const useFetchByDoctorAppoitment = (
  filter: ScheduleFilterState,
  userId: string
) => {
  const api = useApi();
  const { logout } = useAuth();
  const newDate = new Date();

  const [data, setData] = React.useState<IAppointmentType[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchDotorsAppoitment = async () => {
    setLoading(true);
    try {
      const buildQueryFilter = (filter: any) => {
        const params = new URLSearchParams({
          order_by: filter.order_by,
          ...(filter.start_date && { start_date: filter.start_date }),
          ...(filter.end_date && { end_date: filter.end_date }),
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
        url: `appointments/${userId}/users?${queryParams}`,
        params: {},
        method: "GET",
      });

      if (result.status === 401) {
        logout();
        window.location.reload();
      } else if (result.status == 200) {
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
    fetchDotorsAppoitment();
  };
  React.useEffect(() => {
    fetchDotorsAppoitment();
  }, [filter]);
  return { refresh, data, total, loading, error };
};
export {
  useFetchByDoctorAppoitment, useFetchByDoctorSchedule,
  useFetchCheckList,
  useFetchDoctor,
  useFetchDoctors
};

