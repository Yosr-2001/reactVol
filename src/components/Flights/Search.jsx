import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../main.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import "../../assets/style/search.scss";
import { Button, Form, Row, Col } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import "../../main.scss";
import Results from "./Results";

function FlightSearch({ onSearch }) {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState([null, null]);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchCriteria = {
      departure,
      destination,
      travelDates,
    };
    onSearch(searchCriteria);
  };



  return (
    <>
      <Navbar />
      <div className="flight-search">
        <div className="search-form-container">
          <h2>Find Your Next Flight</h2>
          <form className="search-form" onSubmit={handleSubmit}>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Période voyage</Form.Label>
                  <DatePicker
                    selected={travelDates[0]}
                    onChange={(update) => setTravelDates(update)}
                    startDate={travelDates[0]}
                    endDate={travelDates[1]}
                    selectsRange
                    dateFormat="dd MMM yyyy"
                    className="form-control"
                    popperModifiers={[
                      {
                        name: "preventOverflow",
                        enabled: true,
                        options: {
                          padding: 0,
                          boundary: document.body
                        }
                      }
                    ]}
                  />

                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Depart</Form.Label>
                  <Form.Control
                    type="text"
                    value={departure}
                    onChange={(e) => setDeparture(e.target.value)}
                    placeholder="Entrer ville de depart"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Destination</Form.Label>
                  <Form.Control
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Entrer ville destination"
                  />
                </Form.Group>
              </Col>

            </Row>
            {/*
            <Row className="mt-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value)}
                  >
                    <option value="Round-trip">Round-trip</option>
                    <option value="One-way">One-way</option>
                    <option value="Multi-city">Multi-city</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Classe</Form.Label>
                  <Form.Select
                    value={classType}
                    onChange={(e) => setClassType(e.target.value)}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Nombre passagers</Form.Label>
                  <Form.Select
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1} {num + 1 === 1 ? "Passager" : "Passagers"}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>*/}

            <div className="form-group button-group mt-4">
              <Button type="submit" className="btn btn-primary">
                Search Flights
              </Button>
            </div>
          </form>
        </div>


      </div>
      <Results />
    </>
  );
}

export default FlightSearch;
