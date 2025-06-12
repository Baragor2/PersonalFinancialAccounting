import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ReportForm = ({ onCreate }) => {
    const [title, setTitle] = useState('');
    const [period, setPeriod] = useState('month');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Enter report title');
            return;
        }
        onCreate({ title, period });
        setTitle('');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="g-2 align-items-end">
                <Col md={6}>
                    <Form.Group controlId="reportTitle">
                        <Form.Label>Report title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="For example, 'May's report'"
                            required
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group controlId="reportPeriod">
                        <Form.Label>Period</Form.Label>
                        <Form.Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                            <option value="quarter">Quarter</option>
                            <option value="year">Year</option>
                        </Form.Select>
                    </Form.Group>
                </Col>

                <Col md={2}>
                    <Button variant="primary" type="submit" className="w-100">
                        Create
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ReportForm;