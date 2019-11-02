import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PageContainer from '../../components/PageContainer';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
import Skills from './Skills';
import "./style.css";


class Profile extends React.Component {
  
  state = {
    image: this.props.userData.image || "profile.jpg",
    pageView: {
      title: "Personal Info",
      page: "info"
    }
  };
  
  selectMenu = event => {
    event.preventDefault();
    const { title, name } = event.target;
    this.setState({
      pageView: {
        title: title,
        page: name
      }
    });
  }

  render() {
    const { pageView, image } = this.state;

    return (
      <PageContainer title="Profile">
        <div className="row">
          <div className="col-md-4">
            <img src={image} alt="profile" className="profile-img" />
            <ListGroup defaultActiveKey="#link1">
              <ListGroup.Item action href="#link1" name="info" title="Personal Info" onClick={this.selectMenu}>
                Personal Info
            </ListGroup.Item>
              <ListGroup.Item action href="#link2" name="skills" title="Skills" onClick={this.selectMenu}>
                Skills
            </ListGroup.Item>
              <ListGroup.Item action href="#link3" name="password" title="Change Password" onClick={this.selectMenu}>
                Change Password
            </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="col-md-8">
            <h4>{pageView.title}</h4>
            {pageView.page === "info"?<PersonalInfo />:null}
            {pageView.page === "skills"?<Skills />:null}
            {pageView.page === "password"?<ChangePassword />:null}
          </div>
        </div>
      </PageContainer>
    );
  }
}
 
export default Profile;