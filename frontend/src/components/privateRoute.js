// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.mjs';

const PrivateRoute = ({ children, employee = false }) => {
    const { auth } = useContext(AuthContext);
    const token = auth.token;
    const userType = auth.userType;

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (employee && userType !== 'employee') {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default PrivateRoute;
