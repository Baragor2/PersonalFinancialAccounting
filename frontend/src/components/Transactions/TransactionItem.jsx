import React from 'react';
import { ListGroup, Button, Col, Row, Badge } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return dateString;
    }
};


function TransactionItem({ transaction, onEdit, onDelete, categoryMap }) {
    const categoryName = categoryMap[transaction.category] || 'N/A';
    const value = parseFloat(transaction.value);
    const isPositive = value >= 0;
    const valueColorClass = isPositive ? 'positive' : 'negative';

    return (
        <ListGroup.Item className="transaction-item">
        <Row className="align-items-center w-100">
            <Col md={4} xs={12} className="mb-2 mb-md-0">
            <div className="transaction-title">{transaction.title}</div>
            </Col>

            <Col md={1} xs={12} className="mb-2 mb-md-0">
            {transaction.description && (
                <div className="transaction-description text-muted">{transaction.description}</div>
            )}
            </Col>

            <Col md={2} xs={6} className={`text-center transaction-value ${valueColorClass}`}>
            {value.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Col>

            <Col md={2} xs={6} className="text-center text-md-center">
            {formatDate(transaction.created_at)}
            </Col>

            <Col md={1} xs={6} className="text-center text-md-center">
            <Badge bg="secondary" pill className="fw-normal">{categoryName}</Badge>
            </Col>

            <Col md={2} xs={12} className="text-md-end mt-2 mt-md-0 item-actions">
            <Button variant="outline-primary" size="sm" onClick={() => onEdit(transaction)} className="me-2">
                <FaEdit />
            </Button>
            <Button variant="outline-danger" size="sm" onClick={() => onDelete(transaction.id)}>
                <FaTrashAlt />
            </Button>
            </Col>
        </Row>
        </ListGroup.Item>
    );
}

export default TransactionItem;
