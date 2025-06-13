import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
import { FaTrashAlt, FaEye } from 'react-icons/fa';

const ReportItem = ({ report, onDelete }) => {
    return (
        <ListGroup.Item>
            <div>
                <Link to={`/reports/${report.id}`} className="h5 mb-1 d-block text-decoration-none">
                    {report.title}
                </Link>
                <small className="text-muted">Period: {report.period}</small>
            </div>
            <div className="item-actions">
                <Link to={`/reports/${report.id}`} className="btn btn-sm btn-outline-primary">
                    <FaEye /> Show
                </Link>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete(report.id)}>
                    <FaTrashAlt />
                </Button>
            </div>
        </ListGroup.Item>
    );
};

export default ReportItem;
