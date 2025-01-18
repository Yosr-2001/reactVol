import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signin from './components/SignInUp/signin'
import Signup from './components/SignInUp/Signup'
import AvionForm from './components/Avion/AvionForm'
import Offers from './components/Offre/Offres'
import Dashboard from './components/Dashboard/DashBoard'
import Dash from './components/Dash'
import OffreList from './components/Offre/OfferList'


import Forbidden from './utils/Forbidden'
import About from './About/About'
import SearchFlights from './components/Search/SearchFlights'
// import ProtectedRoute from './utils/ProtectedRoute'
import PassengerForm from './components/Passager/Passager'
import Results from './components/Search/Results'
import Paiement from './components/Paiement/Paiement'
import Ticket from './components/Paiement/Ticket'
import HistoriqueReservations from './components/Historique/HistoriqueReservations'
import ListFlights from './components/Flights/ListFlights'
import HomePage from './pages/HomePage'
import AvionPage from './pages/AvionPage'
import axios from "axios";
import { useEffect, useState } from 'react'

function App() {
  //test avion
  // const [newAvion, setNewAvion] = useState({
  //   TypeAvion: "",
  //   CapaciteAvion: "",
  //   FabriquantAvion: "",
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewAvion({ ...newAvion, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post("http://127.0.0.1:5235/api/avions", newAvion)
  //     .then(response => {
  //       alert("Avion added successfully!");
  //       console.log(newAvion);
  //       setNewAvion({ TypeAvion: "", CapaciteAvion: "", FabriquantAvion: "" }); // Reset form
  //     })
  //     .catch(error => {
  //       console.error("Error adding avion:", error);
  //     });
  // };

  // return (
  //   <div>
  //     <h2>Add New Avion</h2>
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Type of Avion:
  //         <input
  //           type="text"
  //           name="TypeAvion"
  //           value={newAvion.TypeAvion}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </label>
  //       <br />
  //       <label>
  //         Capacity:
  //         <input
  //           type="number"
  //           name="CapaciteAvion"
  //           value={newAvion.CapaciteAvion}
  //           onChange={handleInputChange}
  //           required
  //         />
  //       </label>
  //       <br />
  //       <label>
  //         Manufacturer:
  //         <input
  //           type="text"
  //           name="FabriquantAvion"
  //           value={newAvion.FabriquantAvion}
  //           onChange={handleInputChange}
  //         />
  //       </label>
  //       <br />
  //       <button type="submit">Add Avion</button>
  //     </form>
  //   </div>
  // );
  /////test avion
  // const [avions, setAvions] = useState([]);

  // useEffect(() => {
  //   // Fetching avion data from Laravel API
  //   axios.get("http://127.0.0.1:5235/api/avions")
  //     .then(response => {
  //       setAvions(response.data); // Assuming the API returns the avion data
  //     })
  //     .catch(error => {
  //       console.error("Error fetching avion data:", error);
  //     });
  // }, []);

  // return (
  //   <div className="App">
  //     <h1>List of Avions</h1>
  //     <ul>
  //       {avions.map(avion => (
  //         <li key={avion.id}>
  //           <strong>{avion.type_avion}</strong>
  //           <p>Capacity: {avion.capacite_avion}</p>
  //           <p>Manufacturer: {avion.fabriquant_avion || "Unknown"}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <>
      <div style={{
        height: '90vh',
        width: '65vw',
        margin: '0px',
        overflowY: 'auto',
        overflowX: 'auto',
        paddingTop: '5%',
        paddingBottom: '0%',
        marginBottom: '0px'
        // padding: '0%',
        // paddingRight: '0px'
      }}>
        <div></div>
        <Router>

          <Routes>

            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forbidden" element={<Forbidden />} />

            <Route path="/" element={<Signin />} />
            {/**user pages  */}
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<SearchFlights />} />
            <Route path="/vols" element={<ListFlights />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/dash" element={<Dash />} />
            {/*<Route path="/offre" element={<OffreList />} />*/}

            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Results />} />

            <Route path="/passenger-form" element={<PassengerForm />} />
            <Route path="/paiement" element={<Paiement />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/reservations" element={<HistoriqueReservations />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/avionPage" element={<AvionPage />} />
            {/**admin pages*/}

            *       <Route
              path="/dashboard"
            // element={<ProtectedRoute allowedRoles={['Admin']} 

            // />}
            >
              <Route index element={<Dashboard />} />
            </Route>
            <Route
              path="/add-avion"
            // element={<ProtectedRoute allowedRoles={['Admin']} />}
            >
              <Route index element={<AvionForm />} />
            </Route>






          </Routes>

        </Router>
      </div>

    </>
  )
}

export default App
