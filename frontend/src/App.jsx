import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from "./contexts/AuthContext.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import TransactionsPage from './pages/TransactionsPage.jsx';
import ReportsPage from './pages/ReportsPage.jsx';
import ReportDetailPage from './pages/ReportDetailPage.jsx';


import './App.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavigationBar />
                <Container fluid className="pt-4 pb-4" style={{ backgroundColor: '#f0f2f5', minHeight: 'calc(100vh - 56px)' }}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/transactions" element={<TransactionsPage />} />
                            <Route path="/reports" element={<ReportsPage />} />
                            <Route path="/reports/:reportId" element={<ReportDetailPage />} />
                        </Route>

                        <Route path="*" element={<div className="text-center mt-5"><h2>404 - Page Not Found</h2></div>} />
                    </Routes>
                </Container>
            </Router>
        </AuthProvider>
    );
}

export default App;
