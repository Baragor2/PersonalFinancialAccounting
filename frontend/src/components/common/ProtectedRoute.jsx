import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        );
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
