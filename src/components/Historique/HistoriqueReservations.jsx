import React, { useEffect, useState } from 'react';
import { Table, Spinner, Card } from 'react-bootstrap';
import { FaPlaneDeparture, FaPlaneArrival, FaMapMarkerAlt } from 'react-icons/fa';
import { GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import { IoMdBusiness, IoIosFiling } from 'react-icons/io';
import moment from 'moment';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';  // Ensure axios is imported

const HistoriqueReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // Fixing the email to "john.smith@example.com"
    const userEmail = 'alice.dupont@example.com';

    const [sortConfig, setSortConfig] = useState({ key: 'dateReservation', direction: 'asc' });

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/historique-reservations/${userEmail}`);
                console.log("Historique des réservations:", response.data);
                if (response.data && response.data.length > 0) {
                    setReservations(response.data);
                } else {
                    setError("Aucune réservation trouvée.");
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedReservations.slice(indexOfFirstItem, indexOfLastItem);

    if (loading) return <div className="text-center"><Spinner animation="border" variant="primary" /></div>;
    if (error) return <p className="text-center">{error}</p>;

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <Card className="mb-4">
                    <Card.Body>
                        <h2 className="text-center" style={{ fontWeight: '600', color: '#333' }}>Historique des Réservations</h2>
                    </Card.Body>
                </Card>

                {reservations.length === 0 ? (
                    <div className="text-center mb-4">
                        <p>Aucune réservation jusqu'à présent</p>
                    </div>
                ) : (
                    <>
                        <Table striped bordered hover responsive className="table-sm table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th onClick={() => handleSort('vol')} style={{ cursor: 'pointer' }}>Vol</th>
                                    <th onClick={() => handleSort('date_reservation')} style={{ cursor: 'pointer' }}>Date Réservation</th>
                                    <th>Ville Départ</th>
                                    <th>Ville Arrivée</th>
                                    <th onClick={() => handleSort('prix_reservation')} style={{ cursor: 'pointer' }}>Prix</th>

                                    <th>Départ</th>
                                    <th>Arrivée</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((reservation) => (
                                    <tr key={reservation.id} className="hover-row">
                                        <td>{reservation.vol.numero_vol}</td>
                                        <td>{moment(reservation.date_reservation).format('DD/MM/YYYY')}</td>
                                        <td>
                                            {reservation.vol?.aeroport_depart?.ville_aeroport ? (
                                                <span><FaMapMarkerAlt /> {reservation.vol.aeroport_depart.ville_aeroport}</span>
                                            ) : (
                                                <span><FaMapMarkerAlt /> N/A</span>
                                            )}
                                        </td>
                                        <td>
                                            {reservation.vol?.aeroport_arrivee?.ville_aeroport ? (
                                                <span><FaMapMarkerAlt /> {reservation.vol.aeroport_arrivee.ville_aeroport}</span>
                                            ) : (
                                                <span><FaMapMarkerAlt /> N/A</span>
                                            )}
                                        </td>
                                        <td>{parseFloat(reservation.prix_reservation).toFixed(2)} DT</td>

                                        <td><FaPlaneDeparture /> {moment(reservation.vol.heure_depart).format('DD/MM/YYYY HH:mm')}</td>
                                        <td><FaPlaneArrival /> {moment(reservation.vol.heure_arrivee).format('DD/MM/YYYY HH:mm')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </>
    );
};

export default HistoriqueReservations;