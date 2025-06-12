import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Alert, Spinner, Card } from 'react-bootstrap';
import TransactionList from '../components/Transactions/TransactionList.jsx';
import TransactionForm from '../components/Transactions/TransactionForm.jsx';
import PaginationControls from '../components/common/PaginationControls.jsx';
import { getTransactions, createTransaction, updateTransaction, deleteTransaction } from '../services/transactionService.jsx';
import { getCategories } from '../services/categoryService.jsx';

const PAGE_SIZE = 5;

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

    const fetchPageData = useCallback(async (pageToFetch) => {
        try {
            setLoading(true);
            setError('');
            const [transData, catData] = await Promise.all([
                getTransactions(pageToFetch),
                getCategories()
            ]);
            setTransactions(transData.results || []);
            setTotalTransactions(transData.count || 0);
            setCategories(catData);
        } catch (err) {
            setError('Failed to fetch data. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPageData(currentPage);
    }, [currentPage, fetchPageData]);

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
            fetchPageData(currentPage);
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
                fetchPageData(currentPage);
            } catch (err) {
                console.error("Failed to delete transaction:", err);
                setError('Failed to delete transaction.');
            }
        }
    };

    const totalPages = Math.ceil(totalTransactions / PAGE_SIZE);

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading transactions...</span>
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
                    <TransactionList
                        transactions={transactions}
                        categories={categories}
                        onEdit={handleShowModal}
                        onDelete={handleDeleteTransaction}
                    />
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
