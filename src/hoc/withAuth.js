import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../providers/AuthProvider";

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { isAuthorized } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthorized) {
        navigate("/auth/login");
      }
    }, [isAuthorized]);

    return isAuthorized ? <WrappedComponent {...props} /> : <div></div>;
  };

  return AuthenticatedComponent;
};

export default withAuth;
