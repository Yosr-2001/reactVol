import React, { useState } from 'react';
import { Button, Form, Row, Col, Card, Spinner } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/style/search.scss";
import Navbar from '../Navbar/Navbar';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function FlightSearch({ onSearch }) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vols, setVols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
  });

  const fetchVols = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/pagivate_search`, {
        params: {
          departure,
          destination,
          start_date: startDate,
          end_date: endDate,
          page: pagination.current_page, // Ajoutez la page pour la pagination
        },
      });
      setVols(response.data.data || []);
      setPagination({
        current_page: response.data.current_page,
        total_pages: response.data.last_page,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des vols:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVols();
  };


  const handlePageChange = (page) => {
    setPagination({ ...pagination, current_page: page });
    fetchVols();
  };


  return (
    <>
      <Navbar />
      <div className="flight-search">
        <h2>Chercher vols</h2>
        <form className="search-form" onSubmit={handleSubmit}>
          <Row className="form-row">
            <Col md="auto">
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col md="auto">
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="form-control"
                />
              </Form.Group>
            </Col>
            <Col md="auto">
              <Form.Group>
                <Form.Label>Departure</Form.Label>
                <Form.Control
                  type="text"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  placeholder="Enter departure city"
                />
              </Form.Group>
            </Col>
            <Col md="auto">
              <Form.Group>
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination city"
                />
              </Form.Group>
            </Col>
            <Col md={12} className="button-group">
              <Button type="submit" className="btn btn-primary mt-4">
                Rechercher <FaSearch style={{ marginLeft: '8px' }} />
              </Button>
            </Col>
          </Row>
        </form>

        <div>

          {loading ? (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" variant="primary" />
              <span style={{ marginLeft: '10px' }}>Recherche en cours...</span>
            </div>
          ) : (
            <div className="row">
              {vols.length > 0 ? (
                vols.map((vol) => (
                  <Col xs={12} md={4} key={vol.id} className="mb-4">
                    <Card>
                      <Card.Body>
                        <Card.Title>{vol.numero_vol}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {vol.aeroport_depart.ville_aeroport} à {vol.aeroport_arrivee.pays_aeroport}
                        </Card.Subtitle>
                        <Card.Text>
                          <strong>Heure de départ:</strong> {vol.heure_depart}<br />
                          <strong>Heure d'arrivée:</strong> {vol.heure_arrivee}<br />
                          <strong>Statut:</strong> {vol.statut}<br />
                          <strong>Type d'avion:</strong> {vol.type_avion}<br />
                          <strong>Porte:</strong> {vol.porte}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        {vol.aeroport_depart.nom_aeroport}, {vol.aeroport_depart.pays_aeroport}
                        &rarr; {vol.aeroport_arrivee.nom_aeroport}, {vol.aeroport_arrivee.pays_aeroport}
                      </Card.Footer>
                    </Card>
                  </Col>
                ))
              ) : (
                <div className="col-12">
                  <p></p>
                </div>
              )}
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button
              className="btn btn-outline-primary btn-sm"
              disabled={pagination.current_page === 1}
              onClick={() => handlePageChange(pagination.current_page - 1)}
            >
              Précédent
            </button>

            <button
              className="btn btn-outline-primary btn-sm"
              disabled={pagination.current_page === pagination.total_pages}
              onClick={() => handlePageChange(pagination.current_page + 1)}
            >
              Suivant
            </button>
            <div className="pagination-info">
              <span>
                <strong>Page {pagination.current_page}</strong> de <strong>{pagination.total_pages}</strong>
              </span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}

export default FlightSearch;