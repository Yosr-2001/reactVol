import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaPlane } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Results = ({ flights }) => {
    const navigate = useNavigate();

    const handleReserveClick = (flight) => {
        navigate("/passenger-form", { state: { selectedFlight: flight } });
    };

    return (
        <>
            <div className="container mt-4">
                <h3>Vols disponibles</h3>
                <Row>
                    {flights.length > 0 ? (
                        flights.map((flight) => (
                            <Col sm={2} md={6} lg={6} xl={6} key={flight.idVol} className="mb-5">
                                <Card className="h-10">
                                    <Card.Header as="h4">
                                        {flight.aeroportDepart.villeAeroport} → {flight.aeroportArrivee.villeAeroport}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>
                                            <strong>Départ:</strong> {flight.aeroportDepart.nomAeroport}
                                            <strong><br />Arrivée:</strong> {flight.aeroportArrivee.nomAeroport}
                                        </Card.Title>
                                        <Card.Text>
                                            <strong>Heure de départ :</strong> {new Date(flight.heureDepart).toLocaleString().substring(0, 16)}<br />
                                            <strong>Heure d'arrivée :</strong> {new Date(flight.heureArrivee).toLocaleString().substring(0, 16)}<br />
                                            <strong><div style={{ color: 'red' }}>{flight.prixVol} DT</div></strong>
                                        </Card.Text>
                                        <Button variant="primary" onClick={() => handleReserveClick(flight)}>
                                            Réserver <FaPlane style={{ marginLeft: '8px' }} />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Aucun vol disponible.</p>
                    )}
                </Row>
            </div>
        </>
    );
};

export default Results;
