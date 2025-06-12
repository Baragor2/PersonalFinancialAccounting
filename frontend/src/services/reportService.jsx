import apiClient from '../api.jsx';

export const getReports = async () => {
    const response = await apiClient.get('/reports/');
    if (response.data && Array.isArray(response.data.results)) {
        return response.data.results;
    }
    if (Array.isArray(response.data)) {
        return response.data;
    }
    return [];
};

export const createReport = async (reportData) => {
    const response = await apiClient.post('/reports/', reportData);
    return response.data;
};

export const getReportDetail = async (reportId, categoryIds = []) => {
    const params = new URLSearchParams();
    categoryIds.forEach(id => params.append('category_ids', id));

    const response = await apiClient.get(`/reports/${reportId}/`, { params });
    return response.data;
};

export const renameReport = async (reportId, newTitle) => {
    const response = await apiClient.patch(`/reports/${reportId}/`, { title: newTitle });
    return response.data;
};

export const deleteReport = async (reportId) => {
    await apiClient.delete(`/reports/${reportId}/`);
};

export const sendReportByEmail = async (reportData) => {
    const response = await apiClient.post('/reports/send-email/', reportData);
    return response.data;
};
