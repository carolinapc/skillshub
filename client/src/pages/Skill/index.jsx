import React from 'react';
import API from '../../utils/API';
import Utils from '../../utils';
import PageContainer from '../../components/PageContainer';
import { Row, Col, Button } from 'react-bootstrap';
import Reviews from './Reviews';

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
    found: false
  };
  
  componentDidMount = () => {
    this.mounted = true;

    let data = { id: this.props.match.params.id };

    //get all categories to fill dropdown list
    API.getSkills(data).then(res => {
      if (res.data.length > 0) {
        if (this.mounted) {
          console.log(res.data[0]);
          this.setState({ skill: res.data[0], found: true });
        }
      }
    }).catch(err => console.log(err.response));
    
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() { 
    const { skill, found } = this.state;
    
    return (
      <>
      {found?
      <PageContainer title="">
        <Row className="mt-4">
          <Col md="3">
            <img src={skill.User.image? `/${skill.User.image}` : "/profile.jpg"} alt="Profile" className="profile-img shadow-lg mb-4" />
            <h3 className="card-subtitle mb-2 text-muted">{skill.User.firstName + " " + skill.User.lastName}</h3>
            <Button>View Profile</Button>
            <Button>Chat</Button>
          </Col>
          <Col md="9">
            <h3>{skill.name}</h3>
            <h4>{skill.Category.name}</h4>
            <div className="skill-description">{skill.description}</div>
            <h6>Price: ${skill.price + " per " + Utils.getPriceTypeName(skill.priceType)}</h6>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <hr />
            <h3>Reviews</h3>
            <h3>{Utils.getStars(skill.score)}</h3>
            <Reviews reviews={skill.Reviews} />
          </Col>            
        </Row>  
      </PageContainer>
      : <PageContainer title="Skill was not found!" />}
    </>
    );
  }
}
 
export default Skill;