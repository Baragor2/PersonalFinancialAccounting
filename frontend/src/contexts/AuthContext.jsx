import React, { createContext, useState, useContext, useEffect } from 'react';
import apiClient from '../api.jsx';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setAuthToken(token);
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
        setLoading(false);
    }, []);


    const login = async (username, password) => {
        try {
            const response = await apiClient.post('users/api/token/', { username, password });
            const { access, refresh } = response.data;

            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            setAuthToken(access);

            const decodedUser = jwtDecode(access);
            setUser(decodedUser);

            return true;
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            return false;
        }
    };

    const register = async (userData) => {
        try {
            await apiClient.post('users/register/', userData);
            return true;
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setAuthToken(null);
        setUser(null);
    };

    const isAuthenticated = !!authToken;

    return (
        <AuthContext.Provider value={{ authToken, user, login, logout, register, isAuthenticated, loading }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
