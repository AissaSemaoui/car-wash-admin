import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../providers/AuthProvider";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { isAuthorized, setIsAuthorized } = useAuthContext();
    const navigate = useNavigate();
    useEffect(() => {
      // Check authentication status
      const isAuthenticated = checkAuth();

      // Redirect to login if not authenticated
      if (!isAuthenticated) {
        // Replace '/login' with the path to your login page
        navigate("/auth/login");
      }
    }, []);

    // Placeholder authentication check function
    const checkAuth = () => {
      // Replace this with your actual authentication check logic
      // You can read the token from localStorage or use any other method
      return isAuthorized; // Returns true if token exists, modify as per your logic
    };

    // Render the wrapped component if authenticated
    // or redirect to the login page if not authenticated
    if (!checkAuth) navigate("/auth/login");

    return checkAuth() ? <WrappedComponent {...props} /> : <div></div>;
  };

  return AuthenticatedComponent;
};

export default withAuth;
