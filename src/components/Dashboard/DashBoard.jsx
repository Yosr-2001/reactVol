import React, { useEffect, useState } from "react";
import { Container, Button, Table, Modal, Form, Toast, ToastContainer } from "react-bootstrap";
import axios from "axios";
import { FaPlane, FaBuilding, FaUser, FaTicketAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import './Dashboard.css';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('planes');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const API_BASE_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    const fetchData = async (url) => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data)
      } catch (err) {
        setError('Erreur lors du chargement des données');
      } finally {
        setLoading(false);
      }

    };

    switch (activeSection) {
      case "planes":
        fetchData(`${API_BASE_URL}/avions`);
        break;
      case "airports":
        fetchData(`${API_BASE_URL}/aeroports`);
        break;
      case "flights":
        fetchData(`${API_BASE_URL}/vols`);
        break;
      case "passengers":
        fetchData(`${API_BASE_URL}/passagers`);
        break;
      case "reservations":
        fetchData(`${API_BASE_URL}/reservations`);
        console.log("res here")
        break;
      default:
        break;
    }
  }, [activeSection]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      let url = '';
      switch (activeSection) {
        case 'planes':
          url = `${API_BASE_URL}/avions/${id}`;
          break;
        case 'airports':
          url = `${API_BASE_URL}/aeroports/${id}`;
          break;
        case 'flights':
          url = `${API_BASE_URL}/vols/${id}`;
          break;
        case 'passengers':
          url = `${API_BASE_URL}/passagers/${id}`;
          break;
        case 'reservations':
          url = `${API_BASE_URL}/reservations/${id}`;
          break;
        default:
          alert("Section non prise en charge");
          return;
      }

      await axios.delete(url);
      setToastMessage("Suppression effectuée avec succès !");
      setToastType('success');
      handleMenuClick(activeSection);
    } catch (error) {
      setToastMessage("Erreur lors de la suppression.");
      setToastType('error');
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    switch (activeSection) {
      case 'planes':
        navigate('/add-avion');
        break;
      case 'airports':
        navigate('/add-aeroport');
        break;
      case 'flights':
        navigate('/add-vol');
        break;
      default:
        break;
    }
  };

  const handleEdit = async (id) => {
    setEditingId(id);
    setShowForm(true);
    try {
      let url = '';
      switch (activeSection) {
        case 'planes':
          url = `${API_BASE_URL}/avions/${id}`;
          break;
        case 'airports':
          url = `${API_BASE_URL}/aeroports/${id}`;
          break;
        case 'flights':
          url = `${API_BASE_URL}/vols/${id}`;
          break;
        case 'passengers':
          url = `${API_BASE_URL}/passagers/${id}`;
          break;
        case 'reservations':
          url = `${API_BASE_URL}/reservations/${id}`;
          break;
        default:
          throw new Error('Section non prise en charge pour la modification');
      }
      const response = await axios.get(url);
      setFormData(response.data);
    } catch (error) {
      alert("Erreur lors de la récupération des données.");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = activeSection === 'planes' ? `${API_BASE_URL}/avions` :
        activeSection === 'airports' ? `${API_BASE_URL}/aeroports` :
          activeSection === 'flights' ? `${API_BASE_URL}/vols` :
            activeSection === 'passengers' ? `${API_BASE_URL}/passagers` :
              activeSection === 'reservations' ? `${API_BASE_URL}/reservations` :
                '';

      const method = editingId ? 'PUT' : 'POST';
      const response = await axios({
        method,
        url: editingId ? `${url}/${editingId}` : url,
        data: formData
      });

      setToastMessage(editingId ? "Modification effectuée avec succès" : "Ajout effectué avec succès");
      setToastType('success');
      setShowForm(false);
      handleMenuClick(activeSection);
    } catch (error) {
      setToastMessage("Erreur lors de l'ajout ou de la modification.");
      setToastType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const renderForm = () => {
    console.log("Form data:", formData); // Vérifier si formData contient des données
    switch (activeSection) {
      case 'airports': return (
        <Form onSubmit={handleFormSubmit}>
          {/* Champs de saisie du formulaire */}
          <Form.Group className="mb-3">
            <Form.Label>Nom de l'Aéroport</Form.Label>
            <Form.Control
              type="text"
              name="nom_aeroport"
              value={formData.nom_aeroport || ''} // Vérifier si les données existent
              onChange={handleInputChange} // Mettre à jour formData
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ville</Form.Label>
            <Form.Control
              type="text"
              name="ville"
              value={formData.ville_aeroport || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pays</Form.Label>
            <Form.Control
              type="text"
              name="pays"
              value={formData.pays_aeroport || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'En cours...' : editingId ? 'Modifier' : 'Ajouter'}
          </Button>
        </Form>
      );
      case 'flights': return (
        <Form onSubmit={handleFormSubmit}>
          {/* Champs de saisie du formulaire */}
          <Form.Group className="mb-3">
            <Form.Label>Numéro du Vol</Form.Label>
            <Form.Control
              type="text"
              name="numero_vol"
              value={formData.numero_vol || ''} // Vérifier si les données existent
              onChange={handleInputChange} // Mettre à jour formData
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Heure de Départ</Form.Label>
            <Form.Control
              type="text"
              name="heure_depart"
              value={formData.heure_depart || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Heure d'Arrivée</Form.Label>
            <Form.Control
              type="text"
              name="heure_arrivee"
              value={formData.heure_arrivee || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Statut</Form.Label>
            <Form.Select
              name="statut"
              value={formData.statut || ''} // Vérifier si une valeur existe
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner un statut</option>
              <option value="Programmé">Programmé</option>
              <option value="Annulé">Annulé</option>
              <option value="En Retard">En Retard</option>
              <option value="Parti">Parti</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Porte</Form.Label>
            <Form.Control
              type="text"
              name="porte"
              value={formData.porte || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type d'Avion</Form.Label>
            <Form.Control
              type="text"
              name="type_avion"
              value={formData.type_avion || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Aéroport de Départ</Form.Label>
            <Form.Control
              type="number"
              name="id_aeroport_depart"
              value={formData.id_aeroport_depart || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Aéroport d'Arrivée</Form.Label>
            <Form.Control
              type="number"
              name="id_aeroport_arrivee"
              value={formData.id_aeroport_arrivee || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'En cours...' : editingId ? 'Modifier' : 'Ajouter'}
          </Button>
        </Form>
      );
      case 'passengers': return (
        <Form onSubmit={handleFormSubmit}>
          {/* Champs de saisie du formulaire */}
          <Form.Group className="mb-3">
            <Form.Label>Nom du Passager</Form.Label>
            <Form.Control
              type="text"
              name="nom_passager"
              value={formData.nom_passager || ''} // Vérifier si les données existent
              onChange={handleInputChange} // Mettre à jour formData
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Prénom du Passager</Form.Label>
            <Form.Control
              type="text"
              name="prenom_passager"
              value={formData.prenom_passager || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email_passager"
              value={formData.email_passager || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date de Naissance</Form.Label>
            <Form.Control
              type="date"
              name="date_naissance"
              value={formData.date_naissance || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Téléphone</Form.Label>
            <Form.Control
              type="tel"
              name="telephone_passager"
              value={formData.telephone_passager || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numéro de Passeport</Form.Label>
            <Form.Control
              type="text"
              name="numero_passeport"
              value={formData.numero_passeport || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'En cours...' : editingId ? 'Modifier' : 'Ajouter'}
          </Button>
        </Form>
      );

      case 'planes': return (
        <Form onSubmit={handleFormSubmit}>
          {/* Champs de saisie du formulaire */}
          <Form.Group className="mb-3">
            <Form.Label>Type d'Avion</Form.Label>
            <Form.Control
              type="text"
              name="type_avion"
              value={formData.type_avion || ''} // Vérifier si les données existent
              onChange={handleInputChange} // Mettre à jour formData
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Capacité de l'Avion</Form.Label>
            <Form.Control
              type="number"
              name="capacite_avion"
              value={formData.capacite_avion || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fabricant de l'Avion</Form.Label>
            <Form.Control
              type="text"
              name="fabriquant_avion"
              value={formData.fabriquant_avion || ''} // Vérifier si les données existent
              onChange={handleInputChange}
              required
            />
          </Form.Group>


          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? 'En cours...' : editingId ? 'Modifier' : 'Ajouter'}
          </Button>
        </Form>
      );

      case 'reservations':
        return (
          <Form onSubmit={handleFormSubmit}>
            {/* Champs de saisie du formulaire */}
            <Form.Group className="mb-3">
              <Form.Label>ID Passager</Form.Label>
              <Form.Control
                type="number"
                name="id_passager"
                value={formData.id_passager || ''} // Vérifier si les données existent
                onChange={handleInputChange} // Mettre à jour formData
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Vol</Form.Label>
              <Form.Control
                type="number"
                name="vol"
                value={formData.id_vol || ''} // Vérifier si les données existent
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Statut de la réservation</Form.Label>
              <Form.Select
                name="statut_reservation"
                value={formData.statut_reservation || ''} // Vérifier si une valeur existe
                onChange={handleInputChange}
                required
              >
                <option value="">Sélectionner un statut</option> {/* Option vide par défaut */}
                <option value="Annuler">Annuler</option>
                <option value="En attente">En attente</option>
                <option value="Confirmer">Confirmer</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prix Reservation</Form.Label>
              <Form.Control
                type="text"
                name="prix_reservation"
                value={formData.prix_reservation || ''} // Vérifier si les données existent
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date de réservation</Form.Label>
              <Form.Control
                type="text"
                name="date_reservation"
                value={formData.date_reservation || '***'} // Vérifier si les données existent
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'En cours...' : editingId ? 'Modifier' : 'Ajouter'}
            </Button>
          </Form>
        );
      default:
        return null;
    }
  };

  const renderTableHeaders = () => {
    let headers = [];

    if (activeSection === 'planes') {
      headers = ['ID', 'Type', 'Fabriquant', 'Capacité', ''];
    }
    if (activeSection === 'airports') {
      headers = ['ID', 'Nom de l\'aéroport', 'Ville', 'Pays', ''];
    }
    if (activeSection === 'flights') {
      headers = ['ID', 'Numéro de vol', 'Départ', 'Arrivée', 'Porte', 'Status', 'Type Avion', ''];
    }
    if (activeSection === 'passengers') {
      headers = ['ID', 'Nom', 'Prenom', 'Date Naissance', 'Email', 'Numero Téléphone', ''];
    }
    if (activeSection === 'reservations') {
      headers = ['ID', 'Date', 'Passager', 'Vol', 'Prix', 'Statut', ''];
    }


    return (
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    );
  };

  const renderTableRows = () => {
    if (data && data.length > 0) {
      return data.map((item) => (
        <tr key={item.id}>

          {activeSection === 'planes' && (
            <>
              <td>{item.id}</td>

              <td>{item.type_avion}</td>
              <td>{item.fabriquant_avion
              }</td>
              <td>{item.capacite_avion
              }</td>
              <td><span
                onClick={() => handleEdit(item.id)}
                className="action-text-btn edit-btn"
                role="button"
                aria-label="Edit Reservation"
              >
                <FaEdit color="green" size="1.5em" />
              </span>

                <span
                  onClick={() => handleDelete(item.id)}
                  className="action-text-btn delete-btn"
                  role="button"
                  aria-label="Delete Reservation"
                >
                  <FaTrashAlt color="red" size="1.5em" />
                </span></td>
            </>

          )}
          {activeSection === 'airports' && (
            <>
              <td>{item.id}</td>
              <td>{item.nom_aeroport}</td>
              <td>{item.ville_aeroport}</td>
              <td>{item.pays_aeroport}</td>
              <td>
                <span
                  onClick={() => handleEdit(item.id)}
                  className="action-text-btn edit-btn"
                  role="button"
                  aria-label="Edit Reservation"
                >
                  <FaEdit color="green" size="1.5em" />
                </span>

                <span
                  onClick={() => handleDelete(item.id)}
                  className="action-text-btn delete-btn"
                  role="button"
                  aria-label="Delete Reservation"
                >
                  <FaTrashAlt color="red" size="1.5em" />
                </span>
              </td>

            </>
          )}
          {
            activeSection === 'flights' && (
              <>
                <td>{item.id}</td>
                <td>{item.numero_vol}</td>
                <td>{new Date(item.heure_depart).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{new Date(item.heure_arrivee).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</td>

                <td>{item.porte}</td>
                <td>{item.statut}</td>
                <td>{item.type_avion}</td>

                <td>
                  <span
                    onClick={() => handleEdit(item.id)}
                    className="action-text-btn edit-btn"
                    role="button"
                    aria-label="Edit Reservation"
                  >
                    <FaEdit color="green" size="1.5em" />
                  </span>

                  <span
                    onClick={() => handleDelete(item.id)}
                    className="action-text-btn delete-btn"
                    role="button"
                    aria-label="Delete Reservation"
                  >
                    <FaTrashAlt color="red" size="1.5em" />
                  </span>
                </td>
              </>
            )
          }
          {
            activeSection === 'passengers' && (
              <>
                <td>{item.id}</td>
                <td>{item.nom_passager}</td>
                <td>{item.
                  prenom_passager
                }</td>

                <td>{item.
                  date_naissance
                }</td>
                <td>{item.email_passager
                }</td>
                <td>{item.
                  telephone_passager
                }</td>
                <td><span
                  onClick={() => handleEdit(item.id)}
                  className="action-text-btn edit-btn"
                  role="button"
                  aria-label="Edit Reservation"
                >
                  <FaEdit color="green" size="1.5em" />
                </span>

                  <span
                    onClick={() => handleDelete(item.id)}
                    className="action-text-btn delete-btn"
                    role="button"
                    aria-label="Delete Reservation"
                  >
                    <FaTrashAlt color="red" size="1.5em" />
                  </span></td>
              </>
            )
          }
          {
            activeSection === 'reservations' && (
              <>
                <td>{item.id}</td>

                <td>{item.date_reservation}</td>
                <td>{item.passager ? item.passager.email_passager : 'No email'}</td>

                <td>{item.vol ? item.vol.numero_vol : 'No flight number'}</td>  <td>{item.prix_reservation}</td>
                <td>{item.statut_reservation}</td>

                <td>
                  <span
                    onClick={() => handleEdit(item.id)}
                    className="action-text-btn edit-btn"
                    role="button"
                    aria-label="Edit Reservation"
                  >
                    <FaEdit color="green" size="1.5em" />
                  </span>

                  <span
                    onClick={() => handleDelete(item.id)}
                    className="action-text-btn delete-btn"
                    role="button"
                    aria-label="Delete Reservation"
                  >
                    <FaTrashAlt color="red" size="1.5em" />
                  </span>
                </td>
              </>
            )
          }
        </tr >
      ));
    } else {
      return <tr><td colSpan="100%">Aucune donnée disponible.</td></tr>;
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul className="sidebar-nav">
          <li>
            <a href="#dashboard" onClick={() => handleMenuClick('dashboard')}>
              <h3>Dashboard</h3>
            </a>
          </li>
          <li>
            <a href="#planes" onClick={() => handleMenuClick('planes')}>
              <FaPlane /> Avions
            </a>
          </li>
          <li>
            <a href="#airports" onClick={() => handleMenuClick('airports')}>
              <FaBuilding /> Aéroports
            </a>
          </li>
          <li>
            <a href="#flights" onClick={() => handleMenuClick('flights')}>
              <FaTicketAlt /> Vols
            </a>
          </li>
          <li>
            <a href="#passengers" onClick={() => handleMenuClick('passengers')}>
              <FaUser /> Passagers
            </a>
          </li>
          <li>
            <a href="#reservations" onClick={() => handleMenuClick('reservations')}>
              <FaTicketAlt /> Réservations
            </a>
          </li>
        </ul>
      </div>
      <div className="content">

        <Container>

          <h2>{activeSection === 'planes' ? 'Gestion des Avions' : activeSection === 'airports' ? 'Gestion des Aéroports' : activeSection === 'flights' ? 'Gestion des Vols' : activeSection === 'passengers' ? 'Gestion des Passagers' : 'Gestion des Réservations'}</h2>
          {loading && <p>Chargement...</p>}
          {error && <p className="text-danger">{error}</p>}
          <Button
            variant="primary"
            onClick={handleAddClick}
            style={{ display: (activeSection === 'planes' || activeSection === 'airports' || activeSection === 'flights') ? 'block' : 'none' }}
          >
            Ajouter {activeSection === 'planes' ? 'Avion' : activeSection === 'airports' ? 'Aéroport' : activeSection === 'flights' ? 'Vol' : ''}
          </Button>

          <Table striped bordered hover>
            <thead>{renderTableHeaders()}</thead>
            <tbody>{renderTableRows()}</tbody>
          </Table>

          {showForm && (
            <Modal show={showForm} onHide={() => setShowForm(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{editingId ? 'Modifier' : 'Ajouter'} {activeSection === 'planes' ? 'un Avion' : activeSection === 'airports' ? 'un Aéroport' : activeSection === 'flights' ? 'un Vol' : activeSection === 'passengers' ? 'un Passager' : 'une Réservation'}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {renderForm()}
              </Modal.Body>
            </Modal>
          )}

          <ToastContainer position="top-end">
            <Toast onClose={() => setToastMessage('')} show={toastMessage !== ''} delay={3000} autohide>
              <Toast.Body className={toastType === 'success' ? 'text-success' : 'text-danger'}>
                {toastMessage}
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
