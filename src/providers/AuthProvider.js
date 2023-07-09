import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { sendRequest } from "../helper/sendRequest";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(true);

  const checkAuth = async () => {
    let isValid = false;
    const token = localStorage.getItem("token");

    try {
      if (!!token) {
        const API_URL = `${process.env.REACT_APP_BASE_URL}/api/auth/verify-token`;

        const response = await sendRequest({
          url: API_URL,
          method: "POST",
          body: { token },
          allowNotifications: false,
        });

        if (!response || !response.success) {
          return isValid;
        }

        const newToken = response.token;
        if (newToken) localStorage.setItem("token", newToken);
        isValid = true;
      }
    } catch {
      toast.error("Session Expired, Please try again!");
      return isValid;
    }

    return isValid;
  };

  const checkIsAuthentitcated = async () => {
    const isAuthentitcated = await checkAuth();
    if (isAuthentitcated) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  };

  const logIn = async (values) => {
    const responseData = await sendRequest({
      url: `${process.env.REACT_APP_BASE_URL}/api/auth/login`,
      method: "POST",
      body: { email: values?.email, password: values?.password },
    });

    const { token } = responseData;

    if (!token) {
      setIsAuthorized(false);
      toast.error("Failed Sign in, Please try again");
      return responseData;
    }

    localStorage.setItem("token", token);

    setIsAuthorized(true);

    return responseData;
  };

  const logOut = () => {
    setIsAuthorized(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    checkIsAuthentitcated();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthorized, setIsAuthorized, logOut, logIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("You can't access useAuthContext outside of Auth Provider");

  return context;
};
