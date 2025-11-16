import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const RotaPrivadaLayout = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Carregando...</div>;
    }

    return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};
export default RotaPrivadaLayout;