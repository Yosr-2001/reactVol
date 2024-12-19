import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Card } from 'react-bootstrap';
import { FaPlaneDeparture, FaPlaneArrival, FaMapMarkerAlt } from 'react-icons/fa';
import { GiAirplaneDeparture, GiAirplaneArrival } from 'react-icons/gi';
import { IoMdBusiness, IoIosFiling } from 'react-icons/io';
import moment from 'moment';
import Navbar from '../Navbar/Navbar';

const HistoriqueReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const userEmail = sessionStorage.getItem('email');
    const [sortConfig, setSortConfig] = useState({ key: 'dateReservation', direction: 'asc' });

    useEffect(() => {
        const fetchReservations = async () => {
            if (!userEmail) {
                setError("Email utilisateur manquant.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5235/api/reservation/historique/email/${userEmail}`);
                if (response.ok) {
                    const data = await response.json();
                    setReservations(data);
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
                                    <th onClick={() => handleSort('dateReservation')} style={{ cursor: 'pointer' }}>Date Réservation</th>
                                    <th>Ville Départ</th>
                                    <th>Ville Arrivée</th>
                                    <th onClick={() => handleSort('prixReservationTotal')} style={{ cursor: 'pointer' }}>Prix </th>
                                    <th>Classe</th>
                                    <th>Départ</th>
                                    <th>Arrivée</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((reservation) => (
                                    <tr key={reservation.idReservation} className="hover-row">
                                        <td>{reservation.vol.numeroVol}</td>
                                        <td>{moment(reservation.dateReservation).format('DD/MM/YYYY')}</td>
                                        <td>
                                            <span><FaMapMarkerAlt /> {reservation.vol.aeroportDepart.villeAeroport}</span>
                                        </td>
                                        <td>
                                            <span><FaMapMarkerAlt /> {reservation.vol.aeroportArrivee.villeAeroport}</span>
                                        </td>
                                        <td>{reservation.prixReservationTotal.toFixed(2)} DT</td>
                                        <td>
                                            {reservation.typeClasse === 'Economique' && <GiAirplaneDeparture />}
                                            {reservation.typeClasse === 'Affaires' && <IoMdBusiness />}
                                            {reservation.typeClasse === 'Première' && <IoIosFiling />}
                                            {reservation.typeClasse}
                                        </td>
                                        <td><FaPlaneDeparture /> {moment(reservation.dateDepart).format('DD/MM/YYYY HH:mm')}</td>
                                        <td><FaPlaneArrival /> {moment(reservation.dateFin).format('DD/MM/YYYY HH:mm')}</td>
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
