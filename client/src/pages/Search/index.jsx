import React from 'react';
import API from '../../utils/API';
import {Form, Button, Row, Col} from 'react-bootstrap';
import PageContainer from '../../components/PageContainer';
import SkillsSearchList from './SkillsSearchList';


class Search extends React.Component {
  mounted = false;

  state = {
    search: "",
    zipCode: "",
    skills: [],
    categoryId: "",
    categories: [],
    notFoundMsg: ""
  }
  
  componentDidMount = () => {
    this.mounted = true;
    const params = new URLSearchParams(this.props.location.search);
    let data = {};

    data.categoryId = params.get('category') || "";
    data.search = params.get('search') || "";
    data.zipCode = params.get('postal') || "";

    if (this.mounted) {
      this.setState({
        categoryId: data.categoryId,
        search: data.search,
        zipCode: data.zipCode
      });  
    }
    
    this.searchSkills(data);

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

  searchSkills = data => {
    
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

    let data = {
      search: this.state.search || "",
      categoryId: this.state.categoryId || "",
      zipCode: this.state.zipCode || ""
    }
    this.searchSkills(data);

  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
          <Col md="12">
            <Form.Control as="select" name="categoryId" onChange={this.handleInputChange} value={this.state.categoryId||""}>
              <option key="blankCategory" value="">-- All Categories --</option>
              {this.state.categories.map(category => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                );
              })}
            </Form.Control>
            <Button variant="secondary" onClick={this.handleSearch} className="mt-3">Search</Button>
            {this.state.skills.length > 0 ? 
              <SkillsSearchList skills={this.state.skills} />
              : <div className="message">{this.state.notFoundMsg}</div>
            }
          </Col>
        </Row>
    </PageContainer>
    );
  }
}
 
export default Search;