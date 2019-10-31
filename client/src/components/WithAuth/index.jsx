import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default function WithAuth(ComponentToProtect) {
  return class extends Component {
    render() {
      if (!this.props.authenticated) {
        return <Redirect to="/" />;
      }
      else {
        return (
          <React.Fragment>
            <ComponentToProtect {...this.props} />
          </React.Fragment>
        );
      }
    }
  }
}