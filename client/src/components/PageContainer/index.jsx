import React from 'react';
import "./style.css";

const PageContainer = props => {
  return (
    <div className="container">
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}
 
export default PageContainer;