import React from 'react';
import API from '../../utils/API';
import SkillsList from './SkillsList';
import SkillForm from './SkillForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  //guarantees the setState won't be called after component unmounts
  componentWillUnmount = () => this.mounted = false;

  componentDidMount = () => {
    this.mounted = true;

    this.refreshUserSkills();

    //get all categories
    API.getCategories().then(res => {
      if (res.data) {
        if (this.mounted) {
          this.setState({categories: res.data});
        }
      }
      else {
        console.log("There are no categories stored!");
      }
    }).catch(err => console.log(err.response));
  }

  refreshUserSkills = () => {
    //fill all the fields from database
    API.getUserSkills().then(res => {
      if (res.data) {
        if (this.mounted) {
          this.setState({ userSkills: res.data });
        }
      }
      else {
        console.log("User doesn't have skills registered!");
      }
    }).catch(err => console.log(err.response));
  }

  handleInputChange = event => {
    let { name, value } = event.target;
    let fields = { ...this.state.fields };

    //if it's a checkbox gets the checked value
    if (event.target.type === "checkbox") {
      value = event.target.checked;
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
  
  viewSkillsList = () => this.setState({ editionView: false });

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

  toogleActive = event => {
    const { id, checked } = event.target;
    
    API.updateUserSkill({ active: checked, id }).then(res => {
      let userSkills = [...this.state.userSkills];

      userSkills.map(skill => {
        if (skill.id.toString() === id) {
          skill.active = checked;
        }
        return skill;
      });

      if (this.mounted) {
        this.setState({userSkills});
      }
    }).catch(err => console.log(err.response));
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
          if (this.mounted) {
            this.setState({ controllers });  
          }
          
          this.refreshUserSkills();
          this.viewSkillsList();
          toast.info("Skill was updated successfully",{position: toast.POSITION.BOTTOM_CENTER});
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

          if (this.mounted) {
            this.setState({ controllers: controllers });  
          }
        });
    }
    else {
      API.createUserSkill(this.state.fields)
      .then(res => {
        controllers.message = "Skill was created successfully";
        controllers.isLoading = false;
        if (this.mounted) {
          this.setState({ controllers });
        }
        this.refreshUserSkills();
        this.viewSkillsList();
        toast.info("Skill was created successfully!",{position: toast.POSITION.BOTTOM_CENTER});
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

        if (this.mounted) {
          this.setState({ controllers });
        }
      });

    }
    
  }

  render() {
  
    return (
      <>
        <ToastContainer />
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
            toogleActive={this.toogleActive}
          />
        }
      </>
    );
  }
}
 
export default Skills;