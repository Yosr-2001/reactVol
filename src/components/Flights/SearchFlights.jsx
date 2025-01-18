import React, { useState } from 'react';
import Results from './Results';
import Search from './Search';
import { apiRequest } from '../../utils/api';

const SearchFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFlights = async (criteria) => {
        setIsLoading(true);
        setError(null); // Reset error state before making a new request

        try {
            const body = {
                Depart: criteria.departure,
                Destination: criteria.destination,
                DateDepart: criteria.travelDates[0]?.toISOString(),
                DateRetour: criteria.travelDates[1]?.toISOString(),
            };

            const response = await apiRequest('/vol/search', 'POST', body);

            console.log("Flights fetched based on criteria:", response);

            if (Array.isArray(response)) {
                setFlights(response);
            } else {
                console.error("Unexpected response format:", response);
                setFlights([]);
            }
        } catch (error) {
            console.error("Error fetching flights:", error);
            setError('Failed to fetch flights. Please try again later.');
            setFlights([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Search onSearch={fetchFlights} />
            <Results flights={flights} isLoading={isLoading} error={error} />
        </div>
    );
};

export default SearchFlights;
