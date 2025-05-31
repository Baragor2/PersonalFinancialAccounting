import React from 'react';
import { ListGroup, Button, Col, Row } from 'react-bootstrap';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function CategoryItem({ category, onEdit, onDelete }) {
    return (
        <ListGroup.Item>
            <span className="category-item-title">{category.title}</span>
            <div className="item-actions">
                <Button variant="outline-primary" size="sm" onClick={() => onEdit(category)} className="me-2">
                    <FaEdit />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(category.id)}>
                    <FaTrashAlt />
                </Button>
            </div>
        </ListGroup.Item>
    );
}

export default CategoryItem;
