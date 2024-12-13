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


          </Routes>

        </Router>
      </div>

    </>
  )
}

export default App
