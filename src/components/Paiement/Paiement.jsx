import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";


const Paiement = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log("Location State in Paiement:", location.state);

    const { formData, idPassager, vol } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [prixTotal, setPrixTotal] = useState(0);
    const [classType, setClassType] = useState("Economy");

    const calculPrixReservationTotal = (prix, classType) => {
        const multiplier = classType === "Business" ? 2.0 : classType === "Premium" ? 1.5 : 1.0;
        return prix ? prix * multiplier : 0;
    };

    useEffect(() => {
        if (vol && vol.prix) {
            const total = calculPrixReservationTotal(vol.prix, classType);
            setPrixTotal(total);
        }
    }, [vol, classType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData || !vol || !idPassager) {
            setError("Les données de vol ou passager sont manquantes.");
            setLoading(false);
            return;
        }

        const reservationBody = {
            idPassager,
            idVol: vol.id,
            passager: {
                idPassager,
                nomPassager: formData.nomPassager,
                prenomPassager: formData.prenomPassager,
                emailPassager: formData.emailPassager,
                dateNaissance: formData.dateNaissance,
                telephonePassager: formData.telephonePassager,
                numeroPasseport: formData.numeroPasseport,
            },
            vol,
            dateReservation: new Date().toISOString(),
            statutReservation: "Confirmed",
            typeClasse: classType,
            prixReservationTotal: prixTotal,
        };

        console.log("Reservation Body:", reservationBody); // Debug log

        try {
            const response = await fetch('http://127.0.0.1:8000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationBody),
            });

            if (!response.ok) {
                const errorDetails = await response.json(); // Handle the error response from the backend
                setError(`Erreur: ${errorDetails.message || 'Détails de l\'erreur non fournis'}`);
                setLoading(false);
                console.log('Error response:', errorDetails); // Log error details for debugging
            } else {
                const data = await response.json();
                setLoading(false);
                alert("Réservation réussie !");
                navigate("/ticket", {
                    state: { reservation: data },
                });
            }
        } catch (err) {
            setError("Erreur lors de la création de la réservation.");
            setLoading(false);
            console.error('Request failed', err); // Log the error for further debugging
        }
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <h2 className="text-center mb-4">Confirmation de Réservation</h2>
                                <Form onSubmit={handleSubmit}>
                                    {/* Displaying flight and passenger info */}
                                    <Form.Group controlId="numeroPasseport" className="mb-3">
                                        <Form.Label>Numéro de Passeport</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formData?.numeroPasseport || "Non renseigné"}
                                            readOnly
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="volDetails" className="mb-3">
                                        <Form.Label>Vol sélectionné</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={`${vol?.aeroport_depart?.ville_aeroport} → ${vol?.aeroport_arrivee?.ville_aeroport}`}
                                            readOnly
                                        />
                                    </Form.Group>

                                    {/* Check the status of the selected flight */}
                                    <Form.Group controlId="prix" className="mb-3">
                                        <Form.Label>Prix du Vol Brut</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={vol?.prix ? `${vol?.prix} €` : "Non renseigné"}
                                            readOnly
                                        />
                                    </Form.Group>

                                    {/* Display class and price */}
                                    <Form.Group controlId="classType" className="mb-3">
                                        <Form.Label>Classe</Form.Label>
                                        <Form.Select
                                            value={classType}
                                            onChange={(e) => setClassType(e.target.value)}
                                        >
                                            <option value="Economy">Économique</option>
                                            <option value="Premium">Premium</option>
                                            <option value="Business">Affaires</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId="prixTotal" className="mb-3">
                                        <Form.Label>Prix Total</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={prixTotal ? `${prixTotal} €` : "Calcul en cours..."}
                                            readOnly
                                        />
                                    </Form.Group>

                                    {error && <p className="text-danger">{error}</p>}

                                    <div className="text-center">
                                        <Button type="submit" variant="primary" disabled={loading}>
                                            {loading ? (
                                                <>
                                                    <Spinner animation="border" size="sm" /> Traitement...
                                                </>
                                            ) : (
                                                "Confirmer la Réservation"
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Paiement;
