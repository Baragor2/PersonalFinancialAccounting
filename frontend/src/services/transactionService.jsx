import apiClient from '../api.jsx';

export const getTransactions = async (page = 1) => {
    const response = await apiClient.get('/transactions/', {
        params: {
            page: page
        }
    });
    return response.data;
};

export const getTransaction = async (id) => {
    const response = await apiClient.get(`/transactions/${id}/`);
    return response.data;
};

export const createTransaction = async (transactionData) => {
    const response = await apiClient.post('/transactions/', transactionData);
    return response.data;
};

export const updateTransaction = async (id, transactionData) => {
    const response = await apiClient.put(`/transactions/${id}/`, transactionData);
    return response.data;
};

export const deleteTransaction = async (id) => {
    await apiClient.delete(`/transactions/${id}/`);
};
