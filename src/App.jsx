import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Search from './components/Search/Search'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signin from './components/SignInUp/signin'
import Signup from './components/SignInUp/Signup'
import AvionForm from './components/Avion/AvionForm'
import Offers from './components/Offre/Offres'
import Dashboard from './components/Dashboard/DashBoard'
import Dash from './components/Dash'
import OffreList from './components/Offre/OfferList'



function App() {

  return (
    <>
      <div style={{ height: '80vh', width: '60vw' }}>

        <Router>

          <Routes>

            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/add-avion" element={<AvionForm />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dash" element={<Dash />} />
            <Route path="/offre" element={<OffreList />} />
              

          </Routes>

        </Router>
      </div>

    </>
  )
}

export default App
