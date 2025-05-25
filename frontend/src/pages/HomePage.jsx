import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FaTasks, FaExchangeAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

function HomePage() {
    const { isAuthenticated } = useAuth();

    return (
        <Container className="mt-4">
        <Row className="justify-content-md-center text-center">
            <Col md={10} lg={8}>
            <Card className="p-4 p-md-5 shadow-lg home-card">
                <Card.Body>
                <Card.Title as="h1" className="mb-3">Welcome to Your Personal Financial Accounting</Card.Title>
                <Card.Text className="lead mb-4">
                    Take control of your finances. Manage your categories and track transactions with ease.
                </Card.Text>
                {isAuthenticated ? (
                    <div className="mt-4 d-grid gap-3 d-md-block">
                    <Button as={Link} to="/categories" variant="primary" size="lg" className="m-2">
                        <FaTasks className="action-icon" /> Manage Categories
                    </Button>
                    <Button as={Link} to="/transactions" variant="success" size="lg" className="m-2">
                        <FaExchangeAlt className="action-icon" /> Manage Transactions
                    </Button>
                    </div>
                ) : (
                    <div className="mt-4 d-grid gap-3 d-md-block">
                    <Card.Text className="mb-3">Please log in or register to get started.</Card.Text>
                    <Button as={Link} to="/login" variant="primary" size="lg" className="m-2">
                        <FaSignInAlt className="action-icon" /> Login
                    </Button>
                    <Button as={Link} to="/register" variant="outline-secondary" size="lg" className="m-2">
                        <FaUserPlus className="action-icon" /> Register
                    </Button>
                    </div>
                )}
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
}

export default HomePage;
