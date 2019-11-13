import React from 'react';
import { Form, Button, ButtonToolbar, Card } from 'react-bootstrap';

const ContactDetail = props => {
  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          Contact Details
        </Card.Header>
        <Card.Body>
          <Button variant="secondary">View Skill Detail</Button>
          <p>Contact started at: {props.contact.createdAt}</p>
          <p>Price: {props.contact.price}</p>
          <p>Deal closed: {props.contact.dealClosed?"Yes":"No"}</p>
          <p>Agreed Date: {props.contact.agreedDate}</p>
          <p>Do you have a deal? (Respond once you have the answer)</p>
          <ButtonToolbar>
            <Button className="mr-2 mt-3">Yes</Button>
            <Button className="mt-3">No</Button>
          </ButtonToolbar>
        </Card.Body>
      </Card>
    </>
  );
}
 
export default ContactDetail;