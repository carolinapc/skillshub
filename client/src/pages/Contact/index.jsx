import React from 'react';
import PageContainer from '../../components/PageContainer';
import { Form, Row, Col } from 'react-bootstrap';

class Contact extends React.Component {
  state = {
    contactId: "",
    userId: "",
    skillId: ""
  }

  componentDidMount = () => {
    const skillId = this.props.match.params.skill;
    console.log(skillId);
    if (skillId)
      console.log("informed");
    else
      console.log("not informed");
    
  }

  render() { 
    return (
      <PageContainer title="Contact">
        <Row>
          <Col md="4">
            
          </Col>
          <Col md="8">

          </Col>
        </Row>
      </PageContainer>
    );
  }
}
 
export default Contact;