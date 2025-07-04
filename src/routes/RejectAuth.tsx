// components/RejectAuth.tsx
import { Navigate, Outlet } from "react-router-dom";

const RejectAuth = () => {
    const token = !!localStorage.getItem("token");

    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default RejectAuth;
