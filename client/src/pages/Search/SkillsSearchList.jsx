import React from 'react';
import './style.css';
import Utils from '../../utils';
import {NavLink} from 'react-router-dom';

const SkillsSearchList = props => {
  
  return (
    <>
      {props.skills.map(skill => {
        return (
          <div className="card shadow-sm bg-light mt-3" key={skill.id}>
            <div className="card-body">
              <h4 className="card-title">{skill.User.firstName}</h4>
              <div className="wrap-price">
                <h4>{Utils.getStars(skill.score)}</h4>  
                <h4>${skill.price + " per " + Utils.getPriceTypeName(skill.priceType)}</h4>
                {skill.distance?<h5>Distance: {skill.distance} km</h5>:null}
              </div>              
              <div className="card-text description">
                <img src={skill.User.image ? `/${skill.User.image}` : "/profile.jpg"} alt="Profile" className="shadow-lg" onError={() => props.handleSkillImgError(skill.id)} />
                <div>
                  <h3 className="card-subtitle mb-2 text-muted">{skill.name}</h3>
                  <h5 className="card-subtitle mb-2 text-muted">{skill.Category.name}</h5>
                  <p>{Utils.replaceNewLines(skill.description)}</p>
                  <NavLink
                    exact
                    to={"/skill/"+skill.id}
                    activeClassName="active"
                    className="btn btn-secondary"
                    >
                    View
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
 
export default SkillsSearchList;