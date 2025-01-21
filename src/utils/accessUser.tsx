import Cookies from "js-cookie";

export const getUserDataFromCookie = () => {
    const userData = Cookies.get("user");
    return userData ? JSON.parse(userData) : null;
  };
