import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const ReportEmailForm = ({ onSend }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailData = {};
        if (startDate) emailData.start_date = startDate;
        if (endDate) emailData.end_date = endDate;
        onSend(emailData);
    };

    return (
        <Card>
            <Card.Header as="h5">Send to Email</Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <p className="text-muted small">
                        Leave fields empty to use the report's default date range.
                    </p>
                    <Row className="g-2">
                        <Col>
                            <Form.Group>
                                <Form.Label className="small">Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label className="small">End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-grid mt-3">
                        <Button variant="primary" type="submit">
                            Send
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default ReportEmailForm;
