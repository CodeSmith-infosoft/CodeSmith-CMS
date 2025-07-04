// components/RequireAuth.tsx
import Layouts from "@/pages/layouts";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = !!localStorage.getItem("token");

  return token ? <Layouts><Outlet /></Layouts> : <Navigate to="/" replace />;
};

export default RequireAuth;
