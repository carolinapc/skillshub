import React from 'react';
import API from '../../utils/API';
import PageContainer from '../../components/PageContainer';

class Profile extends React.Component {
  state = {}
  
  componentWillMount = () => {
    //if the user is not logged in redirect to the home page
    if (!this.props.authenticated) {
      window.location.href = "/";
    }
  }

  render() { 
    return ( 
      <PageContainer title="Profile">

      </PageContainer>
    );
  }
}
 
export default Profile;