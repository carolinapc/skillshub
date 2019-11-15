import React from 'react';
import API from '../../utils/API';
import PageContainer from '../../components/PageContainer';
import {Row, Col, Card, Image, Button} from 'react-bootstrap'
import Utils from '../../utils';
import './style.css';


class UserProfile extends React.Component {
  mounted = false;

  state = {
    data: {
        firstName: "",
        Skills: []
    }
  }

  componentDidMount = () => {
    this.mounted = true;
    const userId = this.props.match.params.id;
    API.userProfile(userId)
      .then(res => {
          if(this.mounted){
              this.setState({data: res.data});
          }
      })
      .catch(err=>console.log(err.response));
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  
  render() {
    const {firstName, lastName,  Skills, image } = this.state.data; 
    return (
        <PageContainer title="Profile">
            <Row>
                <Col xs="6" md="3">
                    <Image src={image?`/${image}`:"/profile.jpg"} thumbnail className="mb-3" /> 
                    <h4>{firstName + " " + lastName}</h4>
                </Col>
                <Col xs="6" md="9">
                    <h4>Skills</h4>
                    <div className="wrap-skills">
                    {Skills.length > 0 ?
                        Skills.map(skill => {
                            return(
                            <Card bg="light" key={skill.id} className="mx-2 mb-2">
                                <Card.Header>{skill.name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{Utils.getStars(skill.score)}</Card.Title>
                                    <Card.Text>{Utils.replaceNewLines(skill.description)}</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="link" href={`/skill/${skill.id}`}>view more</Button>
                                </Card.Footer>
                            </Card>
                            );  
                        })
                    : "There are no skills"}
                    </div>
                </Col>
            </Row>
      </PageContainer>
    );
  }
}
 
export default UserProfile;