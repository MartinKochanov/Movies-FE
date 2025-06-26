import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const PublicRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get("redirectTo");

  if (auth && !redirectTo) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
