import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Paiement = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { flight, passengerData } = location.state;

    const [paymentData, setPaymentData] = useState({
        cardName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handlePayment = async () => {
        const reservationData = {
            idPassager: passengerData.passport,
            idVol: flight.idVol,
            nbrePassagers: 1,
            typeClasse: "Economy",
            prixReservationTotal: flight.prixVol,
            statutReservation: "Reservation_confirmee",
        };

        try {
            const response = await fetch("http://localhost:5235/api/reservation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(reservationData),
            });

            if (response.ok) {
                const reservation = await response.json();
                alert("Reservation successful!");
                navigate("/reservation-details", { state: { reservation } });
            } else {
                alert("Error in reservation");
            }
        } catch (error) {
            console.error("Payment error:", error);
        }
    };

    return (
        <div className="container">
            <h2>Payment Form</h2>
            <form>
                <div className="form-group">
                    <label>Card Name</label>
                    <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>CVV</label>
                    <input
                        type="password"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="button" onClick={handlePayment} className="btn btn-success mt-3">
                    Pay and Confirm
                </button>
            </form>
        </div>
    );
};

export default Paiement;
