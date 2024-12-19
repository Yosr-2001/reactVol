import React, { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/api';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';
import { FaPlane } from 'react-icons/fa';

const ListFlights = () => {
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


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
        < >
            <Navbar />
            <br></br>
            <h3>Vols disponibles:</h3>
            <div className="container mt-4">
                {isLoading ? (
                    <p>Loading flights...</p>
                ) : flights.length > 0 ? (
                    <Row>

                        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>

                            {flights.map((flight) => (
                                <Col md={12} key={flight.idVol} className="mb-4">
                                    <Card>
                                        <Card.Header as="h5" style={{ backgroundColor: '#e7e8e8', opacity: ' 90%' }}>{flight.aeroportDepart.villeAeroport} → {flight.aeroportArrivee.villeAeroport} </Card.Header>
                                        <Card.Body>
                                            <Card.Title>
                                                <strong>Departure:</strong> {flight.aeroportDepart.nomAeroport} ({flight.aeroportDepart.villeAeroport}, {flight.aeroportDepart.paysAeroport})<br />
                                                <strong>Arrival:</strong> {flight.aeroportArrivee.nomAeroport} ({flight.aeroportArrivee.villeAeroport}, {flight.aeroportArrivee.paysAeroport})
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
                                            >
                                                Reserver     <FaPlane style={{ marginLeft: '8px' }} />
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}


                        </div>    </Row>
                ) : (
                    <p>No flights available.</p>
                )}
            </div>
        </ >
    )
}

export default ListFlights
