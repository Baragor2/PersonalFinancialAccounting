import React from 'react';
import ReportItem from './ReportItem';
import { ListGroup } from 'react-bootstrap';

const ReportList = ({ reports, onDelete }) => {
    if (reports.length === 0) {
        return <p className="text-muted text-center">You have no saved reports.</p>;
    }

    return (
        <ListGroup variant="flush">
            {reports.map(report => (
                <ReportItem key={report.id} report={report} onDelete={onDelete} />
            ))}
        </ListGroup>
    );
};

export default ReportList;
