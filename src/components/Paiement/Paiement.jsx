import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import { FaCreditCard, FaTicketAlt, FaTimesCircle } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import '../../main.scss'
const Paiement = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [validated, setValidated] = useState(false);



    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
                alert("Payment successful! Your ticket has been confirmed.");
                navigate("/ticket");
            }, 2000);
        }

        setValidated(true);
    };

    const handleViewTicket = () => {
        navigate("/ticket", {
            state: {
                passenger: formData,
                flight: selectedFlight
            }
        })
    };

    return (<>
        <Navbar />
        <div className="payment-page-background">
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={8}>
                        <Card className="payment-card shadow-lg border-0">
                            <Card.Body>
                                <h2 className="text-center mb-4 text-dark fw-bold">
                                    Secure Payment
                                </h2>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="cardName" className="mb-3">
                                        <Form.Label>Cardholder Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name on card"
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter the cardholder's name.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="cardNumber" className="mb-3">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="1234 5678 9012 3456"
                                            required
                                            pattern="^[0-9]{16}$"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            The card number must be 16 digits.
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group controlId="expiryDate" className="mb-3">
                                                <Form.Label>Expiry Date</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    required
                                                    pattern="^(0[1-9]|1[0-2])\/[0-9]{2}$"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Enter a valid expiry date (MM/YY).
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group controlId="cvv" className="mb-3">
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="123"
                                                    required
                                                    pattern="^[0-9]{3}$"
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    The CVV must be exactly 3 digits.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <div className="d-flex justify-content-around mt-4">

                                        <Button
                                            variant="outline-secondary"
                                            onClick={handleViewTicket}
                                            className="d-flex align-items-center"
                                        >
                                            <FaTicketAlt className="me-2" /> View Ticket
                                        </Button><br />
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
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <FaCreditCard className="me-2" /> Pay Now
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div></>
    );
};

export default Paiement;
