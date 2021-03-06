import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function MenuTop(props) {
  return (
      
    <Navbar collapseOnSelect fixed="top" className="shadow" expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <NavLink
          exact
          to="/"
          activeClassName="active"
          className="nav-link"
          >
          Skills HUB
        </NavLink>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink
          exact
          to="/about"
          activeClassName="active"
          className="nav-link"
          >
          About
        </NavLink>
        <NavLink
          exact
          to="/search"
          activeClassName="active"
          className="nav-link"
          >
          Search
        </NavLink>
      </Nav>
      <Nav>
        
        {/* show buttons according to authentication status */}
        {props.authenticated ?
            <NavDropdown title={<><i className="fas fa-user"></i> {props.userInfo.UserName}</>} id="basic-nav-dropdown" className="menu-auth">
              <NavDropdown.Item href="/contact/request">Your Requests</NavDropdown.Item>
              <NavDropdown.Item href="/contact/client">Your Clients</NavDropdown.Item>
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => props.signOut()}>Sign-Out</NavDropdown.Item>
            </NavDropdown>
            :
            <>
              <Nav.Link className="nav-link" onClick={() => props.toggleAuthModalShow("signin")}>Sign-In</Nav.Link>
              <Nav.Link className="nav-link" onClick={() => props.toggleAuthModalShow("signup")}>Sign-Up</Nav.Link>
            </>
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>   
  );
}

export default MenuTop;
