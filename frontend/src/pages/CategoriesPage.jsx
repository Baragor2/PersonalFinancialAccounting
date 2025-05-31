import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Alert, Spinner, Card } from 'react-bootstrap';
import CategoryList from '../components/Categories/CategoryList.jsx';
import CategoryForm from '../components/Categories/CategoryForm.jsx';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/categoryService.jsx';

function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formError, setFormError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    const fetchAndSetCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const data = await getCategories();
            if (!Array.isArray(data)) {
                throw new Error('Expected categories array');
            }
            setCategories(data);
        } catch (err) {
            setError('Failed to fetch categories. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAndSetCategories();
    }, [fetchAndSetCategories]);
    const handleShowModal = (category = null) => {
        setCurrentCategory(category);
        setFormError('');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentCategory(null);
    };

    const handleSubmitCategory = async (categoryData) => {
        setFormError('');
        try {
            if (currentCategory && currentCategory.id) {
                await updateCategory(currentCategory.id, { title: categoryData.title});
            } else {
                await createCategory({ title: categoryData.title});
            }
            fetchAndSetCategories();
            handleCloseModal();
        } catch (err) {
            console.error("Failed to save category:", err.response ? err.response.data : err);
            setFormError(err.response?.data?.title?.join(', ') || err.response?.data?.detail || 'Failed to save category.');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to delete this category? This might affect existing transactions.')) {
            try {
                setError('');
                await deleteCategory(id);
                fetchAndSetCategories();
            } catch (err) {
                console.error("Failed to delete category:", err);
                setError('Failed to delete category. It might be in use.');
            }
        }
    };

    if (loading) {
        return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading categories...</span>
            </Spinner>
        </Container>
        );
    }

    return (
        <Container>
        <Card className="shadow-sm">
            <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
            Manage Categories
            <Button variant="primary" onClick={() => handleShowModal()}>
                Add New Category
            </Button>
            </Card.Header>
            <Card.Body>
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
            <CategoryList
                categories={categories}
                onEdit={handleShowModal}
                onDelete={handleDeleteCategory}
            />
            </Card.Body>
        </Card>

        <CategoryForm
            show={showModal}
            handleClose={handleCloseModal}
            handleSubmit={handleSubmitCategory}
            currentCategory={currentCategory}
            error={formError}
        />
        </Container>
    );
}

export default CategoriesPage;
