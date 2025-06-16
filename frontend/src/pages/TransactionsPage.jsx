import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Alert, Spinner, Card, Form, Row, Col } from 'react-bootstrap';
import TransactionList from '../components/Transactions/TransactionList.jsx';
import TransactionForm from '../components/Transactions/TransactionForm.jsx';
import PaginationControls from '../components/common/PaginationControls.jsx';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../services/transactionService.jsx';
import { getCategories } from '../services/categoryService.jsx';

const PAGE_SIZE = 5;

const TransactionFilterControls = ({ categories, filters, onFilterChange, onClearFilters }) => {
    const transactionTypes = [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' },
    ];

    return (
        <Row className="mb-3 align-items-end">
            <Col md={4}>
                <Form.Group controlId="filterType">
                    <Form.Label>Filter by Type</Form.Label>
                    <Form.Select
                        name="type"
                        value={filters.type}
                        onChange={onFilterChange}
                    >
                        <option value="">All Types</option>
                        {transactionTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={4}>
                <Form.Group controlId="filterCategory">
                    <Form.Label>Filter by Category</Form.Label>
                    <Form.Select
                        name="category"
                        value={filters.category}
                        onChange={onFilterChange}
                        disabled={categories.length === 0}
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.title}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col md={4} className="d-flex align-items-end">
                 <Button variant="secondary" onClick={onClearFilters} className="w-100">Clear Filters</Button>
            </Col>
        </Row>
    );
};


function TransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalTransactions, setTotalTransactions] = useState(0);

    const [filters, setFilters] = useState({
        type: '',
        category: ''
    });

    const fetchPageData = useCallback(async (pageToFetch, currentFilters) => {
        try {
            setLoading(true);
            setError('');
            if (categories.length === 0) {
                 const catData = await getCategories();
                 setCategories(catData);
            }
            const transData = await getTransactions(pageToFetch, currentFilters);

            setTransactions(transData.results || []);
            setTotalTransactions(transData.count || 0);
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [categories.length]);

    useEffect(() => {
        fetchPageData(currentPage, filters);
    }, [currentPage, filters, fetchPageData]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters({ type: '', category: '' });
        setCurrentPage(1);
    };

    const handleShowModal = (transaction = null) => {
        setCurrentTransaction(transaction);
        setFormError('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentTransaction(null);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSubmitTransaction = async (transactionData) => {
        setFormError('');
        try {
            if (currentTransaction && currentTransaction.id) {
                await updateTransaction(currentTransaction.id, transactionData);
            } else {
                await createTransaction(transactionData);
            }
            fetchPageData(currentPage, filters);
            handleCloseModal();
        } catch (err) {
            console.error("Failed to save transaction:", err.response ? err.response.data : err);
            const apiErrors = err.response?.data;
            let errorMsg = "Failed to save transaction.";
            if (apiErrors) {
                errorMsg = Object.entries(apiErrors)
                .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                .join('; ');
            }
            setFormError(errorMsg);
        }
    };

    const handleDeleteTransaction = async (id) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                setError('');
                await deleteTransaction(id);
                fetchPageData(currentPage, filters);
            } catch (err) {
                console.error("Failed to delete transaction:", err);
                setError('Failed to delete transaction.');
            }
        }
    };

    const totalPages = Math.ceil(totalTransactions / PAGE_SIZE);

    if (loading && transactions.length === 0) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container>
            <Card className="shadow-sm">
                <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
                    Manage Transactions
                    <Button variant="primary" onClick={() => handleShowModal()} disabled={categories.length === 0}>
                        Add New Transaction
                    </Button>
                </Card.Header>
                <Card.Body>
                    {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
                    {categories.length === 0 && !loading && (
                        <Alert variant="warning">
                            Please <a href="/categories">add a category</a> before adding transactions.
                        </Alert>
                    )}

                    <TransactionFilterControls
                        categories={categories}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />

                    {loading && (
                         <div className="text-center my-3">
                            <Spinner animation="border" size="sm" /> Loading...
                         </div>
                    )}

                    {!loading && (
                        <TransactionList
                            transactions={transactions}
                            categories={categories}
                            onEdit={handleShowModal}
                            onDelete={handleDeleteTransaction}
                        />
                    )}

                    {!loading && totalTransactions === 0 && (
                        <Alert variant="info">No transactions found matching your criteria.</Alert>
                    )}

                </Card.Body>

                {totalTransactions > 0 && !loading && (
                    <Card.Footer className="d-flex justify-content-center bg-light">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </Card.Footer>
                )}
            </Card>

            <TransactionForm
                show={showModal}
                handleClose={handleCloseModal}
                handleSubmit={handleSubmitTransaction}
                currentTransaction={currentTransaction}
                categories={categories}
                error={formError}
            />
        </Container>
    );
}

export default TransactionsPage;
