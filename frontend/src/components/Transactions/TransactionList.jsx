import React from 'react';
import { ListGroup, Alert, Row, Col, Card } from 'react-bootstrap';
import TransactionItem from './TransactionItem';

function TransactionList({ transactions, onEdit, onDelete, categories }) {
    if (!transactions || transactions.length === 0) {
        return <Alert variant="info">No transactions found. Add one to get started!</Alert>;
    }

    const categoryMap = categories.reduce((acc, cat) => {
        acc[cat.id] = cat.title;
        return acc;
    }, {});

    return (
        <>
        <Card.Header className="d-none d-md-block bg-light transaction-list-header">
            <Row className="fw-bold">
            <Col md={4}>Title</Col>
            <Col md={1} className="text-nowrap">Description</Col>
            <Col md={2} className="text-center">Value</Col>
            <Col md={2} className="text-center">Date</Col>
            <Col md={1} className="text-center">Category</Col>
            <Col md={2} className="text-end">Actions</Col>
            </Row>
        </Card.Header>
        <ListGroup variant="flush">
            {transactions.map((transaction) => (
            <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
                categoryMap={categoryMap}
            />
            ))}
        </ListGroup>
        </>
    );
}

export default TransactionList;
