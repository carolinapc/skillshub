import React from 'react';
import { Button, Form, Card, Spinner } from 'react-bootstrap';
import Utils from '../../utils';
import Moment from 'react-moment';

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

  let bgTitleColor = "";
  switch (dealStatus) {
    case "C":
      bgTitleColor = "bg-success";
      break;
    case "P":
      bgTitleColor = "bg-warning";
      break;
    case "D":
      bgTitleColor = "bg-danger";
      break;
    default:
      break;
  }

  return (
    <>
      <Card className="mt-3">
        <Card.Header className={bgTitleColor}>
          Contact Details
        </Card.Header>
        <Card.Body>
          <p><b>Contact started at:</b> <Moment format="MMM Qo YYYY, h:mma">{createdAt}</Moment></p>
          <p><b>Price:</b> $ {price}</p>
          <p><b>Deal Status:</b> {Utils.getDealStatusName(dealStatus)}</p>

          {/* if deal is opened or denied and user is the provider */}
          {((dealStatus === "O" || dealStatus === "D") && providerId === props.userData.UserId) ?
            <>
              <Form.Group controlId="formBasicDescription">
                <Form.Label><b>Note</b></Form.Label>
                <Form.Control as="textarea" rows="5" name="note" value={props.note} placeholder="Enter notes to close the deal" onChange={props.handleInputChange} />
              </Form.Group>

              <Button variant="primary" className="mr-3" onClick={props.loading ? null : () => props.makeDeal(id)} disabled={props.loading}>
                <i className="far fa-handshake text-white"></i> Make a Deal
              </Button>
            </>
          : null} 

          {/* if deal is not opened and not denied */}
          {(dealStatus !== "O" && dealStatus !== "D") ?
            <>
              <p><b>Deal Date:</b> <Moment format="MMM Qo YYYY, h:mma">{dealDate}</Moment></p>
              <p><b>Deal Note:</b> {note}</p>
            </>
          :null}

          {/* if deal is pending confirmation and user is the client*/}
          {dealStatus === "P" && clientId === props.userData.UserId ?
            <>
              <p><b>Do you agree with the deal?</b></p>
              <Button variant="primary" className="mr-3" disabled={props.loading} onClick={props.loading ? null : () => props.answerDeal(true, id)}>
                <i className="far fa-thumbs-up text-white"></i> Yes
              </Button>
              <Button variant="danger" onClick={props.loading ? null : () => props.answerDeal(false, id)} disabled={props.loading}>
                <i className="far fa-thumbs-down text-white"></i> No
              </Button>
            </>
          : null}
          
          {/* if deal is closed */}
          {dealStatus === "C" ?
            <p><b>Agreed Date:</b> <Moment format="MMM Qo YYYY, h:mma">{agreedDate}</Moment></p>
          : null}
          
          {/* if deal is opened or closed*/}
          {dealStatus !== "P" ?
            <Button variant="danger" disabled={props.loading} onClick={props.loading ? null : () => props.removeContact(id)}>
              <i className="fas fa-archive text-white"></i> Archive Contact
            </Button>
          : null} 

          {props.loading ?
            <Spinner animation="grow" variant="success" role="status" className="ml-3">
              <span className="sr-only">Loading...</span>
            </Spinner>
          :null}
        </Card.Body>
      </Card>
    </>
  );
}
 
export default ContactDetail;