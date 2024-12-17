import React from 'react'
import { useState } from 'react';

const HistoriqueReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = localStorage.getItem('userId');  

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const userId = sessionStorage.getItem('userId');
                if (!userId) {
                  setError('User ID not found.');
                  return;
                }
                
                const data = await apiRequest(`/api/reservation/historique/${userId}`, 'GET');
                setReservations(data); // Store the reservations data
              } catch (err) {
                setError('Error fetching reservation history');
                console.error(err);
              } finally {
                setLoading(false);
              }
            };
        
            fetchReservations();
          }, []);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{error}</p>;
        
    return (
        <div>
            <h2>Your Reservation History</h2>
            {reservations.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Reservation ID</th>
                            <th>Flight Number</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((reservation) => (
                            <tr key={reservation.idReservation}>
                                <td>{reservation.idReservation}</td>
                                <td>{reservation.vol.numeroVol}</td>
                                <td>{new Date(reservation.dateReservation).toLocaleDateString()}</td>
                                <td>{reservation.statutReservation}</td>
                                <td>{reservation.prixReservationTotal} €</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No reservations found</p>
            )}
        </div>
    );
}

export default HistoriqueReservations
