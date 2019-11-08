import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';

export default function WithAuth(ComponentToProtect) {
  return class extends Component {
    mounted = false;
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
        userData: {}
      };
      
    }

    componentDidMount = () => {
      this.mounted = true;
      //check authentication status
      API.getUserSession().then(res => {
        if (this.mounted) {
          if (res.data.loggedin) {
            this.setState({ loading: false, userData: res.data });
          }
          else {
            this.setState({ loading: false, redirect: true });
          }
        }
      }).catch(err => console.log(err));
    }

    componentWillUnmount = () => {
      this.mounted = false;
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect userData={this.state.userData} {...this.props} />
        </React.Fragment>
      );
    }
  }
}