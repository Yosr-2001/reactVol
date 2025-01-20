import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import "../../main.scss";



const Navbar = () => {
  const [noBg, addBg] = useState('navBarTwo');
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 10) {
        addBg('navBarTwo navbar_With_Bg');
      } else {
        addBg('navBarTwo');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLogout = () => {
    sessionStorage.clear();
    console.log("session storage contains :", sessionStorage)
    navigate('/sign-in');

  };

  return (
    <div className="navBar flex">
      <div className="navBarTwo flex">
        <Link to="/home" className="flightManagerText">
          Flight Manager
        </Link>  <ul className="menu flex">
          <Nav.Link className="listItem" as={Link} to="/home">Home</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/search">Search</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/about">About</Nav.Link>
          {/* <Nav.Link className="listItem" as={Link} to="/offre">Offres</Nav.Link>
        */ } <Nav.Link className="listItem" as={Link} to="/reservations">Reservations</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/vols">Explorer</Nav.Link>

          <button className="logoutButton" onClick={handleLogout}>
            <FiLogOut className="logoutIcon" />
            Log Out
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
