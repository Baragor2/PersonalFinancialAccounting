import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, NavLink as RouterNavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt, FaChartPie } from 'react-icons/fa';

function NavigationBar() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" className="app-navbar mb-4" sticky="top">
        <Container>
            <Navbar.Brand as={Link} to="/">
                <FaChartPie className="brand-icon" size="1.5em" />
                PersonalFinance
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={RouterNavLink} to="/" end>Home</Nav.Link>
                {isAuthenticated && (
                <>
                    <Nav.Link as={RouterNavLink} to="/categories">Categories</Nav.Link>
                    <Nav.Link as={RouterNavLink} to="/transactions">Transactions</Nav.Link>
                </>
                )}
            </Nav>
            <Nav>
                {isAuthenticated ? (
                <>
                    <Navbar.Text className="me-3">
                    Hi, {user?.username || 'User'}!
                    </Navbar.Text>
                    <Button variant="outline-primary" onClick={handleLogout}>
                        <FaSignOutAlt className="action-icon" /> Logout
                    </Button>
                </>
                ) : (
                <>
                    <Nav.Link as={RouterNavLink} to="/login" className="me-2">
                        <FaSignInAlt className="action-icon" /> Login
                    </Nav.Link>
                    <Button as={Link} to="/register" variant="primary">
                        <FaUserPlus className="action-icon" /> Register
                    </Button>
                </>
                )}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavigationBar;
