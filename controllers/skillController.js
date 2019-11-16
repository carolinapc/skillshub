const db = require("../models");
const geo = require("../utils/geo");

//filter results from findAll method by distance
const filterSkillsByDistance = (results, distance, latitude, longitude) => {
  distance = parseInt(distance);
  let data = results.map(item => {
    item.dataValues.distance = geo.getStraightDistance(item.dataValues, { latitude, longitude }).toFixed(2);
    return item;
  }).filter(item => {
    return item.dataValues.distance <= distance;
  });
  
  return data;
};

// Defining methods for the booksController
module.exports = {
  /*
  Gets all skills filtering by category, search text, id, zipCode and distance range
  */
  findAll: function (req, res) {
    let { search, categoryId, id, zipCode, distanceRange, latitude, longitude } = req.query;
    let where = {active: true};
    let include = [{ all: true }];
    
    if (id) {
      where.id = id;
      include = [{ all: true, nested: true }];
    }
    if (categoryId) {
      where.CategoryId = categoryId;
    }
    if (search) {
      where.name = {
        [db.Sequelize.Op.like]: [`%${search}%`]
      };
    }
    
    db.Skill
      .findAll({
        include: include,
        where: where,
        order:[['createdAt', 'DESC'],[db.Review,'createdAt','DESC']]
      })
      .then(data => {
        
        //if zipCode was passed
        if (zipCode) {
          distanceRange = distanceRange || 5; //default 5km - if the distance ranges wasn't passed
          
          //if geo locattion was passed
          if (latitude && longitude) {
            //filter the results by distance
            res.json(filterSkillsByDistance(data, distanceRange, latitude, longitude));
          }
          else {
            
            //get lat/lng from zip code
            geo.zipToGeo(zipCode).then(resp => {
              const { lat, lng } = resp.data.results[0].geometry.location;
              //filter the results by distance
              res.json(filterSkillsByDistance(data, distanceRange, lat, lng));
            }).catch(err => {
              console.log("Error at skillController->findAll->zipToGeo:", err);
              res.json(data);
            });
          }          
        }
        else {
          res.json(data);
        }
      })
      .catch(err => res.status(422).json(err));
  },

  addReview: function (req, res) {
    //checks if the user is logged in
    if (!req.session.loggedin) {
      res.status(400).end("You need to sign in to update an user.");
    }
    else {
      req.body.UserId = req.session.UserId;      
      db.Review.create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));

    }
  },

  //get all skills without its relations and no filters
  allSkills: function (req, res) {
    db.Skill.findAll()
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}