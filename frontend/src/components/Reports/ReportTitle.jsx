import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const ReportTitle = ({ initialTitle, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(initialTitle);

    const handleSave = () => {
        if (title.trim()) {
            onSave(title);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTitle(initialTitle);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="d-flex align-items-center mb-3">
                <InputGroup>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        autoFocus
                        onKeyPress={e => e.key === 'Enter' && handleSave()}
                    />
                    <Button variant="outline-success" onClick={handleSave}><FaSave /></Button>
                    <Button variant="outline-secondary" onClick={handleCancel}><FaTimes /></Button>
                </InputGroup>
            </div>
        );
    }

    return (
        <div className="d-flex align-items-center mb-3">
            <h1 className="page-title mb-0 me-3">{title}</h1>
            <Button variant="light" size="sm" onClick={() => setIsEditing(true)}>
                <FaEdit />
            </Button>
        </div>
    );
};

export default ReportTitle;
