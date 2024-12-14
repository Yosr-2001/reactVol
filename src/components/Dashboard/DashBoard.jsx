import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap'; // Importation de Bootstrap
import { FaPlane, FaAirbnb, FaBuilding, FaUser } from 'react-icons/fa'; // Icônes FontAwesome pour les nouveaux liens
import './Dashboard.css'; // Importation du fichier CSS pour les styles personnalisés

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-nav">
          <li><a href="#planes"><FaPlane /> Avions</a></li>
          <li><a href="#flights"><FaAirbnb /> Vols</a></li>
          <li><a href="#airports"><FaBuilding /> Aéroports</a></li>
          <li><a href="#passengers"><FaUser /> Passagers</a></li>
        </ul>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Navbar */}
        <Navbar bg="transparent" variant="dark" expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand href="#home">Dashboard</Navbar.Brand> {/* "Dashboard" en gras et à gauche */}
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Accueil</Nav.Link>
                <Nav.Link href="#signin">Sign in </Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Contenu du Dashboard */}
        <div className="container mt-5">
          <p>Bienvenue sur votre tableau de bord.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
