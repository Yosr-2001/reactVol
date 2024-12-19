import React, { useEffect, useState } from 'react';
import { getAvions, getAeroports, getVols, getReservations, getPassagers, getOffres } from '../Api/Api';
import './HomePage.css';

const HomePage = () => {
  const [stats, setStats] = useState({
    avions: 0,
    aeroports: 0,
    vols: 0,
    reservations: 0,
    passagers: 0,
    offres: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [avions, aeroports, vols, reservations, passagers, offres] = await Promise.all([
          getAvions(),
          getAeroports(),
          getVols(),
          getReservations(),
          getPassagers(),
          getOffres(),
        ]);

        setStats({
          avions: avions.data.length,
          aeroports: aeroports.data.length,
          vols: vols.data.length,
          reservations: reservations.data.length,
          passagers: passagers.data.length,
          offres: offres.data.length,
        });
      } catch (error) {
        setError('Erreur lors du chargement des statistiques');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Chargement des statistiques...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="home-page">
      <h1>Bienvenue sur le Dashboard de Gestion des Vols</h1>
      <p>Utilisez le menu de gauche pour naviguer entre les différentes sections.</p>
      <div className="stats-section">
        <h2>Statistiques</h2>
        <div className="stats-cards">
          <div className="stats-card">
            <h3>Avions</h3>
            <p>{stats.avions}</p>
          </div>
          <div className="stats-card">
            <h3>Aéroports</h3>
            <p>{stats.aeroports}</p>
          </div>
          <div className="stats-card">
            <h3>Vols</h3>
            <p>{stats.vols}</p>
          </div>
          <div className="stats-card">
            <h3>Réservations</h3>
            <p>{stats.reservations}</p>
          </div>
          <div className="stats-card">
            <h3>Passagers</h3>
            <p>{stats.passagers}</p>
          </div>
          <div className="stats-card">
            <h3>Offres</h3>
            <p>{stats.offres}</p>
          </div>
        </div>
      </div>
    
    </div>
  );
};

export default HomePage;