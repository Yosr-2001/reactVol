import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiRequest } from '../../utils/api';
import Navbar from '../Navbar/Navbar';
import { Button } from 'react-bootstrap';

const PaymentForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { formData, selectedFlight } = location.state || {};
    console.log('formData:', formData);
    console.log('selectedFlight:', selectedFlight);
    console.log('selectedFlight.prix:', selectedFlight.prixVol);

    if (!formData || !selectedFlight) {
        return <div>Error: Les informations de passager ou de vol sont manquantes.</div>;
    }
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);

    if (!formData || !selectedFlight) {
        console.log('formData', formData);
        console.log('selectedFlight', selectedFlight);
        console.log('Prix Vol:', selectedFlight.prixVol);

        return <div>Error: Les informations de passager ou de vol sont manquantes.</div>;
    }
    const prixVol = selectedFlight.prixVol;
    const nbrePassagers = formData.nbrePassagers || 1;

    if (isNaN(prixVol) || isNaN(nbrePassagers)) {
        return <div>Error: Le prix du vol ou le nombre de passagers est invalide.</div>;
    }
    const prixTotal = prixVol * nbrePassagers;
    const reservationData = {
        IdPassager: formData.idPassager,
        IdVol: selectedFlight.idVol,
        TypeClasse: formData.typeClasse || 'Economy',
        NbrePassagers: nbrePassagers || 1,
        DateReservation: new Date().toISOString(),
        StatutReservation: 'Reservation_confirmee',
        PrixReservationTotal: prixTotal,
        // idAeroportDepart: selectedFlight.idAeroportDepart,
        // idAeroportArrivee: selectedFlight.idAeroportArrivee,
    };

    const handlePayment = async () => {
        try {
            const response = await apiRequest('http://localhost:5235/api/reservation', 'POST', reservationData);
            setPaymentStatus('Paiement réussi!');
            console.log('Données envoyées au backend :', reservationData);

            navigate('/home', { state: { reservation: response.data } });
        } catch (error) {
            console.error('Erreur lors de la réservation:', error);
            setError(error?.response?.data?.message || 'Une erreur est survenue.');
            setPaymentStatus('Échec du paiement.');
        }
    };


    return (
        <div>
            <Navbar />
            <h2>Formulaire de Paiement</h2>
            <div>
                <p><strong>Passager:</strong> {formData.nomPassager} {formData.prenomPassager}</p>
                <p><strong>Email:</strong> {formData.emailPassager}</p>
                <p><strong>Vol sélectionné:</strong> {selectedFlight.numeroVol}</p>
                <p><strong>Prix total:</strong> {reservationData.PrixReservationTotal} €</p>
                <p><strong>Classe:</strong> {reservationData.TypeClasse}</p>
                <p><strong>Nombre de passagers:</strong> {reservationData.NbrePassagers}</p>
            </div>
            <Button onClick={handlePayment}>Payer maintenant</Button>
            {paymentStatus && <p>{paymentStatus}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default PaymentForm;
