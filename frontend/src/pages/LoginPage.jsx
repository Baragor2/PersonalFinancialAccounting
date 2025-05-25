import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import LoginForm from '../components/Auth/LoginForm.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function LoginPage() {
    const { login, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        const success = await login(username, password);
        if (success) {
            navigate('/');
        }
        return success;
    };

    if (authLoading) return <p>Loading...</p>;
    if (isAuthenticated) return <Navigate to="/" />;


    return (
      <div className="auth-page">
        <Container>
          <Row className="justify-content-md-center">
            <Col md={6} lg={5} xl={4}>
              <Card className="p-4 shadow-sm">
                <Card.Body>
                  <Card.Title as="h2" className="text-center mb-4">Login</Card.Title>
                  <LoginForm onLogin={handleLogin} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
}

export default LoginPage;
