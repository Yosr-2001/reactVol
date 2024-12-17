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
import Forbidden from './utils/Forbidden'
import ProtectedRoute from './utils/ProtectedRoute'
import About from './About/About'
import SearchFlights from './components/Flights/SearchFlights'
import ListFlights from './components/Flights/ListFlights'
function App() {

  return (
    <>
      <div style={{ height: '80vh', width: '60vw' }}>

        <Router>

          <Routes>

            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/forbidden" element={<Forbidden />} />

            {/**user pages  */}
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchFlights />} />
            <Route path="/vols" element={<ListFlights />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />

            {/**admin pages*/}

            <Route
              path="/dashboard"
              element={<ProtectedRoute allowedRoles={['Admin']} />}
            >
              <Route index element={<Dashboard />} />
            </Route>
            <Route
              path="/add-avion"
              element={<ProtectedRoute allowedRoles={['Admin']} />}
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
