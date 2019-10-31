import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function MenuTop(props) {
  return (
      
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand>
      <NavLink
          exact
          to="/"
          activeClassName="active"
          className="nav-link"
          >
          SkillsHub
        </NavLink>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavLink
          exact
          to="/"
          activeClassName="active"
          className="nav-link"
          >
          Search
        </NavLink>
      </Nav>
      <Nav>
        
        {/* show buttons according to authentication status */}
        {props.authenticated ?
            <>
              <NavDropdown title={<><i className="fas fa-user"></i> {props.userInfo.UserName}</>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => props.signOut()}>Sign-Out</NavDropdown.Item>
              </NavDropdown>
            </>
          :
          <Nav.Link className="nav-link" onClick={() => props.toggleAuthModalShow()}>Sign-In</Nav.Link>
        }
          
        <NavLink  
          exact
          to="/signup"
          activeClassName="active"
          className="nav-link"
          >
          Sign-Up
        </NavLink>
        
      </Nav>
    </Navbar.Collapse>
  </Navbar>   
  );
}

export default MenuTop;
