import React from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function RegisterPage() {
    const { register, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [registrationSuccess, setRegistrationSuccess] = React.useState(false);

    const handleRegister = async (userData) => {
      const success = await register(userData);
      if (success) {
        setRegistrationSuccess(true);
        setTimeout(() => navigate('/login'), 3000);
      }
      return success;
    };

    if (authLoading) return <p>Loading...</p>;
    if (isAuthenticated) return <Navigate to="/" />;

    return (
      <Container>
        <Row className="justify-content-md-center">
          <Col md={6} lg={5}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title as="h2" className="text-center mb-4">Register</Card.Title>
                {registrationSuccess && (
                  <Alert variant="success">
                    Registration successful! You will be redirected to login shortly.
                  </Alert>
                )}
                {!registrationSuccess && <RegisterForm onRegister={handleRegister} />}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
}

export default RegisterPage;
