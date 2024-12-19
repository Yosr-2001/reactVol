import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../utils/api';
import { Button, Card, Col, Row } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { FaPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleReserveClick = (flight) => {
        navigate("/passenger-form", { state: { selectedFlight: flight } });
    };

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await apiRequest('http://localhost:5235/api/vol', 'GET');
                console.log('Vols here :', response[0]);
                setFlights(response);
            } catch (error) {
                console.error('Error fetching flights:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFlights();
    }, []);

    return (
        <>
            <Navbar />
            <br />
            <h3>Vols disponibles:</h3>
            <div className="container mt-4">
                {isLoading ? (
                    <p>Loading flights...</p>
                ) : flights.length > 0 ? (
                    <Row>
                        {flights.map((flight) => (
                            <Col md={6} key={flight.idVol} className="mb-4">
                                <Card>
                                    <Card.Header as="h5" style={{ backgroundColor: '#e7e8e8', opacity: ' 90%' }}>
                                        {flight.aeroportDepart.villeAeroport} → {flight.aeroportArrivee.villeAeroport}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <strong>Departure:</strong> {flight.aeroportDepart.nomAeroport} ({flight.aeroportDepart.villeAeroport}, {flight.aeroportDepart.paysAeroport})<br />
                                            <strong>Arrival:</strong> {flight.aeroportArrivee.nomAeroport} ({flight.aeroportArrivee.villeAeroport}, {flight.aeroportArrivee.paysAeroport})
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Departure Time:</strong> {new Date(flight.heureDepart).toLocaleString()}<br />
                                            <strong>Arrival Time:</strong> {new Date(flight.heureArrivee).toLocaleString()}<br />
                                            <strong>Price:</strong> <span style={{ color: 'green', fontWeight: 'bold' }}>{flight.prixVol} DT</span>
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            style={{
                                                padding: '10px 20px',
                                                fontWeight: 'bold',
                                                transition: 'background-color 0.3s',
                                            }} onClick={() => handleReserveClick(flight)}
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
