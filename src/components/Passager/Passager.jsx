import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";


const PassengerForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [prixTotal, setPrixTotal] = useState(0);
    const [error, setError] = useState(null);

    const flight = location.state?.selectedFlight || {};
    console.log("Selected Flight:", flight);

    const [formData, setFormData] = useState({
        nomPassager: "",
        prenomPassager: "",
        emailPassager: "",
        dateNaissance: "",
        telephonePassager: "",
        numeroPasseport: "",
        classType: "Economy",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const calculPrixReservationTotal = (prixVolBrut, classType, nbPassagers = 1) => {
        const multiplier = classType === "Business" ? 2.0 : classType === "Premium" ? 1.5 : 1.0;
        return prixVolBrut * multiplier * nbPassagers;
    };

    useEffect(() => {
        if (flight?.prix) {
            const total = calculPrixReservationTotal(flight.prix, formData.classType, 1);
            setPrixTotal(total);
        }
    }, [formData.classType, flight.prix]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const body = {
            NomPassager: formData.nomPassager,
            PrenomPassager: formData.prenomPassager,
            EmailPassager: formData.emailPassager,
            DateNaissance: formData.dateNaissance,
            TelephonePassager: formData.telephonePassager,
            NumeroPasseport: formData.numeroPasseport,
        };

        console.log("Payload envoyé :", body);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/passagers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                console.error("Erreur de réponse API :", errorResponse); // Ajouté pour plus de clarté
                throw new Error('Failed to submit form');
            }

            const data = await response.json();
            const idPassager = data.idPassager;
            const numeroPasseport = data.numeroPasseport
            console.log('Passager saved:', data);

            navigate('/paiement', {
                state: {
                    formData: formData,
                    idPassager: idPassager,
                    vol: flight,
                    numeroPasseport: numeroPasseport
                },
            });
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Il y a eu un problème lors de la réservation.');
        }
    };



    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <h2 className="mb-4">
                    Vol sélectionné : <strong>{flight.aeroport_depart?.
                        ville_aeroport

                    } → {flight.aeroport_arrivee?.
                        ville_aeroport}</strong>
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="nomPassager" className="mb-3">
                                <Form.Label>Nom <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nomPassager"
                                    value={formData.nomPassager}
                                    onChange={handleChange}
                                    required
                                    minLength="2"
                                    maxLength="50"
                                    pattern="^[A-Za-zÀ-ÿ ]+$"
                                    title="Le nom doit contenir uniquement des lettres (accents autorisés) et des espaces."
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="prenomPassager" className="mb-3">
                                <Form.Label>Prénom <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="prenomPassager"
                                    value={formData.prenomPassager}
                                    onChange={handleChange}
                                    required
                                    minLength="2"
                                    maxLength="50"
                                    pattern="^[A-Za-zÀ-ÿ ]+$"
                                    title="Le prénom doit contenir uniquement des lettres (accents autorisés) et des espaces."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Contact Details */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="emailPassager" className="mb-3">
                                <Form.Label>Email <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    name="emailPassager"
                                    value={formData.emailPassager}
                                    onChange={handleChange}
                                    required
                                    placeholder="Exemple: exemple@exple.com"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="dateNaissance" className="mb-3">
                                <Form.Label>Date de Naissance <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateNaissance"
                                    value={formData.dateNaissance}
                                    onChange={handleChange}
                                    required
                                    max={new Date().toISOString().split("T")[0]}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="telephonePassager" className="mb-3">
                                <Form.Label>Téléphone <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telephonePassager"
                                    value={formData.telephonePassager}
                                    onChange={handleChange}
                                    required
                                    pattern="^[0-9]{8}$"
                                    placeholder="Exemple: 12345678"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="numeroPasseport" className="mb-3">
                                <Form.Label>Numéro de Passeport <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numeroPasseport"
                                    value={formData.numeroPasseport}
                                    onChange={handleChange}
                                    required
                                    placeholder="Ex: E12345678"
                                    pattern="^[A-Z]{1}[0-9]{8}$"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Valider

                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default PassengerForm;
