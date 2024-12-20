import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import { FaGooglePay } from "react-icons/fa";
import { apiRequest } from "../../utils/api";

const PassengerForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const flight = location.state?.selectedFlight || {};
    const [prixTotal, setPrixTotal] = useState(0);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        nomPassager: "",
        prenomPassager: "",
        emailPassager: "",
        dateNaissance: "",
        telephonePassager: "",
        numeroPasseport: "",
        classType: "Economy"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculPrixReservationTotal = (prixVolBrut, classType, nbPassagers = 1) => {
        const multiplier = classType === "Business" ? 2.0 : classType === "Premium" ? 1.5 : 1.0;
        return prixVolBrut * multiplier * nbPassagers;
    };

    useEffect(() => {
        const total = calculPrixReservationTotal(flight.prixVol, formData.classType, 1);
        setPrixTotal(total);
    }, [formData.classType, flight.prixVol]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const passportRegex = /^[A-Z]{1}[0-9]{8}$/;

        if (!passportRegex.test(formData.numeroPasseport)) {
            setError("Le numéro de passeport doit commencer par une lettre majuscule suivie de 8 chiffres (ex: E12345678).");
            return;
        }

        const body = {
            nomPassager: formData.nomPassager,
            prenomPassager: formData.prenomPassager,
            emailPassager: formData.emailPassager,
            dateNaissance: formData.dateNaissance,
            telephonePassager: formData.telephonePassager,
            numeroPasseport: formData.numeroPasseport,
        };

        try {
            const response = await apiRequest("http://localhost:5235/api/Passager", 'POST', body);
            const idPassager = response.idPassager; // Assuming the response contains the idPassager
            console.log("Passager ===> ", response);
            navigate("/paiement", { state: { prixTotal, formData, idPassager, idVol: flight.idVol } });
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Il y a eu un problème lors de la réservation.");
        }
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <h2 className="mb-4">
                    Vol sélectionné : <strong>{flight.aeroportDepart?.villeAeroport} → {flight.aeroportArrivee?.villeAeroport}</strong>
                </h2>
                <Form onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="nomPassager" className="mb-3">
                                <Form.Label>Nom <span style={{ color: 'red' }}>*</span></Form.Label>
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
                                <Form.Label>Prénom <span style={{ color: 'red' }}>*</span></Form.Label>
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

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="emailPassager" className="mb-3">
                                <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="email"
                                    name="emailPassager"
                                    value={formData.emailPassager}
                                    onChange={handleChange}
                                    required
                                    title="L'email doit être sous la forme : exemple@exple.com"
                                    placeholder="Exemple: exemple@exple.com"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="dateNaissance" className="mb-3">
                                <Form.Label>Date de Naissance <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="date"
                                    name="dateNaissance"
                                    value={formData.dateNaissance}
                                    onChange={handleChange}
                                    required
                                    max={new Date().toISOString().split("T")[0]}
                                    title="Veuillez entrer une date de naissance valide."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="telephonePassager" className="mb-3">
                                <Form.Label>Téléphone <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="telephonePassager"
                                    value={formData.telephonePassager}
                                    onChange={handleChange}
                                    required
                                    pattern="^[0-9]{8}$"
                                    title="Le numéro de téléphone doit être composé exactement de 8 chiffres."
                                    placeholder="Exemple: 12345678"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="numeroPasseport" className="mb-3">
                                <Form.Label>Numéro de Passeport <span style={{ color: 'red' }}>*</span></Form.Label>
                                <Form.Control
                                    type="text"
                                    name="numeroPasseport"
                                    value={formData.numeroPasseport}
                                    onChange={handleChange}
                                    placeholder="Ex: E12345678"
                                    pattern="^[A-Z]{1}[0-9]{8}$"
                                    title="Le numéro de passeport doit commencer par une lettre majuscule suivie de 8 chiffres (ex: E12345678)."
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        {/*  <Col md={6}>
                            <Form.Group controlId="classType" className="mb-3">
                                <Form.Label>Classe <span style={{ color: "red" }}>*</span></Form.Label>
                                <Form.Select
                                    name="classType"
                                    value={formData.classType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Economy">Economy</option>
                                    <option value="Premium">Premium</option>
                                    <option value="Business">Business</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <h5 className="mt-5">Prix : <strong style={{ color: 'red' }}>{prixTotal} DT</strong></h5>
                        </Col>*/}
                    </Row>

                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="text-center">
                        <Button variant="primary" type="submit">
                            Valider et Passer au paiement{" "}
                            <FaGooglePay style={{ marginLeft: '10px', height: '30px', width: '30px' }} />
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
};

export default PassengerForm;