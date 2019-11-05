import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PageContainer from '../../components/PageContainer';
import PersonalInfo from './PersonalInfo';
import ChangePassword from './ChangePassword';
import Skills from './Skills';
import API from '../../utils/API';
import "./style.css";


class Profile extends React.Component {
  
  state = {
    image: this.props.userData.UserImage || "profile.jpg",
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

  onChangeHandler=event=>{
    const data = new FormData();
    data.append('file', event.target.files[0]);

    //--picture preview
    let reader = new FileReader();
     
    reader.onloadend = () => {
      this.setState({
        image: reader.result
      });
      
      API.updateUser(data)
        .then(res => console.log(res))
        .catch(err => console.log(err.response));
    }  
    reader.readAsDataURL(event.target.files[0]);
    //------

}

  render() {
    const { pageView, image } = this.state;

    return (
      <PageContainer title="Profile">
        <div className="row">
          <div className="col-md-4">
            
            <label htmlFor="file" className="input-file">
              <img src={image} alt="profile" className="profile-img shadow" />
              <span>Click to change the image</span>
              <input type="file" id="file" name="file" onChange={this.onChangeHandler}/>
            </label>
            
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