import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const authContextValue = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      authContextValue &&
      !authContextValue.loading &&
      !authContextValue.token
    ) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [authContextValue, navigate, location]);

  if (
    !authContextValue ||
    authContextValue.loading ||
    !authContextValue.token
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
