import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { getReportDetail, renameReport, sendReportByEmail } from '../services/reportService.jsx';
import { getCategories } from '../services/categoryService.jsx';
import ReportDetail from '../components/Reports/ReportDetail.jsx';
import CategoryFilter from '../components/Reports/CategoryFilter.jsx';
import ReportTitle from '../components/Reports/ReportTitle.jsx';
import { FaArrowLeft } from 'react-icons/fa';

const ReportDetailPage = () => {
    const { reportId } = useParams();
    const [reportData, setReportData] = useState(null);
    const [allCategories, setAllCategories] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchReport = useCallback(async () => {
        try {
            setIsLoading(true);
            const data = await getReportDetail(reportId, selectedCategoryIds);
            setReportData(data);
            setError(null);
        } catch (err) {
            setError('Failed to load report.');
            setReportData(null);
        } finally {
            setIsLoading(false);
        }
    }, [reportId, selectedCategoryIds]);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const cats = await getCategories();
                setAllCategories(cats);
            } catch (err) {
                console.error("Failed to fetch categories for filter");
            }
        };
        fetchAllCategories();
    }, []);

    useEffect(() => {
        fetchReport();
    }, [fetchReport]);

    const handleFilterChange = (categoryId) => {
        setSelectedCategoryIds(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleRenameReport = async (newTitle) => {
        if (!newTitle.trim()) return;
        try {
            const updatedReport = await renameReport(reportId, newTitle);
            setReportData(prevData => ({ ...prevData, title: updatedReport.title }));
        } catch (err) {
            console.error("Failed to rename report", err);
            alert("Failed to rename report.");
        }
    };

    return (
        <Container className="app-container">
            {isLoading && (
                <div className="spinner-container"><Spinner animation="border" variant="primary" /></div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            {reportData && (
                <>
                    <Link to="/reports" className="btn btn-sm btn-outline-secondary mb-4">
                        <FaArrowLeft /> Back to reports
                    </Link>

                    <ReportTitle initialTitle={reportData.title} onSave={handleRenameReport} />

                    <p className="text-muted mb-4">Period: {reportData.start_date} - {reportData.end_date}</p>

                    <Row>
                        <Col lg={8} className="mb-4 mb-lg-0">
                            <ReportDetail data={reportData.data} />
                        </Col>
                        <Col lg={4}>
                            <div className="d-flex flex-column gap-4">
                                <Card>
                                    <Card.Header as="h5">Filter by Categories</Card.Header>
                                    <Card.Body>
                                        <CategoryFilter
                                            categories={allCategories}
                                            selected={selectedCategoryIds}
                                            onChange={handleFilterChange}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ReportDetailPage;
