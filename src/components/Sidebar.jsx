// src/components/Sidebar.js
import React from 'react';
import { FaPlane, FaBuilding, FaAirbnb, FaTicketAlt, FaUser, FaTags } from 'react-icons/fa';
import './Dashboard/Dashboard.css';

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Menu</h2>
      <ul className="sidebar-nav">
        <li>
          <a href="#" onClick={() => onMenuClick('avions')}>
            <FaPlane /> Avions
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick('aeroports')}>
            <FaBuilding /> Aéroports
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick('vols')}>
            <FaAirbnb /> Vols
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick('reservations')}>
            <FaTicketAlt /> Réservations
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick('passagers')}>
            <FaUser /> Passagers
          </a>
        </li>
        <li>
          <a href="#" onClick={() => onMenuClick('offres')}>
            <FaTags /> Offres
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
