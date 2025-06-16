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
    const categoryTitle = categoryMap[transaction.category] || 'N/A';
    const isIncome = transaction.type === 'income';
    const valueColorClass = isIncome ? 'positive' : 'negative';
    const value = parseFloat(transaction.value);

    return (
        <ListGroup.Item className="transaction-item">
            <Row className="align-items-center w-100">
                <Col md={4} xs={12} className="mb-2 mb-md-0">
                    <div className="transaction-title">{transaction.title}</div>
                    {transaction.description && (
                        <div className="transaction-description text-muted small">{transaction.description}</div>
                    )}
                </Col>

                <Col md={2} xs={6} className={`text-center transaction-value ${valueColorClass}`}>
                    {isIncome ? '+' : '-'}{value.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' })}
                </Col>

                <Col md={2} xs={6} className="text-center">
                    <Badge bg={isIncome ? 'success' : 'danger'} className="fw-normal">
                        {transaction.type}
                    </Badge>
                </Col>

                <Col md={2} xs={6} className="text-center text-md-center">
                    {formatDate(transaction.created_at)}
                </Col>

                <Col md={1} xs={6} className="text-center text-md-center">
                    <Badge bg="secondary" pill className="fw-normal">{categoryTitle}</Badge>
                </Col>

                <Col md={1} xs={12} className="text-md-end mt-2 mt-md-0 item-actions">
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
