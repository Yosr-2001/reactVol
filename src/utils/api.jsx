import { useNavigate } from 'react-router-dom';

export const apiRequest = async (url, method, body = null) => {
    const token = sessionStorage.getItem('jwttoken');
    /**When you receive the token on successful login, the JwtSecurityToken includes
     *  the ClaimTypes.NameIdentifier, which contains the user ID. Even though this ID
     *  isn't explicitly returned in the response, it is embedded in the JWT token. */
    let userId = null;
    //pb avec jwt_decode !!!!
    // if (token) {
    //     const decodedToken = jwt_decode(token);  // Decodes the token to a JS object
    //     userId = decodedToken?.nameid;  // Extract user ID from the token

    // }

    // console.log("decoded token ", decodedToken);
    // console.log("userID from decoded ", userId);

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };

    const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) })
    };
    if (body) {
        options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);

    if (response.status === 401) {
        sessionStorage.clear();
        window.location.href = '/sign-in';
        throw new Error('Unauthorized. Please log in again.');
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }


    return response.json();
};
