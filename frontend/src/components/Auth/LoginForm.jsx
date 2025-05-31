import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const success = await onLogin(username, password);
        if (!success) {
        setError('Invalid username or password.');
        }
        setLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
        </Button>
        </Form>
    );
}

export default LoginForm;
