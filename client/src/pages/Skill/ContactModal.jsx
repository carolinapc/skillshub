import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import API from '../../utils/API';
import "./style.css";
import io from "socket.io-client";

class ContactModal extends React.Component {
  
  state = {
    text: "",
    error: false,
    message: "",
    isLoading: false
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value } );
  }

  onEnterModal = () => {
    this.setState({text: "", error: false, message: "", isLoading: false});
  }

  submitContact = event => {
    event.preventDefault();
    this.setState({ error: false, message: "", isLoading: true });
    
    //get the text from the contact modal form
    let data = {
      SkillId: this.props.skillId,
      text: this.state.text.trim()
    };

    API.createSkillContact(data).then(res => {
      const socket = io();
      socket.emit("new_contact_created", { destinyUserId: this.props.skillUserId, originUserName: this.props.userData.UserName + " " + this.props.userData.UserLastName });
      //redirect to the chat page opened for this new contact created
      this.props.history.push(`/contact/request/${res.data.id}`);

    }).catch(err => {
      if (err.response.data) {
        this.setState({ error: true, message: err.response.data, isLoading: false });
      }
      else {
        console.log(err);
      }
    });
  }
  
  render() {

    return (
    <Modal show={this.props.show} onHide={this.props.handleCloseModal} onEnter={this.onEnterModal}>
      <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control as="textarea" rows="5" name="text" value={this.state.text||""} placeholder="Type a message..." onChange={this.handleInputChange} />
        <span className={this.state.error?"text-danger":"text-success"}>{this.state.message}</span>  
        <ButtonToolbar className="justify-content-center">
          <Button
            variant="primary"
            disabled={this.state.isLoading}
            className="mr-3 mt-3"
            onClick={!this.state.isLoading ? this.submitContact : null}
          >
            Send
          </Button>
          <Button
            variant="secondary"
            onClick={this.props.handleCloseModal}
            className="mt-3"
          >
            Cancel
          </Button>
        </ButtonToolbar>
      </Modal.Body>
    </Modal>
    );
  }
}
 
export default ContactModal;