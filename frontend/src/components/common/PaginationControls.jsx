import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationControls({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    const handlePageClick = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    let items = [];
    for (let number = 1; number <= totalPages; number++) {
        items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Pagination className="justify-content-center">
            <Pagination.Prev
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {items}
            <Pagination.Next
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        </Pagination>
    );
}

export default PaginationControls;
