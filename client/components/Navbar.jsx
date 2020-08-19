import { Navbar, Nav, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import SignDropdown from './small-components/SignDropdown.jsx';


  
    
   
      




export default function Notnav({ handleStatusChange, userName, handleLogOut }) {
  const [hidden, setHidden] = useState(true);

  function handleClick() {
    setHidden(!hidden);
    console.log(hidden);
  }

  return (
    <Navbar expand="lg" className="myNavbar justify-content-between">
      <Navbar.Brand className="brand" href="/">
        <FontAwesomeIcon icon={faFeatherAlt} /> Social Scrapbook
      </Navbar.Brand>
      <Nav>
        <a href="#">
          <Button
            className="navButton"
            variant="outline-primary"
            onClick={userName ? handleLogOut : handleClick}
          >
            {userName ? 'Log Out' : 'Sign Up / Log In'}
          </Button>
        </a>
      </Nav>
      {hidden ? null : (
        <SignDropdown
          handleStatusChange={handleStatusChange}
          hideAfterSignInOrUp={() => {
            setHidden(true);
          }}
        />
      )}
      <Nav>
        <a href={userName ? "/api/logout" : "/api/login"}>
          <Button className="navButton" variant="outline-primary">
            <FontAwesomeIcon icon={faGoogle} /> { (userName) ? 'Logout' : 'Sign Up/Log In' } 
          </Button> 
        </a>
      </Nav>
    </Navbar>
  );
}
