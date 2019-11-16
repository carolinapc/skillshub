import React from 'react';
import API from '../../utils/API';
import {Form, Button, Row, Col} from 'react-bootstrap';
import PageContainer from '../../components/PageContainer';
import SkillsSearchList from './SkillsSearchList';


class Search extends React.Component {
  mounted = false;
  
  constructor(props) {
    super(props);
    let params = new URLSearchParams(this.props.location.search);

    this.state = {
      categoryId: params.get('category') || "",
      search: params.get('search') || "",
      zipCode: params.get('postal') || "",
      latitude: params.get('lat') || "",
      longitude: params.get('lng') || "",
      distanceRange: "5",
      skills: [],
      categories: [],
      notFoundMsg: ""
    }
  }

  componentDidMount = () => {
    this.mounted = true;

    this.searchSkills();

    //get all categories to fill dropdown list
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

  componentWillUnmount() {
    this.mounted = false;
  }

  searchSkills = () => {
    let data = {
      search: this.state.search || "",
      categoryId: this.state.categoryId || "",
      zipCode: this.state.zipCode || "",
      distanceRange: this.state.distanceRange || "",
      latitude: this.state.latitude || "",
      longitude: this.state.longitude || ""
    }
    
    //get all skills filtering by data passed
    API.getSkills(data)
      .then(res => {
        if (this.mounted) {
          if (res.data.length > 0) {
            this.setState({ skills: res.data, notFoundMsg: "" });
          }
          else {
            this.setState({ skills:[],notFoundMsg: "Sorry... skills not found" });
          }
        }
      })
      .catch(err => {
        this.setState({ skills: [], notFoundMsg: "Oops.. something is wrong. Please try again." });
      });
  }

  handleSearch = event => {
    event.preventDefault();
    this.searchSkills();
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    //if a new postal code is informed then it cleans the geo location
    if (name === "zipCode") {
      this.setState({ [name]: value, latitude: "", longitude: "" });  
    }
    else {
      this.setState({ [name]: value });  
    }
    
  }

  handleSkillImgError = skillId => {
    let skills = this.state.skills;
    skills.map(skill => {
      if (skill.id === skillId) {
        skill.User.image = "profile.jpg";
      }
      return skill;
    });
    this.setState({ skills });
  }

  render() { 
    return (
      <PageContainer title="Search Skills">
        <Row>
          <Col md="6">
            <Form.Group controlId="formBasicName">
              <Form.Label>Search</Form.Label>
              <Form.Control type="text" name="search" value={this.state.search||""} placeholder="Enter a skill to search" onChange={this.handleInputChange} />
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group controlId="formBasicPostal">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control type="text" name="zipCode" value={this.state.zipCode || ""} placeholder="Postal Code" onChange={this.handleInputChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="categoryId" onChange={this.handleInputChange} value={this.state.categoryId||""}>
              <option key="blankCategory" value="">-- All Categories --</option>
              {this.state.categories.map(category => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                );
              })}
            </Form.Control>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="formControlRange">Distance Range: {this.state.distanceRange} km</label>
              <input type="range" name="distanceRange" className="custom-range" min="5" max="100" step="1" id="formControlRange" value={this.state.distanceRange} onChange={this.handleInputChange} />
            </div>
          </Col>
        </Row>
        <Row className="mb-4 mt-0">
          <Col md="12">
            <Button variant="secondary" onClick={this.handleSearch} className="mt-3">Search</Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {this.state.skills.length > 0 ? 
              <SkillsSearchList skills={this.state.skills} handleSkillImgError={this.handleSkillImgError} />
              : <div className="message">{this.state.notFoundMsg}</div>
            }
          </Col>
        </Row>
    </PageContainer>
    );
  }
}
 
export default Search;