import React, { useState } from 'react'
import Results from './Results'

import Search from './Search'
import { apiRequest } from '../../utils/api';
const SearchFlights = () => {
    const [searchCriteria, setSearchCriteria] = useState(null);
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const fetchFlights = async (criteria) => {
        setIsLoading(true);

        try {

            const body = {
                Depart: criteria.departure,
                Destination: criteria.destination,
                DateDepart: criteria.travelDates[0]?.toISOString(),
                DateRetour: criteria.travelDates[1]?.toISOString(),
            };
            const response =
                await apiRequest('http://localhost:5235/api/vol/search', 'POST', body);
            console.log("search flights based on criterias heree", response);

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
        <div>
            <Search onSearch={fetchFlights} />
            <Results flights={flights} isLoading={isLoading} />
        </div>
    );
}


export default SearchFlights
