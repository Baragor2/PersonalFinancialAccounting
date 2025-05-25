import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

function CategoryForm({ show, handleClose, handleSubmit, currentCategory, error }) {
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (currentCategory) {
            setTitle(currentCategory.title || '');
        } else {
            setTitle('');
        }
    }, [currentCategory, show]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Category title cannot be empty.");
            return;
        }
        handleSubmit({ id: currentCategory?.id, title });
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>{currentCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmit}>
            <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter category title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                autoFocus
                />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" type="submit">
                {currentCategory ? 'Save Changes' : 'Create Category'}
            </Button>
            </Modal.Footer>
        </Form>
        </Modal>
    );
}

export default CategoryForm;
