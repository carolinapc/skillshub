import React from 'react';
import API from '../../utils/API';
import SkillsList from './SkillsList';
import SkillForm from './SkillForm';

class Skills extends React.Component {
  mounted = false;

  state = {
    userSkills: [],
    categories: [],
    editionView: false,
    fields: {
      id: "",
      name: "",
      description: "",
      price: "",
      priceType: "",
      zipCode: "",
      active: false,
      CategoryId: ""
    },
    controllers: {
      message: "",
      error: false,
      isLoading: false
    }
  }

  refreshUserSkills = () => {
    //fill all the fields from database
    API.getUserSkills().then(res => {
      if (res.data) {
          this.setState({
            userSkills: res.data
          });
      }
      else {
        console.log("User doesn't have skills registered!");
      }
    }).catch(err => console.log(err.response));
  }

  componentDidMount = () => {
    this.mounted = true;

    this.refreshUserSkills();

    //get all categories
    API.getCategories().then(res => {
      if (res.data) {
        if (this.mounted) {
          this.setState({
            categories: res.data
          });
        }
      }
      else {
        console.log("There are no categories stored!");
      }
    }).catch(err => console.log(err.response));

  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleInputChange = event => {
    let fields = {...this.state.fields};
    let { name, value } = event.target;

    //if it's a checkbox gets the checked value
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }
    else {
      value = value.trim();
    }
      

    fields[name] = value;
    
    this.setState({ fields: fields });
    
  }

  editSkill = skill => {
    this.setState({
      editionView: true,
      fields: skill,
      controllers: {
        error: false,
        message: "",
        isLoading: false
      }
    });
  }
  
  viewSkillsList = () => {
    this.setState({
      editionView: false
    });
  }

  addSkill = () => {
    let skill = {
      id: "",
      name: "",
      description: "",
      price: "",
      priceType: "",
      zipCode: "",
      active: false,
      CategoryId: ""
    };

    this.editSkill(skill);    
  }
  
  saveSkill = () => {
    let controllers = { ...this.state.controlers };
    controllers.error = false;
    controllers.isLoading = true;

    if (this.state.fields.id !== "") {

      API.updateUserSkill(this.state.fields)
        .then(res => {
          controllers.message = "Skill updated successfully";
          controllers.isLoading = false;
          this.setState({ controllers });
          this.refreshUserSkills();
          this.viewSkillsList();
        })
        .catch(err => {
          if (err.response.data.errors) {
            controllers.message = err.response.data.errors[0].message;
          }
          else {
            controllers.message = err.response.data;
          }
        
          controllers.isLoading = false;
          controllers.error = true;
          this.setState({ controllers: controllers });
        });
    }
    else {
      API.createUserSkill(this.state.fields)
      .then(res => {
        controllers.message = "Skill created successfully";
        controllers.isLoading = false;
        this.setState({ controllers });
        this.refreshUserSkills();
        this.viewSkillsList();
      })
      .catch(err => {
        if (err.response.data.errors) {
          controllers.message = err.response.data.errors[0].message;
        }
        else {
          controllers.message = err.response.data;
        }
      
        controllers.isLoading = false;
        controllers.error = true;
        this.setState({ controllers: controllers });
      });

    }
    
  }

  render() {
  
    return (
      <>
        {this.state.editionView ?
          <SkillForm
            skill={this.state.fields}
            handleInputChange={this.handleInputChange}
            controllers={this.state.controllers}
            categories={this.state.categories}
            saveSkill={this.saveSkill}
            viewSkillsList={this.viewSkillsList}
          />
          :
          <SkillsList
            addSkill={this.addSkill}
            editSkill={this.editSkill}
            userSkills={this.state.userSkills}
          />
        }
      </>
    );
  }
}
 
export default Skills;