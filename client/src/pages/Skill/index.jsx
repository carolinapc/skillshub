import React from 'react';
import API from '../../utils/API';
import Utils from '../../utils';
import PageContainer from '../../components/PageContainer';
import { Row, Col, Button } from 'react-bootstrap';
import Reviews from './Reviews';
import ReviewForm from './ReviewForm';
import { NavLink } from 'react-router-dom';
import ContactModal from './ContactModal';

class Skill extends React.Component {
  mounted = false;

  state = {
    skill: {
      id: "",
      name: "",
      price: "",
      priceType: "",
      score: 0,
      UserId: "",
      User: {
        firstName: "",
        lastName: "",
        image: "/profile.jpg"
      },
      Reviews: []
    },
    found: false,
    contactText: "",
    showContactModal: false
  };
  
  componentDidMount = () => {
    this.mounted = true;
    let data = { id: this.props.match.params.id };

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

  contactHandle = () => {

    //checks if the contact is already opened (or still opened)
    API.getSkillContact(this.state.skill.id).then(res => {
      //if it was found
      if (res.data) {
        //redirect to the requests page with the opened chat
        this.props.history.push(`/contact/request/${res.data.id}`);
      }
      else {
        //opens a modal to create a new contact
        this.setState({ showContactModal: true });
      }
    }).catch(err => console.log(err));
  }

  closeContactModal = () => this.setState({ showContactModal: false });
  
  handleImgError = () => {
    let skill = this.state.skill;
    skill.User.image = "profile.jpg";
    this.setState({ skill });
  }

  handleReviewsImgError = reviewId => {
    let skill = this.state.skill;
    skill.Reviews.map(review => {
      if (review.id === reviewId) {
        review.User.image = "profile.jpg";
      }
      return review;
    });
    this.setState({ skill });
  }

  render() { 
    const { skill, found } = this.state;
    
    return (
      <>
      {found?
        <PageContainer title="">
          <Row className="mt-5">
            <Col md="4">
              <img src={skill.User.image? `/${skill.User.image}` : "/profile.jpg"} alt="Profile" className="profile-img shadow-lg mb-4" onError={this.handleImgError} />
              <h3 className="card-subtitle mb-2 text-muted">{skill.User.firstName + " " + skill.User.lastName}</h3>
              <NavLink
                exact
                to={"/profile/"+skill.UserId}
                activeClassName="active"
                className="btn btn-secondary mr-3"
                >
                <i className="far fa-user-circle"></i> View Profile
              </NavLink>
              {(this.props.userData.loggedin) ?
                <Button
                  className="btn btn-secondary"
                  onClick={this.contactHandle}
                >
                  <i className="far fa-comments"></i> Contact
                </Button>
              :
                <Button className="btn-danger mr-3" onClick={() => this.props.toggleAuthModalShow("signin")}>Sign-In to Contact</Button>
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
            {(this.props.userData.loggedin )?
              <ReviewForm skillId={skill.id} getSkillFromDb={this.getSkillFromDb} />
            :
              "Sign in to add a review"
            }
            </Col>            
            <Col md="8">
              <h3>Reviews</h3>
              
              <Reviews reviews={skill.Reviews} handleReviewsImgError={this.handleReviewsImgError}/>
            </Col>
          </Row>  
        </PageContainer>
      :
        <PageContainer title="Skill was not found!" />
      }
        
      <ContactModal
        handleCloseModal={this.closeContactModal}
        show={this.state.showContactModal}
        skillId={skill.id}
        skillUserId={skill.UserId}
        {...this.props}
      />
    </>
    );
  }
}
 
export default Skill;