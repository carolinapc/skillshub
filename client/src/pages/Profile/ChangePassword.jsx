import React from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../../utils/API';

class ChangePassword extends React.Component {
  state = {
    password: "",
    newPassword: "",
    confirmPassword: "",
    message: "",
    error: false,
    isLoading: false
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value, message: "" });
  }

  updateInfo = () => {
    const { password, confirmPassword, newPassword } = this.state;

    if (newPassword !== confirmPassword) {
      this.setState({ message: "Passwords must match", error: true, isLoading: false });
    }
    else {
      
      API.changePassword({ password, newPassword })
        .then(() => {
          this.setState({ message: "Password updated successfully", error: false, isLoading: false });
        })
        .catch(err => {
          let message;
          if (err.response.data.errors) {
            message = err.response.data.errors[0].message;
          }
          else {
            message = err.response.data;
          }
          this.setState({ message, error: true, isLoading: false });
      
        });
    }
  }

  render() {
  
    return (
      <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBasicNewPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" name="newPassword" value={this.state.newPassword} placeholder="New password" onChange={this.handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" name="confirmPassword" value={this.state.confirmPassword} placeholder="Confirm new password" onChange={this.handleInputChange} />
          </Form.Group>

        <div className={this.state.error?"text-danger":"text-success"}>{this.state.message}</div>  
        
        <Button
          variant="secondary"
          disabled={this.state.isLoading}
          onClick={!this.state.isLoading ? this.updateInfo : null}
          className="mt-3"
        >
          <i className="fas fa-check"></i> Save
        </Button>
      </Form>
    );
  }
}
 
export default ChangePassword;