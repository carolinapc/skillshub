import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../../utils/API';

export default function WithAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount = ()=>{
      //check authentication status
      API.getUserSession().then(res => {
        if (res.data.loggedin) {
          this.setState({ loading: false });
        }
        else {
          this.setState({ loading: false, redirect: true });
        }
      }).catch(err => console.log(err.response.data));
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
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}