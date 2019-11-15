import React, { useEffect } from "react";
import { Form, Button, Card } from 'react-bootstrap';
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
  
  return (
    <>
      <Card>
        <Card.Header>
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
            <Button type="submit" disabled={props.loading||props.text.trim()===""} className="mt-2 inline" onClick={props.loading||props.text.trim()===""?null:props.submitMessage}>{props.loading?"sending...":"send"}</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );

}
 
export default Chat;