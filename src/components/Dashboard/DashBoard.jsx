import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaPlane, FaAirbnb, FaBuilding, FaUser , FaTicketAlt } from 'react-icons/fa';
import './Dashboard.css';
import axios from "axios";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null); // To track the ID of the item being edited
  const [aeroports, setAeroports] = useState([]);
  const [avions, setAvions] = useState([]);


  useEffect(() => { const fetchAeroports = async () => { try { const response = await axios.get('http://localhost:5235/api/Aeroport'); setAeroports(response.data); } catch (error) { console.error("Erreur lors de la récupération des aéroports", error); } }; const fetchAvions = async () => { try { const response = await axios.get('http://localhost:5235/api/Avion'); setAvions(response.data); } catch (error) { console.error("Erreur lors de la récupération des avions", error); } }; fetchAeroports(); fetchAvions(); }, []);



  

  const fetchData = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des données');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (section, url) => {
    setActiveSection(section);
    fetchData(url);
    setShowForm(false);
    setEditingId(null); // Reset editing ID when changing sections
  };

  const handleDelete = async (id) => {
    if (activeSection === 'passengers' || activeSection === 'reservations') {
      alert("Suppression désactivée pour cette section.");
      return;
    }

    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      let url = '';
      switch (activeSection) {
        case 'planes':
          url = `http://localhost:5235/api/Avion/${id}`;
          break;
        case 'airports':
          url = `http://localhost:5235/api/Aeroport/${id}`;
          break;
        case 'flights':
          url = `http://localhost:5235/api/Vol/${id}`;
          break;
        case 'reservations':
          alert("Suppression désactivée pour les réservations.");
          return;
        default:
          throw new Error('Section non prise en charge');
      }

      const response = await fetch(url, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression');
      }

      alert('Suppression effectuée avec succès');
      handleMenuClick(activeSection, `http://localhost:5235/api/${activeSection}`);
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    if (activeSection === 'passengers' || activeSection === 'reservations') {
      alert("Modification désactivée pour cette section.");
      return;
    }

    setEditingId(id);
    setShowForm(true);
    setFormData({}); // Clear form data before fetching

    try {
      let url = '';
      switch (activeSection) {
        case 'planes':
          url = `http://localhost:5235/api/Avion/${id}`;
          break;
        case 'airports':
          url = `http://localhost:5235/api/Aeroport/${id}`;
          break;
        case 'flights':
          url = `http://localhost:5235/api/Vol/${id}`;
          break;
        default:
          throw new Error('Section non prise en charge pour la modification');
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données pour modification');
      }
      const result = await response.json();
      setFormData(result); // Populate form with the fetched data
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    }
  };

  const handleNew = () => {
    if (activeSection === 'passengers' || activeSection === 'reservations') {
      alert("Ajout désactivé pour cette section.");
      return;
    }
    setShowForm(true);
    setFormData({});
 setEditingId(null); // Reset editing ID when creating a new entry
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let url = '';
      let method = 'POST'; // Default to POST for new entries
      if (editingId) {
        method = 'PUT'; // Change to PUT for editing
        switch (activeSection) {
          case 'planes':
            url = `http://localhost:5235/api/Avion/${editingId}`;
            break;
          case 'airports':
            url = `http://localhost:5235/api/Aeroport/${editingId}`;
            break;
          case 'flights':
            url = `http://localhost:5235/api/Vol/${editingId}`;
            break;
          default:
            throw new Error('Modification non prise en charge pour cette section');
        }
      } else {
        switch (activeSection) {
          case 'planes':
            url = 'http://localhost:5235/api/Avion';
            break;
          case 'airports':
            url = 'http://localhost:5235/api/Aeroport';
            break;
          case 'flights':
            url = 'http://localhost:5235/api/Vol';
            break;
          case 'reservations':
            url = 'http://localhost:5235/api/Reservation';
            break;
          default:
            throw new Error('Ajout non pris en charge pour cette section');
        }
      }

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout ou de la modification');
      }

      alert(editingId ? 'Modification effectuée avec succès' : 'Ajout effectué avec succès');
      setShowForm(false);
      handleMenuClick(activeSection, url);
    } catch (err) {
      alert(`Erreur : ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderForm = () => {
    switch (activeSection) {
      case 'planes':
        return (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label>Type d'avion</label>
              <input type="text" name="typeAvion" className="form-control" value={formData.typeAvion || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Capacité</label>
              <input type="number" name="capaciteAvion" className="form-control" value={formData.capaciteAvion || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Fabriquant</label>
              <input type="text" name="fabriquantAvion" className="form-control" value={formData.fabriquantAvion || ''} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Ajout en cours...' : editingId ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        );
      case 'reservations':
        return (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label>ID Passager</label>
              <input type="number" name="idPassager" className="form-control" value={formData.idPassager || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>ID Vol</label>
              <input type="number" name="idVol" className="form-control" value={formData.idVol || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Date de Réservation</label>
              <input type="date" name="dateReservation" className="form-control" value={formData.dateReservation || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Statut</label>
              <input type="text" name="statutReservation" className="form-control" value={formData.statutReservation || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Prix</label>
              <input type="number" name="prixReservation" className="form-control" value={formData.prixReservation || ''} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Ajout en cours...' : editingId ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        );
      case 'flights':
        return (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label>Numéro de Vol</label>
              <input type="text" name="numeroVol" className="form-control" value={formData.numeroVol || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Heure de Départ</label>
              <input type="datetime-local" name="heureDepart" className="form-control" value={formData.heureDepart || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Heure d'Arrivée</label>
              <input type="datetime-local" name="heureArrivee" className="form-control" value={formData.heureArrivee || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Statut</label>
              <input type="text" name="statut" className="form-control" value={formData.statut || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Porte</label>
              <input type="text" name="porte" className="form-control" value={formData.porte || ''} onChange={handleInputChange} required />
            </div>



            <div className="mb-3"> 
<label>Type d'Avion</label> 
<input type="text" name="typeAvion" className="form-control" value={formData.typeAvion || ''} onChange={handleInputChange} required /> 
</div> 
<div className="mb-3"> 
<label> Aéroport Départ</label> 
<select name="idAeroportDepart" className="form-control" value={formData.idAeroportDepart} onChange={handleInputChange} required > 
<option value="">Sélectionnez un aéroport de départ</option> {aeroports.map((aeroport) => ( <option key={aeroport.idAeroport} value={aeroport.idAeroport}> {aeroport.nomAeroport} </option> ))} 

</select> </div> <div className="mb-3"> 
<label> Aéroport Arrivée</label> <select name="idAeroportArrivee" className="form-control" value={formData.idAeroportArrivee} onChange={handleInputChange} required > 
<option value="">Sélectionnez un aéroport d'arrivée</option> {aeroports.map((aeroport) => ( <option key={aeroport.idAeroport} value={aeroport.idAeroport}> {aeroport.nomAeroport} </option> ))} 
</select> </div> 

<div className="mb-3"> 
<label>Avion</label> <select name="idAvion" className="form-control" value={formData.idAvion} onChange={handleInputChange} required > 
<option value="">Sélectionnez un avion</option> {avions.map((avion) => ( <option key={avion.idAvion} value={avion.idAvion}> {avion.typeAvion}
  {avion.typeAvion} </option> ))}
</select> </div>



            <div className="mb-3">
              <label>Nombre Réservé</label>
              <input type="number" name="nbreReservee" className="form-control" value={formData.nbreReservee || ''} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Ajout en cours...' : editingId ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        );
      case 'airports':
        return (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label>Nom de l'Aéroport</label>
              <input type="text" name="nomAeroport" className="form-control" value={formData.nomAeroport || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Ville</label>
              <input type="text" name="villeAeroport" className="form-control" value={formData.villeAeroport || ''} onChange={handleInputChange} required />
            </div>
            <div className="mb-3">
              <label>Pays</label>
              <input type="text" name="paysAeroport" className="form-control" value={formData.paysAeroport || ''} onChange={handleInputChange} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Ajout en cours...' : editingId ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        );

      default:
        return <p>Sélectionnez une section pour ajouter un élément.</p>;
    }
  };

  return (
    <div className="d-flex">
      <div className="sidebar">
        <h2 className="sidebar-title">Menu</h2>
        <ul className="sidebar-nav">
          <li>
            <a href="#planes" onClick={() => handleMenuClick('planes', 'http://localhost:5235/api/Avion')}>
              <FaPlane /> Avions
            </a>
          </li>
          <li>
            <a href="#airports" onClick={() => handleMenuClick('airports', 'http://localhost:5235/api/Aeroport')}>
              <FaBuilding /> Aéroports
            </a>
          </li>
          <li>
            <a href="#flights" onClick={() => handleMenuClick('flights', 'http://localhost:5235/api/Vol')}>
              <FaAirbnb /> Vols
            </a>
          </li>
          <li>
            <a href="#passengers" onClick={() => handleMenuClick('passengers', 'http://localhost:5235/api/Passager')}>
              <FaUser  /> Passagers
            </a>
          </li>
          <li>
            <a href="#reservations" onClick={() => handleMenuClick('reservations', 'http://localhost:5235/api/Reservation')}>
              <FaTicketAlt /> Réservations
            </a>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <Navbar bg="transparent" variant="dark" expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="#home">Accueil</Nav.Link>
                <Nav.Link href="#signin">Sign in</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-5">
          <button  className="btn btn-success mb-3" class="btn-new" onClick={handleNew}>Nouveau</button>

          {loading && <p>Chargement...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {!showForm && activeSection && (
            <div>
              <h3>Liste des {activeSection === 'planes' ? 'Avions' : activeSection === 'airports' ? 'Aéroports' : activeSection === 'flights' ? 'Vols' : activeSection === 'reservations' ? 'Réservations' : 'Passagers'}</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    {activeSection === 'planes' && (
                      <>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Capacité</th>
                        <th>Fabriquant</th>
                        <th>Actions</th>
                      </>
                    )}
                    {activeSection === 'reservations' && (
                      <>
                        <th>ID</th>
                        <th>ID Passager</th>
                        <th>ID Vol</th>
                        <th>Date Réservation</th>
                        <th>Statut</th>
                        <th>Prix</th>
                      </>
                    )}
                    {activeSection === 'airports' && (
                      <>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Ville</th>
                        <th>Pays</th>
                        <th>Actions</th>
                      </>
                    )}
                    {activeSection === 'flights' && (
                      <>
                        <th>ID</th>
                        <th>Numéro</th>
                        <th>Heure de départ</th>
                        <th>Heure d'arrivée</th>
                        <th>Statut</th>
                        <th>Porte</th>
                        <th>Type d'avion</th>
                        <th>Actions</th>
                      </>
                    )}
                    {activeSection === 'passengers' && (
                      <>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Date de naissance</th>
                        <th>Téléphone</th>
                        <th>Numéro Passeport</th>
                        {/* <th>Actions</th> */}
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr><td colSpan={8}>Aucune donnée disponible</td></tr>
                  ) : (
                    data.map((item) => (
                      <tr key={item.idReservation || item.idPassager || item.idAeroport || item.idAvion || item.idVol}>
                        <td>{item.idReservation || item.idPassager || item.idAeroport || item.idAvion || item.idVol}</td>
                        {activeSection === 'reservations' && (
                          <>
                            <td>{item.idPassager}</td>
                            <td>{item.idVol}</td>
                            <td>{item.dateReservation}</td>
                            <td>{item.statutReservation}</td>
                            <td>{item.prixReservation}</td>
                          </>
                        )}
                        {activeSection !== 'reservations' && (
                          <>
                            <td>{item.nomAeroport || item.typeAvion || item.numeroVol || item.nomPassager}</td>
                            <td>{item.villeAeroport || item.capaciteAvion || item.depart || item.emailPassager}</td>
                            <td>{item.paysAeroport || item.fabriquantAvion || item.arrivee || item.volId}</td>
                          </>
                        )}
                        <td>
                          {activeSection !== 'reservations' && activeSection !== 'passengers' && (
                            <>
                              <button onClick={() => handleEdit(item.idReservation || item.idAeroport || item.idAvion || item.idVol || item.idPassager)} className="btn btn-warning btn-sm">Modifier</button>
                              <button onClick={() => handleDelete(item.idReservation || item.idAeroport || item.idAvion || item.idVol || item.idPassager)} className="btn btn-danger btn-sm ms-2">Supprimer</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {showForm && renderForm()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;