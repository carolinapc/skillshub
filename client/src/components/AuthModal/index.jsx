import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import API from '../../utils/API';


class AuthModal extends React.Component {
  state = {
    email: "",
    password: "",
    message: ""
  }
  
  //authenticate user
  authenticate = event => {
    event.preventDefault();
    const { email, password } = this.state;
    let data = { email, password };

    API.authenticate(data)
      .then(res => {
        this.setState({ message: "" });
        this.props.handleAuthentication(res);
      })
      .catch(err => this.setState({ message: err.response.data }));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value } );
  }

  render() {
    return (
    <Modal show={this.props.show} onHide={this.props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleInputChange} />
          </Form.Group>
        </Form>
        <span className="text-center text-danger">{this.state.message}</span>  
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={this.authenticate}>
          Sign In
        </Button>
      </Modal.Footer>
    </Modal>
    );
  }
}
 
export default AuthModal;