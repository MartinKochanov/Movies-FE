import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { useEffect } from "react";

import { useAuth } from "../../context/AuthContext";

const AdminRoute = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
      toast.error("Unauthorized Access!");
    }
  }, [user]);

  if (user && user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    return <Navigate to={"/"} replace />;
  }

  if ((user && user.role === "ADMIN") || user?.role === "SUPER_ADMIN") {
    return <Outlet />;
  }
};

export default AdminRoute;
