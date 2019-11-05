import React from 'react';
import './style.css';

const SkillsSearchList = props => {
  const getStars = (score)=>{
    let stars = [];
    for (let i = 1; i <= score; i++){
      stars.push(<i key={i} className="fas fa-star"></i>);  
    }
    return stars;
  }

  return (
    <>
      {props.skills.map(skill => {
        return (
          <div className="card shadow-sm bg-light" key={skill.id}>
            <div className="card-body">
              <h4 className="card-title">{skill.User.firstName}</h4>
              <div className="wrap-price">
                <h4>${skill.price + " per " + props.getPriceTypeName(skill.priceType)}</h4>
                <h4>{getStars(skill.score)}</h4>  
              </div>              
              <div className="card-text">
                <img src={skill.User.image||"/profile.jpg"} alt="Profile" className="shadow-lg" />
                <h3 className="card-subtitle mb-2 text-muted">{skill.name}</h3>
                <h5 className="card-subtitle mb-2 text-muted">{skill.Category.name}</h5>
                <p>{skill.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
 
export default SkillsSearchList;