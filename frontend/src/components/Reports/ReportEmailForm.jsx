import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ReportEmailForm = ({ onSend }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend();
    };

    return (
        <Card>
            <Card.Header as="h5">Send to Email</Card.Header>
            <Card.Body>
                <div className="d-grid mt-2">
                    <Button variant="primary" onClick={handleSubmit}>
                        Send
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ReportEmailForm;
