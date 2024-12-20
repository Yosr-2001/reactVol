import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { FaTicketAlt } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import { createReservation, getVols } from "../../Api/Api";
import '../../main.scss';

const Paiement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { formData, idPassager } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState(null);
    const [vols, setVols] = useState([]);
    const [selectedVol, setSelectedVol] = useState(null);
    const [prixTotal, setPrixTotal] = useState(0);
    const [classType, setClassType] = useState(formData.classType || "Economy");

    // Fonction pour calculer le prix total de la réservation
    const calculPrixReservationTotal = (prixVolBrut, classType, nbPassagers = 1) => {
        if (typeof prixVolBrut !== 'number' || isNaN(prixVolBrut)) {
            console.error("Prix brut invalide:", prixVolBrut);
            return 0;
        }

        const multiplier = classType === "Business" ? 2.0 : classType === "Premium" ? 1.5 : 1.0;
        return prixVolBrut * multiplier * nbPassagers;
    };

    // Récupérer la liste des vols
    useEffect(() => {
        const fetchVols = async () => {
            try {
                const response = await getVols();
                console.log("Réponse de l'API pour les vols:", response);
                setVols(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des vols :", error);
                setError("Erreur lors de la récupération des vols.");
            }
        };

        fetchVols();
    }, []);

    // Calculer le prix total lorsqu'un vol ou la classe change
    useEffect(() => {
        if (selectedVol) {
            const total = calculPrixReservationTotal(selectedVol.prixVolBrut, classType, 1);
            console.log("Prix total calculé:", total);
            setPrixTotal(total);
        }
    }, [selectedVol, classType]);

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setLoading(true);
            setError(null);

            const reservationBody = {
                idPassager,
                passager: {
                    idPassager,
                    nomPassager: formData.nomPassager,
                    prenomPassager: formData.prenomPassager,
                    emailPassager: formData.emailPassager,
                    dateNaissance: formData.dateNaissance,
                    telephonePassager: formData.telephonePassager,
                    numeroPasseport: formData.numeroPasseport
                },
                idVol: selectedVol.idVol,
                vol: selectedVol,
                dateReservation: new Date().toISOString(),
                statutReservation: "Confirmed",
                nbrePassagers: 1,
                typeClasse: classType,
                prixReservationTotal: prixTotal
            };

            try {
                const response = await createReservation(reservationBody);
                console.log("Reservation ===> ", response);

                setLoading(false);
                alert("Réservation réussie ! Votre billet a été confirmé.");
                navigate("/ticket", {
                    state: {
                        passenger: formData,
                        flight: { idVol: selectedVol.idVol },
                        reservation: response
                    }
                });
            } catch (err) {
                setLoading(false);
                // setError("Erreur lors de la création de la réservation.");
            }
        }

        setValidated(true);
    };

    // Voir le billet
    const handleViewTicket = () => {
        navigate("/ticket", {
            state: {
                passenger: formData,
                flight: { idVol: selectedVol?.idVol }
            }
        });
    };

    return (
        <>
            <Navbar />
            <div className="reservation-page-background">
                <Container className="mt-5">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Card className="reservation-card shadow-lg border-0">
                                <Card.Body>
                                    <h2 className="text-center mb-4 text-dark fw-bold">
                                        Confirmer la Réservation
                                    </h2>
                                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="idPassager" className="mb-3">
                                                    <Form.Label>ID Passager</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="ID Passager"
                                                        required
                                                        value={idPassager}
                                                        readOnly
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez entrer un ID Passager valide.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="idVol" className="mb-3">
                                                    <Form.Label>Vol</Form.Label>
                                                    <Form.Select
                                                        required
                                                        onChange={(e) => setSelectedVol(vols.find(vol => vol.idVol === parseInt(e.target.value)))}
                                                    >
                                                        <option value="">Sélectionnez un vol</option>
                                                        {vols.map(vol => (
                                                            <option key={vol.idVol} value={vol.idVol}>
                                                                {vol.aeroportDepart.villeAeroport} à {vol.aeroportArrivee.villeAeroport}
                                                            </option>
                                                        ))}
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez sélectionner un vol valide.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="dateReservation" className="mb-3">
                                                    <Form.Label>Date de Réservation</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Date de Réservation"
                                                        required
                                                        value={new Date().toISOString()}
                                                        readOnly
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez entrer une date de réservation valide.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="nbrePassagers" className="mb-3">
                                                    <Form.Label>Nombre de Passagers</Form.Label>
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="1"
                                                        required
                                                        min="1"
                                                        value={1}
                                                        readOnly
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez entrer un nombre valide de passagers.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="typeClasse" className="mb-3">
                                                    <Form.Label>Classe</Form.Label>
                                                    <Form.Select
                                                        value={classType}
                                                        onChange={(e) => setClassType(e.target.value)}  // Met à jour la classe
                                                        required
                                                    >
                                                        <option value="Economy">Economy</option>
                                                        <option value="Premium">Premium</option>
                                                        <option value="Business">Business</option>
                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez sélectionner une classe valide.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                            <Col md={6}>
                                                <Form.Group controlId="statutReservation" className="mb-3">
                                                    <Form.Label>Statut de la Réservation</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Confirmé"
                                                        required
                                                        value="Confirmé"
                                                        readOnly
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez entrer un statut valide.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md={6}>
                                                <Form.Group controlId="prixReservationTotal" className="mb-3">
                                                    {/* <Form.Label>Prix Total de la Réservation</Form.Label> */}
                                                    <Form.Control
                                                        type="number"
                                                        placeholder="Prix Total"
                                                        required
                                                        value={prixTotal}
                                                        readOnly
                                                        hidden
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Veuillez entrer un prix valide.
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        {error && <p style={{ color: 'red' }}>{error}</p>}

                                        <div className="d-flex justify-content-around mt-4">
                                            <Button
                                                variant="outline-secondary"
                                                onClick={handleViewTicket}
                                                className="d-flex align-items-center"
                                            >
                                                <FaTicketAlt className="me-2" /> Voir le Billet
                                            </Button>
                                            <Button
                                                variant="success"
                                                type="submit"
                                                className="d-flex align-items-center"
                                                disabled={loading}
                                            >
                                                {loading ? (
                                                    <>
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                        />{" "}
                                                        Traitement...
                                                    </>
                                                ) : (
                                                    <>Confirmer la Réservation</>
                                                )}
                                            </Button>
                                        </div>
                                    </Form>
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </Container>
            </div>
        </>
    );
};

export default Paiement;