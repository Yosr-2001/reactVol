import React, { useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsCalendar2Date } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../main.scss"; // Custom styles for professional look
import Aos from "aos";
import "aos/dist/aos.css";
import "../../assets/style/search.scss";
import { Button } from "react-bootstrap";

function FlightSearch() {
  const [tripType, setTripType] = useState("Round-trip");
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [travelDates, setTravelDates] = useState([null, null]);
  const [travelers, setTravelers] = useState(1);
  const [classType, setClassType] = useState("Economy");

  React.useEffect(() => {
    Aos.init({ duration: 1000 }); // Animation on scroll
  }, []);

  return (
    <div className="flight-search">

      <div className="search-form-container">
        <form className="search-form">

          <div className="form-group">     <label htmlFor="tripType">Trip Type</label>
            <select
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="form-control"
            >
              <option value="Round-trip">Round-trip</option>
              <option value="One-way">One-way</option>
              <option value="Multi-city">Multi-city</option>
            </select>
          </div>


          <div className="form-group"> <label htmlFor="departure">Departure</label>
            <input
              type="text"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              placeholder="Departure"
              className="form-control"
            />
          </div>


          <div className="form-group"><label htmlFor="destination">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination"
              className="form-control"
            />
          </div>


          <div className="form-group"> <label htmlFor="travelDates">Travel Dates</label>
            <DatePicker
              selected={travelDates[0]}
              onChange={(update) => setTravelDates(update)}
              startDate={travelDates[0]}
              endDate={travelDates[1]}
              selectsRange
              dateFormat="dd MMM yyyy"
              className="form-control"
            />
          </div>

          <div className="form-group">   <label htmlFor="travelers">Number of Travelers</label>
            <select
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="form-control"
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1} {num + 1 === 1 ? "adult" : "adults"}
                </option>
              ))}
            </select>
          </div>


          <div className="form-group">            <label htmlFor="classType">Travel Class</label>

            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="form-control"
            >
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
          </div>


          <div className="form-group button-group">
            <Button type="submit" className="btn btn-primary">
              Search Flights
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FlightSearch;
