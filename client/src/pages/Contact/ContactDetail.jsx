import React from 'react';
import { Button, ButtonToolbar, Card } from 'react-bootstrap';

const ContactDetail = props => {
  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          Contact Details
        </Card.Header>
        <Card.Body>
          <p>Contact started at: {props.contact.createdAt}</p>
          <p>Price: {props.contact.price}</p>
          
          {props.contact.agreedDate ?
            <>
              <p>Deal Date: {props.contact.agreedDate || "N/A"}</p>
              <p>Deal Closed: {props.contact.dealClosed?"Yes":"No"}</p>
            </>
          :
            <>
              <Button variant="secondary">Make a Deal</Button>
            </>
          }
        </Card.Body>
      </Card>
    </>
  );
}
 
export default ContactDetail;