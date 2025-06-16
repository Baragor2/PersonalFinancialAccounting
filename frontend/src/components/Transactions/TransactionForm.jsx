import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Row, Col } from 'react-bootstrap';

function TransactionForm({ show, handleClose, handleSubmit, currentTransaction, categories, error }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [type, setType] = useState('expense');

    useEffect(() => {
        if (currentTransaction) {
            setTitle(currentTransaction.title || '');
            setDescription(currentTransaction.description || '');
            setValue(currentTransaction.value || '');
            setDate(currentTransaction.created_at ? new Date(currentTransaction.created_at).toISOString().split('T')[0] : '');
            setCategoryId(currentTransaction.category || '');
            setType(currentTransaction.type || 'expense');
        } else {
            setTitle('');
            setDescription('');
            setValue('');
            setDate(new Date().toISOString().split('T')[0]);
            setCategoryId(categories.length > 0 ? categories[0].id : '');
            setType('expense');
        }
    }, [currentTransaction, show, categories]);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit({
            id: currentTransaction?.id,
            title,
            description,
            value: parseFloat(value),
            date,
            type,
            category: categoryId
        });
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Value</Form.Label>
                                <Form.Control type="number" step="0.01" value={value} onChange={(e) => setValue(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Type</Form.Label>
                                <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
                                    <option value="expense">Расход</option>
                                    <option value="income">Доход</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Category</Form.Label>
                                <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required >
                                    <option value="" disabled>Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" type="submit">
                        {currentTransaction ? 'Save Changes' : 'Create Transaction'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default TransactionForm;
