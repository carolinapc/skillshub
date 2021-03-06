import React, { useEffect } from "react";
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import './style.css';
import Moment from 'moment';
 
const Chat = props => {

  const { contact, text } = props;
  let userDefault;
  
  useEffect(() => {
    props.chatLoaded();
  });
    
  //set an userDefault to handle the baloon class toggle
  try {
    if (contact.chat.length > 0) {
      userDefault = contact.chat[0].user;
    }  
  } catch{
    contact.chat = [];
  }

  let bgTitleColor = "";
  switch (contact.dealStatus) {
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
      <Card>
        <Card.Header className={bgTitleColor}>
          {`${contact.contactName} - ${contact.skillName}`}
        </Card.Header>
        <Card.Body>
          <div className="chat" ref={props.refChatScreen}>
            {contact.chat.map((line, i) => {
              let toggleClass = "speech-bubble";
              toggleClass += (line.user === userDefault) ? " bold" : "";

              return (
                <div className={toggleClass} key={i}>
                  {line.text}
                  <p>{line.user} <br/> {Moment(line.dateTime,"YYYYMMDDHHMMSS").format("h:mma MMM Qo YYYY ")}</p>
                </div>
              );
            })}
          </div>
          <Form>
            <Form.Control ref={props.refChatText} autoComplete="off" type="text" disabled={props.loading} name="text" value={text||""} placeholder="Type a message..." onChange={props.handleInputChange} />
            <Button type="submit" disabled={props.loading || props.text.trim() === ""} className="mt-2 inline" onClick={props.loading || props.text.trim() === "" ? null : props.submitMessage}>{props.loading ? "sending..." : "send"}</Button>
            {props.loading ?
              <Spinner animation="grow" variant="success" role="status" className="ml-3">
                <span className="sr-only">Loading...</span>
              </Spinner>
            :null}
          </Form>
        </Card.Body>
      </Card>
    </>
  );

}
 
export default Chat;