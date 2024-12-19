import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";

const TicketPage = () => {
    const location = useLocation();
    const { formData, prixTotal } = location.state || {};  // Recevoir les informations passées via le state

    // S'assurer qu'il y a bien des données disponibles
    if (!formData) {
        return <div>Aucune donnée disponible pour afficher le ticket.</div>;
    }

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Row className="mb-4">
                    <Col>
                        <h2>Confirmation de votre réservation</h2>
                        <p className="lead">Merci d'avoir réservé votre vol avec nous ! Voici les détails de votre réservation.</p>
                    </Col>
                </Row>

                <div className="ticket-container" style={styles.ticketContainer}>
                    <div className="ticket-header" style={styles.ticketHeader}>
                        <h3 style={styles.ticketTitle}>Billet d'Avion</h3>
                    </div>

                    <div className="ticket-info" style={styles.ticketInfo}>
                        <Row>
                            <Col md={6}>
                                <div style={styles.infoRow}>
                                    <strong>Nom :</strong> {formData.nomPassager} {formData.prenomPassager}
                                </div>
                                <div style={styles.infoRow}>
                                    <strong>Numéro de Passeport :</strong> {formData.numeroPasseport}
                                </div>
                                <div style={styles.infoRow}>
                                    <strong>Date de Naissance :</strong> {formData.dateNaissance}
                                </div>
                                <div style={styles.infoRow}>
                                    <strong>Classe :</strong> {formData.classType}
                                </div>
                            </Col>
                            <Col md={6}>
                                <div style={styles.infoRow}>
                                    <strong>Email :</strong> {formData.emailPassager}
                                </div>
                                <div style={styles.infoRow}>
                                    <strong>Téléphone :</strong> {formData.telephonePassager}
                                </div>
                                <div style={styles.infoRow}>
                                    <strong>Prix Total :</strong> {prixTotal} €
                                </div>
                                <div style={styles.infoRow}>
                                    <strong>Vol :</strong> {location.state?.selectedFlight?.aeroportDepart?.villeAeroport} → {location.state?.selectedFlight?.aeroportArrivee?.villeAeroport}
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div className="ticket-footer" style={styles.ticketFooter}>
                        <Button variant="primary" href="/view-ticket" style={{ marginRight: "10px" }}>
                            Voir le Ticket
                        </Button>
                        <Button variant="danger" href="/cancel" >
                            Annuler la Réservation
                        </Button>
                    </div>
                </div>
            </Container>
        </>
    );
};

const styles = {
    ticketContainer: {
        border: "2px solid #000",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#f7f7f7",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
    },
    ticketHeader: {
        textAlign: "center",
        marginBottom: "20px"
    },
    ticketTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333"
    },
    ticketInfo: {
        fontSize: "16px",
        marginBottom: "20px"
    },
    infoRow: {
        marginBottom: "10px",
        fontWeight: "500"
    },
    ticketFooter: {
        textAlign: "center",
        marginTop: "20px"
    }
};

export default TicketPage;
