import React from 'react';
import { Modal, Button, ButtonToolbar } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import API from '../../utils/API';
import "./style.css";


class AuthModal extends React.Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    message: "",
    error: false,
    modalSetup: {
      title: "Sign In",
      showFirstName: false,
      showLastName: false,
      showPassword: true,
      showEmail: true,
      showLinkSignUp: true,
      showLinkReset: true,
      showLinkSignIn: false,
      showBtnSignUp: false,
      showBtnReset: false,
      showBtnSignIn: true
    }
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
      .catch(err => this.setState({ message: err.response.data, error:true }));
  }

  //create an account
  signUp = event => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;
    let data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    };

    API.signUp(data)
      .then(res => {
        this.setupModal("signin");
        this.setState({ message: "Account was created successfully", error: false });
      })
      .catch(err => {
        let message;
        if (err.response.data.errors) {
          message = err.response.data.errors[0].message;
        }
        else {
          message = err.response.data;  
        }
        this.setState({ message, error: true });
        
      });
  }

  //send new password to user email
  resetPassword = event => {
    event.preventDefault();
    const { email, password } = this.state;
    let data = { email, password };

    API.authenticate(data)
      .then(res => {
        this.setState({ message: "", error:false });
        this.props.handleAuthentication(res);
      })
      .catch(err => this.setState({ message: err.response.data, error: true }));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value } );
  }

  //--- Begin of handling modal view state -----------------------

  setupModal = viewType => {
    let modalSetup = {};
    
    if (viewType === "signup") {
      modalSetup = {
        title: "Sign Up",
        showFirstName: true,
        showLastName: true,
        showPassword: true,
        showEmail: true,
        showLinkSignUp: false,
        showLinkReset: false,
        showLinkSignIn: true,
        showBtnSignUp: true,
        showBtnReset: false,
        showBtnSignIn: false
      };
    }
    else if (viewType === "resetpwd") {
      modalSetup = {
        title: "Reset Password",
        showFirstName: false,
        showLastName: false,
        showPassword: false,
        showEmail: true,
        showLinkSignUp: true,
        showLinkReset: false,
        showLinkSignIn: true,
        showBtnSignUp: false,
        showBtnReset: true,
        showBtnSignIn: false
      };          
    }
    else {
      modalSetup = {
        title: "Sign In",
        showFirstName: false,
        showLastName: false,
        showPassword: true,
        showEmail: true,
        showLinkSignUp: true,
        showLinkReset: true,
        showLinkSignIn: false,
        showBtnSignUp: false,
        showBtnReset: false,
        showBtnSignIn: true
      };
    }

    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      message: "",
      modalSetup
    });

  }

  signUpForm = event => {
    event.preventDefault();
    this.setupModal("signup");
  }

  signInForm = event => {
    event.preventDefault();
    this.setupModal("signin");
  }

  resetPasswordForm = event => {
    event.preventDefault();
    this.setupModal("resetpwd");
  }

  onEnterModal = () => {
    this.setupModal(this.props.viewType);
  }
  //--- End of handling modal view state -----------------------

  render() {
    const { title,
      showEmail,
      showFirstName,
      showLastName,
      showPassword,
      showLinkReset,
      showLinkSignIn,
      showLinkSignUp,
      showBtnReset,
      showBtnSignIn,
      showBtnSignUp
    } = this.state.modalSetup;

    return (
    <Modal show={this.props.show} onHide={this.props.handleCloseModal} onEnter={this.onEnterModal}>
      <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className={showFirstName?"":"hide-self"} controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" name="firstName" value={this.state.firstName} placeholder="Enter first name" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group className={showLastName?"":"hide-self"} controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" name="lastName" value={this.state.lastName} placeholder="Enter last name" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className={showEmail?"":"hide-self"}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className={showPassword?"":"hide-self"}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
          </Form.Group>
        </Form>
          <span className={this.state.error?"text-danger":"text-success"}>{this.state.message}</span>  
          <ButtonToolbar className="justify-content-center">
            <Button variant="secondary" className={showBtnSignIn?"":"hide-self"} block onClick={this.authenticate}>
              Sign In
            </Button>
            <Button variant="secondary" className={showBtnSignUp?"":"hide-self"} block onClick={this.signUp}>
              Sign Up
            </Button>
            <Button variant="secondary" className={showBtnReset?"":"hide-self"} block onClick={this.resetPassword}>
              Reset Password
            </Button>
          </ButtonToolbar>
          <ButtonToolbar className="justify-content-center">
            <Button variant="link" onClick={this.signUpForm} className={showLinkSignUp?"":"hide-self"}>Create an account</Button>
            <Button variant="link" onClick={this.signInForm} className={showLinkSignIn?"":"hide-self"}>Sign In</Button>
            <Button variant="link" onClick={this.resetPasswordForm} className={showLinkReset?"":"hide-self"}>Forgot password</Button>
          </ButtonToolbar>
      </Modal.Body>
    </Modal>
    );
  }
}
 
export default AuthModal;