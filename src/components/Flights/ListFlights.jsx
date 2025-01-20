import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Import axios
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
                const response = await axios.get('http://127.0.0.1:8000/api/vols');

                if (Array.isArray(response.data)) {
                    setFlights(response.data);
                } else {
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
                        {flights.map((flight, index) => (
                            <Col md={6} lg={4} key={flight.idVol || `${flight.aeroportDepart?.villeAeroport}-${flight.aeroport_arrivee?.ville_aeroport}-${index}`} className="mb-4">
                                <Card>
                                    <Card.Header as="h5" style={{ backgroundColor: '#e7e8e8', opacity: '90%' }}>
                                        {flight.aeroport_depart?.ville_aeroport || 'Unknown'} → {flight.aeroport_arrivee?.ville_aeroport || 'Unknown'}
                                    </Card.Header>
                                    <Card.Body>

                                        <Card.Text>
                                            <strong>Departure:</strong> {flight.heure_depart ? new Date(flight.heure_depart).toLocaleString() : 'Unknown'}<br />

                                            <br></br>  <strong>Arrival:</strong> {flight.heure_arrivee ? new Date(flight.heure_arrivee).toLocaleString() : 'Unknown'}<br />

                                            <strong>Prix:</strong>   <span style={{ color: 'red', marginLeft: '5px', fontWeight: '900' }}> {flight.prix ? `${flight.prix} Dt` : ''}<br />
                                            </span>
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
