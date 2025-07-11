import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { isTokenValid } from "../utils/Auth";
import { APP_ROUTES } from "../constants/constants";

const PrivateRoute = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!isTokenValid()) {
      toast.error("Invalid or expired token. Please log in again.");
      setShouldRedirect(true);
    }
  }, []);

  if (shouldRedirect) {
    return <Navigate to={APP_ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
