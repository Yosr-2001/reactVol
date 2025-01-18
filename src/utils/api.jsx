import { useNavigate } from 'react-router-dom';

/**
 * Generic API request function for Laravel backend.
 * Handles request setup and basic error handling.
 *
 * @param {string} url - The endpoint URL (relative to the base URL).
 * @param {string} method - HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {Object|null} body - Request body (for POST/PUT).
 * @returns {Promise<Object>} - Parsed JSON response.
 */
export const apiRequest = async (url, method, body = null) => {
    const API_BASE_URL = 'http://127.0.0.1:5235/api'; // Laravel API base URL

    const headers = {
        'Content-Type': 'application/json', // Ensure JSON format for requests
    };

    const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }), // Add body for POST/PUT requests
    };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, options);

        if (!response.ok) {
            // Parse and throw the error for non-OK responses
            const error = await response.json();
            throw new Error(error.message || 'API request failed');
        }

        // Return parsed JSON response
        return await response.json();
    } catch (error) {
        console.error(`API request error: ${error.message}`);
        throw error; // Re-throw to handle it in the calling function
    }
};
