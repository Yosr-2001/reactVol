import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = sessionStorage.getItem('jwttoken');
    const userRole = sessionStorage.getItem('role');
    if (!token) {
        return <Navigate to="/sign-in" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/forbidden" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
