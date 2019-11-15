import React from 'react';

export default {
  
  getStars: score => {
    let stars = [];
    for (let i = 1; i <= score; i++){
      stars.push(<i key={i} className="fas fa-star"></i>);  
    }
    return stars;
  },

  getPriceTypes: () => {
    const priceTypes = [
      {
        type: "H",
        name: "Per Hour"
      },
      {
        type: "D",
        name: "Per Day"
      },
      {
        type: "J",
        name: "Per Job"
      }
    ];
    return priceTypes;
  },

  getPriceTypeName: type => {
    switch (type.toUpperCase()) {
      case "H":
        return "hour";
      case "D":
        return "day";
      case "J":
        return "job";
      default:
        return "undefined";
    }
  },

  getDealStatusName: type => {
    switch (type.toUpperCase()) {
      case "O":
        return "Opened";
      case "D":
        return "Denied";
      case "P":
        return "Pending Confirmation";
      case "C":
        return "Closed";
      default:
        return "undefined";
    }
  },

  replaceNewLines: text => {
    return text.split("\n").map((item, key) => <React.Fragment key={key}>{item}<br /></React.Fragment>);
  }
}