import React, { useState } from 'react'
import Results from './Results'
import Search from './Search'
import { apiRequest } from '../../utils/api';
import '../../assets/style/search.scss'
const SearchFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchFlights = async (criteria) => {
        setIsLoading(true);
        try {
            const body = {
                Depart: criteria.departure,
                Destination: criteria.destination,
                dateDepart: criteria.dateDepart ? new Date(criteria.dateDepart).toISOString() : null,
                dateRetour: criteria.dateRetour ? new Date(criteria.dateRetour).toISOString() : null,

            };
            const response = await apiRequest('http://localhost:5235/api/vol/search', 'POST', body);
            console.log("Search flights based on criteria:", response);

            if (response && Array.isArray(response)) {
                setFlights(response);
            } else {
                setFlights([]);
            }
        } catch (error) {
            console.error("Error fetching flights:", error);
            setFlights([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>

            <div>
                <Search onSearch={fetchFlights} />

                {isLoading ? (
                    <p>Loading flights...</p>
                ) : (
                    <Results flights={flights} />
                )}
            </div></div>
    );
};

export default SearchFlights;