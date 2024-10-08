// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token'),
        userType: null,
    });

    // Decode the token to get userType
    useEffect(() => {
        if (auth.token) {
            try {
                const decoded = jwtDecode(auth.token);
                setAuth(prev => ({ ...prev, userType: decoded.userType }));
            } catch (error) {
                console.error('Invalid token:', error);
                setAuth({ token: null, userType: null });
                localStorage.removeItem('token');
            }
        } else {
            setAuth({ token: null, userType: null });
        }
    }, [auth.token]);

    // Function to handle login
    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setAuth({ token, userType: decoded.userType });
    };

    // Function to handle logout
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, userType: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
