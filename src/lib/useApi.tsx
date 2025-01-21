import useAuth from "@/app/context/useAuth";
import { API_ENPOINT } from "@/constants/constants";
import { httpHandlers } from "@/utils/httpHandlers";

const useApi = () => {
  // const { logout } = useAuth();
  const fetchAPI = async (props: {
    url: string;
    params?: any;
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  }) => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const options: RequestInit = {
        method: props.method,
        headers: headers,
        credentials: "include",
      };

      if (props.method !== "GET" && props.params) {
        options.body = JSON.stringify(props.params);
      }

      const response = await fetch(`${API_ENPOINT}/${props.url}`, options);

      if (response.status === 401) {
        // logout();
        window.location.reload();
      }
      if (response.ok) {
        const data = await response.json();
        const errorMessage = httpHandlers(response.status);
        return { ...data, httpCode: errorMessage };
      } else {
        const errorMessage = httpHandlers(response.status);
        return errorMessage;
      }
    } catch (error) {
      return Promise.reject("An unknown error occurred");
    }
  };

  return fetchAPI;
};

export default useApi;
