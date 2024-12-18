import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

import "../../assets/style/search.scss";
import Navbar from '../Navbar/Navbar';
import { FaSearch } from 'react-icons/fa';

function FlightSearch({ onSearch }) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState([null, null]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchCriteria = {
      departure,
      destination,
      dateDepart: startDate,
     dateRetour: endDate,
    };
    onSearch(searchCriteria);
  };

  return (
    <>
      <Navbar />
      <div className="flight-search">
        <br></br>
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
      </div>
    </>
  );
}

export default FlightSearch;
