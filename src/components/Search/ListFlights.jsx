import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/api';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { FaPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate(); // Use navigate hook for redirection

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await apiRequest('/vols', 'GET'); // Fetch flight data from the API
                setFlights(data); // Set the fetched data in state
            } catch (error) {
                console.error('Error fetching flights:', error); // Log errors if fetching fails
            } finally {
                setIsLoading(false); // Update the loading state
            }
        };
        fetchFlights(); // Call fetchFlights when the component mounts
    }, []);

    const handleReserveClick = (flight) => {
        if (!flight) {
            console.error('No flight selected.');
            return;
        }
        navigate('/passenger-form', { state: { selectedFlight: flight } }); // Navigate with state
    };

    return (
        <>
            <Navbar />
            <br />
            <h3>Vols disponibles:</h3>
            <div className="container mt-4">
                {isLoading ? (
                    <p>Loading flights...</p> // Display loading text if data is being fetched
                ) : flights.length > 0 ? (
                    <Row>
                        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            {flights.map((flight) => (
                                <Col md={6} lg={4} key={flight.idVol} className="mb-4">
                                    {/* Use `Col` for better responsiveness and dynamic sizing */}
                                    <Card>
                                        <Card.Header as="h5" style={{ backgroundColor: '#e7e8e8', opacity: '90%' }}>
                                            {flight.aeroportDepart.villeAeroport} → {flight.aeroportArrivee.villeAeroport}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                <strong>Departure:</strong> {flight.aeroportDepart.nomAeroport} (
                                                {flight.aeroportDepart.villeAeroport}, {flight.aeroportDepart.paysAeroport})<br />
                                                <strong>Arrival:</strong> {flight.aeroportArrivee.nomAeroport} (
                                                {flight.aeroportArrivee.villeAeroport}, {flight.aeroportArrivee.paysAeroport})
                                            </Card.Title>
                                            <Card.Text>
                                                <strong>Departure Time:</strong> {new Date(flight.heureDepart).toLocaleString()}<br />
                                                <strong>Arrival Time:</strong> {new Date(flight.heureArrivee).toLocaleString()}<br />
                                                <strong>Price:</strong> {flight.prixVol} DT
                                            </Card.Text>
                                            <Button
                                                variant="primary"
                                                style={{
                                                    padding: '10px 20px',
                                                    fontWeight: 'bold',
                                                    transition: 'background-color 0.3s',
                                                }}
                                                onClick={() => handleReserveClick(flight)} // Handle reservation button click
                                            >
                                                Reserver <FaPlane style={{ marginLeft: '8px' }} />
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </div>
                    </Row>
                ) : (
                    <p>No flights available.</p> // If no flights are available, show this message
                )}
            </div>
        </>
    );
};

export default ListFlights;
