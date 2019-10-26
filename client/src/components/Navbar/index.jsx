import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Navbar() {

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow-lg">
        <NavLink className="navbar-brand" to="/">
          Google Books
        </NavLink>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-link"
              >
                Search
            </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/saved"
                activeClassName="active"
                className="nav-link"
              >
                Saved
            </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
}

export default Navbar;
