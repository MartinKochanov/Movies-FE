import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      toast.error("Please, log in first to access.");
    }
  }, [auth]);

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={`/sign-in?redirectTo=${encodeURIComponent(location.pathname)}`} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
