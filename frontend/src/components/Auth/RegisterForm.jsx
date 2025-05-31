import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError("Passwords don't match.");
            return;
        }
        setError('');
        setLoading(true);
        const success = await onRegister({ username, email, password, password2 });
        if (!success) {
            setError('Registration failed. Username or email might already exist.');
        }
        setLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
        </Button>
        </Form>
    );
}

export default RegisterForm;
