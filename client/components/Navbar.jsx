import { Navbar, Nav, Button } from 'react-bootstrap';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

export default function Notnav({ userName }) {
  return (
  <Navbar expand="lg" className="myNavbar justify-content-between">
    <Navbar.Brand className="brand" href="/"><FontAwesomeIcon icon={faFeatherAlt} /> Social Scrapbook </Navbar.Brand>
    <Nav>
        <a href={userName ? "/api/logout" : "/api/login"}>
          <Button className="navButton" variant="outline-primary">
            <FontAwesomeIcon icon={faGoogle} /> { (userName) ? 'Logout' : 'Sign Up/Log In' } 
          </Button>
        </a>
    </Nav>
  </Navbar>
  )
}