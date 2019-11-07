import React from 'react';
import API from '../../utils/API';
import Utils from '../../utils';
import PageContainer from '../../components/PageContainer';
import { Row, Col, Button } from 'react-bootstrap';
import Reviews from './Reviews';
import ReviewForm from './ReviewForm';
import {NavLink} from 'react-router-dom';

class Skill extends React.Component {
  mounted = false;

  state = {
    skill: {
      name: "",
      price: "",
      priceType: "",
      score: 0,
      User: {
        firstName: "",
        lastName: "",
        image: "/profile.jpg"
      },
      Reviews: []
    },
    found: false,
    loggedin: false
  };
  
  componentDidMount = () => {
    this.mounted = true;
    let data = { id: this.props.match.params.id };

    if (!this.props.userData) {
      if (this.mounted) {
        //check user session
        API.getUserSession().then(res => {
          this.setState({ loggedin: res.data.loggedin });
        });
      }
    }
    this.getSkillFromDb(data);        
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getSkillFromDb = data => {
    //get skill from database
    API.getSkills(data).then(res => {
      if (res.data.length > 0) {
        //console.log(res.data[0]);
        this.setState({ skill: res.data[0], found: true });
      }
    }).catch(err => console.log(err.response));
  }

  render() { 
    const { skill, found } = this.state;
    
    return (
      <>
      {found?
      <PageContainer title="">
        <Row className="mt-5">
          <Col md="4">
            <img src={skill.User.image? `/${skill.User.image}` : "/profile.jpg"} alt="Profile" className="profile-img shadow-lg mb-4" />
            <h3 className="card-subtitle mb-2 text-muted">{skill.User.firstName + " " + skill.User.lastName}</h3>
            <Button className="mr-3"><i class="far fa-user-circle"></i> View Profile</Button>
            {(this.state.loggedin || this.props.userData.loggedin) ?
              <NavLink
                exact
                to={"/contact/" + skill.id}
                activeClassName="active"
                className="btn btn-primary mr-3"
              >
                  <i class="far fa-comments"></i> Contact
              </NavLink>
            :
              <Button className="btn-secondary mr-3" onClick={() => this.props.toggleAuthModalShow("signin")}>Sign-In to Contact</Button>
            }
          </Col>
          <Col md="8" className="pt-3">
            <div className="skill-header">
              <h4>{skill.name}</h4>
              <div>
                <h4>Price: ${skill.price + " per " + Utils.getPriceTypeName(skill.priceType)}</h4>
                <h5>{skill.score}.0 {Utils.getStars(skill.score)} ({skill.Reviews.length})</h5>  
              </div>
            </div>    

            <div className="skill-description">{Utils.replaceNewLines(skill.description)}</div>
            
          </Col>
        </Row>
        <Row className="border-top mt-4 p-2">
          <Col md="4">
            {(this.state.loggedin || this.props.userData.loggedin )?
            <ReviewForm skillId={skill.id} getSkillFromDb={this.getSkillFromDb} />
            : "Sign in to add a review"
            }
          </Col>            
          <Col md="8">
            <h3>Reviews</h3>
            
            <Reviews reviews={skill.Reviews}/>
          </Col>
        </Row>  
      </PageContainer>
      : <PageContainer title="Skill was not found!" />}
    </>
    );
  }
}
 
export default Skill;