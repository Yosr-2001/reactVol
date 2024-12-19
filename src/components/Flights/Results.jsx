import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../../main.scss";
import "aos/dist/aos.css";
import "../../assets/style/search.scss";
import "../../main.scss";
import { Button, ListGroup } from "react-bootstrap";
const Results = ({ flights, isLoading }) => {

    return (
        <div className="results-container mt-5">
            <h3>Available Flights</h3>
            {isLoading ? (
                <p>Loading flights...</p>
            ) : Array.isArray(flights) && flights.length > 0 ? (
                <ListGroup>
                    {flights.map((flight) => (
                        <ListGroup.Item
                            key={flight.id || `${flight.departure || 'no-departure'}-${flight.destination || 'no-destination'}-${flight.date || 'no-date'}-${Math.random()}`}
                            className="d-flex justify-content-between align-items-center mb-3"
                        >
                            <div>
                                <strong>{flight.departure || "Unknown Departure"}</strong> to{" "}
                                <strong>{flight.destination || "Unknown Destination"}</strong>
                                <br />
                                Date: {flight.date || "No Date Provided"} | Price: {flight.price || "N/A"}
                            </div>
                            <Button variant="primary">Reserve</Button>
                        </ListGroup.Item>

                    ))}
                </ListGroup>
            ) : (
                <p>No flights found. Please search again.</p>
            )}
        </div>
    );
};


export default Results
