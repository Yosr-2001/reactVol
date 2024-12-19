import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { getAvions, getAeroports, getVols, getReservations, getPassagers, getOffres } from '../Api/Api';
import AvionPage from '../pages/AvionPage';
import AeroportPage from '../pages/AeroportPage';
import VolPage from '../pages/VolPage';
import ReservationPage from '../pages/ReservationPage';
import PassagerPage from '../pages/PassagerPage';
import OffrePage from '../pages/OffrePage';
import HomePage from '../pages/HomePage';
import './Dashboard/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (activeSection !== 'home') {
      fetchData(activeSection);
    }
  }, [activeSection]);

  const fetchData = async (section) => {
    setLoading(true);
    setError('');
    try {
      let response;
      switch (section) {
        case 'avions':
          response = await getAvions();
          break;
        case 'aeroports':
          response = await getAeroports();
          break;
        case 'vols':
          response = await getVols();
          break;
        case 'reservations':
          response = await getReservations();
          break;
        case 'passagers':
          response = await getPassagers();
          break;
        case 'offres':
          response = await getOffres();
          break;
        default:
          response = { data: [] };
      }
      setData(response.data);
    } catch (error) {
      setError('Erreur lors du chargement des données');
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
    if (section !== 'home') {
      fetchData(section);
    }
  };
  const handleLogout = () => {
    sessionStorage.clear();
    console.log("session storage contains :", sessionStorage)
    navigate('/sign-in');

  };
  return (
    <div className="dashboard">
      <nav className="custom-navbar">
        <div className="navbar-brand">Dashboard</div>
        <ul className="nav-links">
          <li><a href="#home" onClick={() => handleMenuClick('home')}>Accueil</a></li>
          <li><a href="#logout" onClick={() => handleLogout()}>Déconnexion</a></li>
        </ul>
      </nav>
      <Sidebar onMenuClick={handleMenuClick} />
      {<div className="main-content">
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && (
          <>
            {activeSection === 'home' && <HomePage />}
            {activeSection === 'avions' && <AvionPage data={data} refreshData={() => fetchData('avions')} />}
            {activeSection === 'aeroports' && <AeroportPage data={data} refreshData={() => fetchData('aeroports')} />}
            {activeSection === 'vols' && <VolPage data={data} refreshData={() => fetchData('vols')} />}
            {activeSection === 'reservations' && <ReservationPage data={data} />}
            {activeSection === 'passagers' && <PassagerPage data={data} />}
            {activeSection === 'offres' && <OffrePage data={data} refreshData={() => fetchData('offres')} />}
          </>
        )}
      </div>}
    </div >
  );
};

export default Dash;