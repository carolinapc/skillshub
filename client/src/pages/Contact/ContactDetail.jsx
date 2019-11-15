import React from 'react';
import { Button, Form, Card } from 'react-bootstrap';
import Utils from '../../utils';

const ContactDetail = props => {

  const {
    id,
    createdAt,
    price,
    dealDate,
    dealStatus,
    providerId,
    clientId,
    note,
    agreedDate
  } = props.contact;

  return (
    <>
      <Card className="mt-3">
        <Card.Header>
          Contact Details
        </Card.Header>
        <Card.Body>
          <p>Contact started at: {createdAt}</p>
          <p>Price: $ {price}</p>
          <p>Deal Status: {Utils.getDealStatusName(dealStatus)}</p>

          {/* if deal is opened or denied and user is the provider */}
          {((dealStatus === "O" || dealStatus === "D") && providerId === props.userData.UserId) ?
            <>
              <Form.Group controlId="formBasicDescription">
                <Form.Label>Note</Form.Label>
                <Form.Control as="textarea" rows="5" name="note" value={props.note} placeholder="Enter notes to close the deal" onChange={props.handleInputChange} />
              </Form.Group>

              <Button variant="primary" className="mr-3" onClick={()=>props.makeDeal(id)}>Make a Deal</Button>
            </>
          : null} 

          {/* if deal is opened */}
          {dealStatus === "O" ? <Button variant="danger" onClick={()=>props.removeContact(id)}>Remove Contact</Button> : null} 
          
          {/* if deal is not opened and not denied */}
          {(dealStatus !== "O" && dealStatus !== "D") ?
            <>
              <p>Deal Date: {dealDate}</p>
              <p>Deal Note: {note}</p>
            </>
          :null}

          {/* if deal is pending confirmation and user is the client*/}
          {dealStatus === "P" && clientId === props.userData.UserId ?
            <>
              <p>Do you agree with the deal?</p>
              <Button variant="primary" className="mr-3" onClick={()=>props.answerDeal(true,id)}>Yes</Button>
              <Button variant="danger" onClick={()=>props.answerDeal(false,id)}>No</Button>
            </>
          : null}
          
          {/* if deal is closed */}
          {dealStatus === "C" ?
            <p>Agreed Date: {agreedDate}</p>
          : null}
          

        </Card.Body>
      </Card>
    </>
  );
}
 
export default ContactDetail;