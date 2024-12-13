import { useNavigate } from 'react-router-dom';

export const apiRequest = async (url, method, body = null) => {
    const token = sessionStorage.getItem('jwttoken');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };

    const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
    };

    const response = await fetch(url, options);

    if (response.status === 401) {
        sessionStorage.clear();
        window.location.href = '/signin'; // Redirect to login
        throw new Error('Unauthorized. Please log in again.');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
};
