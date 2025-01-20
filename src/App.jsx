import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signin from './components/SignInUp/signin'
import Signup from './components/SignInUp/Signup'
import AvionForm from './components/Avion/AvionForm'
import Offers from './components/Offre/Offres'
import Dashboard from './components/Dashboard/DashBoard'
import Dash from './components/Dash'
import SearchFlights from './components/Search/SearchFlights';

import Forbidden from './utils/Forbidden'
import About from './About/About'

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
import AeroportPage from './pages/AeroportPage'
import AeroportAjout from './pages/AeroportAjout'
import VolAjout from './pages/VolAjout'

function App() {

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

            <Route path="/home" element={<Home />} />

            <Route path="/vols" element={<ListFlights />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/dash" element={<Dash />} />

            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Results />} />

            <Route path="/passenger-form" element={<PassengerForm />} />
            <Route path="/paiement" element={<Paiement />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route path="/reservations" element={<HistoriqueReservations />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/avionPage" element={<AvionPage />} />
            <Route path="/aeroportPage" element={<AeroportPage />} />
            <Route path="/add-aeroport" element={<AeroportAjout />} />
            <Route path="/add-vol" element={<VolAjout />} />
            <Route path="/search" element={<SearchFlights />} />

            <Route
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
