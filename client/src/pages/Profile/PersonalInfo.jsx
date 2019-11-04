import React from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../../utils/API';

class PersonalInfo extends React.Component {
  mounted = false;

  state = {
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    message: "",
    error: false,
    isLoading: false
  }

  componentDidMount = () => {
    this.mounted = true;
    //fill all the fields from database
    API.getUserAccount().then(res => {
      if (res.data) {
        if (this.mounted) {
          this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            zipCode: res.data.zipCode
          });
        }
      }
      else {
        console.log("User didn't sign in or not found!");
      }
    }).catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  updateInfo = () => {
    const { firstName, lastName, email, zipCode } = this.state;

    API.updateUser({
      firstname: firstName,
      lastName: lastName,
      email: email,
      zipCode: zipCode
    })
    .then(() => {
      this.setState({ message: "Profile info updated successfully", error: false, isLoading: false });
    })
    .catch(err => {
      let message;
      if (err.response.data.errors) {
        message = err.response.data.errors[0].message;
      }
      else {
        message = err.response.data;  
      }
      this.setState({ message, error: true, isLoading:false });
      
    });

  }

  render() {
  
    return (
      <Form>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" value={this.state.firstName} placeholder="Enter first name" onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" value={this.state.lastName} placeholder="Enter last name" onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicZipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="text" name="zipCode" value={this.state.zipCode} placeholder="Zip Code" onChange={this.handleInputChange} />
        </Form.Group>

        <div className={this.state.error?"text-danger":"text-success"}>{this.state.message}</div>  
        
        <Button
          variant="secondary"
          disabled={this.state.isLoading}
          onClick={!this.state.isLoading ? this.updateInfo : null}
        >
          Save
        </Button>
      </Form>
    );
  }
}
 
export default PersonalInfo;