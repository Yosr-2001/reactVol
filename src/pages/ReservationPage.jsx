// src/pages/ReservationPage.js
import React from 'react';

const ReservationPage = ({ data }) => {
  return (
    <div>
      <h3>Liste des Réservations</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID Passager</th>
            <th>ID Vol</th>
            <th>Date Réservation</th>
            <th>Statut</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {data.map((reservation) => (
            <tr key={reservation.idReservation}>
              <td>{reservation.idReservation}</td>
              <td>{reservation.idPassager}</td>
              <td>{reservation.idVol}</td>
              <td>{reservation.dateReservation}</td>
              <td>{reservation.statutReservation}</td>
              <td>{reservation.prixReservationTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationPage;