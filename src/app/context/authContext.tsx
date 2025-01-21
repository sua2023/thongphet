"use client";
import { IUsersTypes } from "@/interfaces";
import useApi from "@/lib/useApi";
import { useEdit } from "@/lib/useCreate";
import { useToast } from "@/lib/useToast";
import { setMyData } from "@/redux/features/userSlice";
import { getUserDataFromCookie } from "@/utils/accessUser";
import { LoginMessage } from "@/utils/httpMessage";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useReducer } from "react";
import { useDispatch } from "react-redux";

interface AuthState {
  isAuthenticated: boolean;
  user: IUsersTypes | null;
  formData: { email: string; password: string } | null;
  twoFa: boolean;
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify2fa: (code: string) => Promise<void>;
  refreshUserData: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  formData: null,
  twoFa: false,
};

const authReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        twoFa: false,
      };
    case "LOGIN_VERIFY_2FA":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        formData: action.payload,
        twoFa: true,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        twoFa: false,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const fetchAPI = useApi();
  const { successMessage, errorMessage } = useToast();
  const [state, authDispatch] = useReducer(authReducer, initialState);
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshUserData = () => {
    const userData = getUserDataFromCookie();

    if (userData) {
      authDispatch({ type: "LOGIN_SUCCESS", payload: userData });
    } else if (!userData && state.user) {
      authDispatch({ type: "LOGOUT", payload: null });
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      const response = await fetchAPI({
        url: "users/me",
        params: {},
        method: "GET",
      });
      if (response.status === 200) {
        authDispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        dispatch(setMyData(response.data));
        Cookies.set("user", JSON.stringify(response.data));
        router.push("/admin/dashboard");
        successMessage(LoginMessage.SUCCESS, 2000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetchAPI({
        url: "users/login",
        params: { email, password },
        method: "POST",
      });

      if (response.status === 200 && !response.twoFactorRequired) {
        await checkAuth();
      } else if (response.status === 200 && response.twoFactorRequired) {
        authDispatch({
          type: "LOGIN_VERIFY_2FA",
          payload: { email, password },
        });
      } else {
        errorMessage(LoginMessage.FAILED, 1000);
      }
    } catch (error) {
      errorMessage(LoginMessage.FAILED, 1000);
      router.push("/auth/admin/login");
    }
  };

  const verify2fa = async (code: string) => {
    if (!code || !state.formData?.email) {
      return;
    }

    try {
      const newValue = {
        email: state.formData.email,
        password: state.formData.password,
        twoFactorCode: code,
      };
      const response = await fetchAPI({
        url: "users/login",
        params: newValue,
        method: "POST",
      });

      if (response.status === 200) {
        await checkAuth();
      } else {
        errorMessage(LoginMessage.FAILED, 1000);
      }
    } catch (error) {
      errorMessage(LoginMessage.FAILED, 1000);
      router.push("/auth/admin/login");
    }
  };

  const clearAllCookies = () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
  };

  const logout = async () => {
    try {
      const response = await fetchAPI({
        url: "users/logout",
        params: {},
        method: "POST",
      });

      if (response.status === 200) {
        authDispatch({ type: "LOGOUT" });
        clearAllCookies();
        localStorage.clear();
        router.push("/auth/admin/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, verify2fa, logout, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
