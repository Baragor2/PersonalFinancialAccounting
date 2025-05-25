import React from 'react';
import { ListGroup, Alert } from 'react-bootstrap';
import CategoryItem from './CategoryItem.jsx';

function CategoryList({ categories, onEdit, onDelete }) {
    if (!categories || categories.length === 0) {
        return <Alert variant="info">No categories found. Add one to get started!</Alert>;
    }

    return (
        <ListGroup>
        {categories.map((category) => (
            <CategoryItem key={category.id} category={category} onEdit={onEdit} onDelete={onDelete} />
        ))}
        </ListGroup>
    );
}

export default CategoryList;
