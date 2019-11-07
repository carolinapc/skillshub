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