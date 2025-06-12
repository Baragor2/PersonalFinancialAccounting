import React from 'react';
import { Form } from 'react-bootstrap';

const CategoryFilter = ({ categories, selected, onChange }) => {
    return (
        <Form>
            {categories.map(cat => (
                <Form.Check
                    type="checkbox"
                    id={`cat-filter-${cat.id}`}
                    key={cat.id}
                    label={cat.title}
                    checked={selected.includes(cat.id)}
                    onChange={() => onChange(cat.id)}
                    className="mb-2"
                />
            ))}
        </Form>
    );
};

export default CategoryFilter;