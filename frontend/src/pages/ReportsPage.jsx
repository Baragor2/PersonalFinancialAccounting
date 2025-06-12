import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { getReports, createReport, deleteReport } from '../services/reportService.jsx';
import ReportList from '../components/Reports/ReportList.jsx';
import ReportForm from '../components/Reports/ReportForm.jsx';

const ReportsPage = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setIsLoading(true);
            const data = await getReports();
            setReports(data);
            setError(null);
        } catch (err) {
            setError('Cannot load reports.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateReport = async (reportData) => {
        try {
            const newReport = await createReport(reportData);
            setReports(prevReports => [newReport, ...prevReports]);
        } catch (err) {
            alert('Error');
        }
    };

    const handleDeleteReport = async (reportId) => {
        if (window.confirm('Are you shure?')) {
            try {
                await deleteReport(reportId);
                setReports(prevReports => prevReports.filter(r => r.id !== reportId));
            } catch (err) {
                alert('Error');
            }
        }
    };

    return (
        <Container className="app-container">
            <h1 className="page-title">My reports</h1>

            <Card>
                <Card.Header as="h5">Create new report</Card.Header>
                <Card.Body>
                    <ReportForm onCreate={handleCreateReport} />
                </Card.Body>
            </Card>

            <Card>
                <Card.Header as="h5">Saved reports</Card.Header>
                <Card.Body>
                    {isLoading && (
                        <div className="spinner-container">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                    {error && <Alert variant="danger">{error}</Alert>}
                    {!isLoading && !error && (
                        <ReportList reports={reports} onDelete={handleDeleteReport} />
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReportsPage;
