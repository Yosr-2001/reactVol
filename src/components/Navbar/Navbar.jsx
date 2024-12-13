import { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const [noBg, addBg] = useState('navBarTwo');

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

  return (
    <div className="navBar flex">
      <div className="navBarTwo flex">
        <Link to="/" className="flightManagerText">
          Flight Manager
        </Link>  <ul className="menu flex">
          <Nav.Link className="listItem" as={Link} to="/">Home</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/search">Search</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/about">About</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/offers">Offers</Nav.Link>
          <Nav.Link className="listItem" as={Link} to="/reservations">Reservations</Nav.Link>
          <Link to="/sign-in"> <button className="logoutButton">
            <FiLogOut className="logoutIcon" />
            Log Out
          </button></Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
