import React, { useContext, useState } from "react";
import { useEffect } from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(true); // set if it's admin or vendor

  const checkAuth = () => {
    // Replace this with your actual authentication check logic
    // You can read the token from localStorage or use any other method
    const token = localStorage.getItem("token");
    return !!token; // Returns true if token exists, modify as per your logic
  };

  useEffect(() => {
    if (checkAuth()) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const logOut = () => {
    setIsAuthorized(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, setIsAuthorized, logOut }}>
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
