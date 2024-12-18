import React, { useEffect, useState } from 'react';
import { Table, Badge, Pagination, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { FaPlaneDeparture, FaPlaneArrival, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Flight-related icons
import Navbar from '../Navbar/Navbar';

const HistoriqueReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Adjust per page as needed
    const userEmail = sessionStorage.getItem('email');
    const [sortConfig, setSortConfig] = useState({ key: 'dateReservation', direction: 'asc' });

    useEffect(() => {
        const fetchReservations = async () => {
<<<<<<< HEAD
            if (!userEmail) {
                setError("Email utilisateur manquant.");
                setLoading(false);
                return;
            }
=======
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
>>>>>>> 5ed2644d6dd2c354588f089575d1a1b79af000de

            try {
                const response = await fetch(`http://localhost:5235/api/reservation/historique/email/${userEmail}`);
                if (response.ok) {
                    const data = await response.json();
                    setReservations(data);
                } else {
                    const errorMessage = await response.text();
                    setError(errorMessage || "Une erreur s'est produite.");
                    setReservations([]);
                }
            } catch (error) {
                setError("Une erreur inattendue s'est produite.");
                setReservations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [userEmail]);

    const getEtat = (dateDepart, dateFin) => {
        const currentDate = new Date();
        const departureDate = new Date(dateDepart);
        const endDate = new Date(dateFin);

        if (departureDate > currentDate) {
            return 'Réservation à venir'; // Upcoming reservation
        } else if (endDate > currentDate) {
            return 'Réservation en cours'; // Ongoing reservation
        } else {
            return 'Fait déjà'; // Past reservation
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Réservation à venir':
                return <Badge variant="warning"><FaClock /> {status}</Badge>;
            case 'Réservation en cours':
                return <Badge variant="success"><FaCheckCircle /> {status}</Badge>;
            case 'Fait déjà':
                return <Badge variant="danger"><FaTimesCircle /> {status}</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedReservations = [...reservations].sort((a, b) => {
        if (sortConfig.direction === 'asc') {
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
        } else {
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
        }
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedReservations.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p>Chargement...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <h2>Historique des Réservations</h2>
                {reservations.length === 0 ? (
                    <p>Aucune réservation trouvée.</p>
                ) : (
                    <>
                        <Table striped bordered hover responsive className="table-sm">
                            <thead className="thead-dark">
                                <tr>
                                    <th onClick={() => handleSort('vol')}>Vol</th>
                                    <th onClick={() => handleSort('dateReservation')}>Date de Réservation</th>
                                    <th onClick={() => handleSort('prixReservationTotal')}>Prix Total</th>
                                    <th>Classe</th>
                                    <th>Statut</th>
                                    <th>Vol: Départ</th>
                                    <th>Vol: Arrivée</th>

                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((reservation, index) => (
                                    <tr key={reservation.idReservation}>
                                        <td>{reservation.vol[0]}</td>
                                        <td>{new Date(reservation.dateReservation).toLocaleDateString()}</td>
                                        <td>{reservation.prixReservationTotal.toFixed(2)} DT</td>
                                        <td>{reservation.typeClasse}</td>
                                        <td>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={<Tooltip id="tooltip">{reservation.statutReservation}</Tooltip>}
                                            >
                                                <span>{getStatusBadge(getEtat(reservation.dateDepart, reservation.dateFin))}</span>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <span><FaPlaneDeparture /> {new Date(reservation.dateDepart).toLocaleString()}</span>
                                        </td>
                                        <td>
                                            <span><FaPlaneArrival /> {new Date(reservation.dateFin).toLocaleString()}</span>
                                        </td>
                                        <td>{getEtat(reservation.dateDepart, reservation.dateFin)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        {/* Pagination */}
                        <Pagination>
                            {Array.from({ length: Math.ceil(reservations.length / itemsPerPage) }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </>
                )}
            </div>
        </>
    );
};

export default HistoriqueReservations;
