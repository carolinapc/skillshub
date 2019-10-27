import React from 'react';
import './style.css';

const Jumbotron = () => {
  return ( 
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4"><i className="far fa-handshake"></i> Skills Hub</h1>
        <p className="lead">A virtual skill sharing platform.</p>
      </div>
    </div>
  );
}
 
export default Jumbotron;