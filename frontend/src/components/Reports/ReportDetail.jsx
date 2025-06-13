import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const ReportDetail = ({ data }) => {
    const renderCategorySection = (sectionData, type) => (
        <Card className="mb-4">
            <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                <span>{type === 'income' ? 'Incomes' : 'Expenses'}</span>
                <span className={`transaction-value ${type === 'income' ? 'positive' : 'negative'}`}>
                    {type === 'income' ? '+' : '-'}{sectionData.total}
                </span>
            </Card.Header>
            <ListGroup variant="flush">
                {sectionData.categories.length === 0 ? (
                    <ListGroup.Item className="text-muted">No data</ListGroup.Item>
                ) : (
                    sectionData.categories.map(cat => (
                        <ListGroup.Item key={cat.category_title}>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">{cat.category_title}</span>
                            </div>

                            <ul className="list-unstyled mt-2 mb-0" style={{ paddingLeft: 0 }}>
                                {cat.transactions.map(tx => (
                                    <li key={tx.id} className="text-muted small d-flex justify-content-between border-bottom py-1">
                                        <span>{tx.date}: {tx.description || 'No description'} {tx.value}</span>
                                    </li>
                                ))}
                            </ul>

                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </Card>
    );

    return (
        <>
            {renderCategorySection(data.expense, 'expense')}
            {renderCategorySection(data.income, 'income')}

            <Card bg="light">
                <Card.Body className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Balance:</h4>
                    <h4 className={`mb-0 transaction-value ${data.final_balance >= 0 ? 'positive' : 'negative'}`}>
                        {data.final_balance}
                    </h4>
                </Card.Body>
            </Card>
        </>
    );
};

export default ReportDetail;
