import React from 'react';
import './style.css';

const Jumbotron = () => {
  return ( 
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4"><i className="fas fa-book"></i> Google Books Search</h1>
        <p className="lead">Search for and save books of interest.</p>
      </div>
    </div>
  );
}
 
export default Jumbotron;