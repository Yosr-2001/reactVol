import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/api'; // Assuming apiRequest handles axios calls
import { Button, Card, Col, Row } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { FaPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleReserveClick = (flight) => {
        navigate("/passenger-form", { state: { selectedFlight: flight } });
    };

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await apiRequest('/vol', 'GET'); // Adjust the API endpoint as needed
                if (Array.isArray(response)) {
                    setFlights(response);
                } else {
                    console.error('Unexpected response format:', response);
                    setError('Failed to fetch flights. Please try again later.');
                }
            } catch (err) {
                console.error('Error fetching flights:', err);
                setError('Failed to fetch flights. Please check your connection.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFlights();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h3>Vols disponibles:</h3>
                {isLoading ? (
                    <p>Loading flights...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : flights.length > 0 ? (
                    <Row>
                        {flights.map((flight) => (
                            <Col md={6} lg={4} key={flight.idVol} className="mb-4">
                                <Card>
                                    <Card.Header as="h5" style={{ backgroundColor: '#e7e8e8', opacity: '90%' }}>
                                        {flight.aeroportDepart?.villeAeroport || 'Unknown'} → {flight.aeroportArrivee?.villeAeroport || 'Unknown'}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <strong>Departure:</strong> {flight.aeroportDepart?.nomAeroport || 'Unknown'} ({flight.aeroportDepart?.villeAeroport || 'Unknown'}, {flight.aeroportDepart?.paysAeroport || 'Unknown'})<br />
                                            <strong>Arrival:</strong> {flight.aeroportArrivee?.nomAeroport || 'Unknown'} ({flight.aeroportArrivee?.villeAeroport || 'Unknown'}, {flight.aeroportArrivee?.paysAeroport || 'Unknown'})
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Departure Time:</strong> {flight.heureDepart ? new Date(flight.heureDepart).toLocaleString() : 'Unknown'}<br />
                                            <strong>Arrival Time:</strong> {flight.heureArrivee ? new Date(flight.heureArrivee).toLocaleString() : 'Unknown'}<br />
                                            <strong>Price:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{flight.prixVol || 'N/A'} DT</span>
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            style={{
                                                padding: '10px 20px',
                                                fontWeight: 'bold',
                                                transition: 'background-color 0.3s',
                                            }}
                                            onClick={() => handleReserveClick(flight)}
                                        >
                                            Reserver <FaPlane style={{ marginLeft: '8px' }} />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>No flights available.</p>
                )}
            </div>
        </>
    );
};

export default ListFlights;
