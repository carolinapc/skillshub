import React from 'react';
import API from '../../utils/API';
import Jumbotron from "../../components/Jumbotron";
import PageContainer from '../../components/PageContainer';
import CategoryList from './CategoryList';


class Home extends React.Component {
  mounted = false;

  state = {
    search: "",
    postalcode: "",
    services: [],
    categories: [],
    notFoundMsg: "",
    showingAllCategories: false,
    skills: []
  }
  
  componentDidMount = () => {
    this.mounted = true;
    this.searchCategories(false);

    API.allSkills()
      .then(res => this.setState({ skills: res.data }))
      .catch(err => console.log(err));
    
    //checks whether the browser supports geolocation
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        API.getPostalCodeFromGeoLocation(position.coords)
          .then(res => console.log("res",res))
          .catch(err => console.log(err));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  
  searchCategories = nolimit => {

    API.getCategoriesMostAvailable(nolimit)
    .then(res => {
      if (this.mounted) {
        this.setState({ categories: res.data, showingAllCategories: nolimit });
      }
    })
    .catch(err => console.log(err.response));

  }

  onSubmit = event => {
    event.preventDefault();
    this.props.history.push(`search/skill/${this.state.search}`);
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  pullAllCategories = () => {
    this.searchCategories(true);
  }

  render() { 
    return (
    <>
      <Jumbotron />
      <PageContainer title="Search Professionals">

        <form onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="What kind of service are you looking for?"
              aria-label="Search"
              aria-describedby="btn-search"
              autoComplete="off"
              list="skills"
              onChange={this.handleInputChange}
              />
            <input
              name="postalcode"
              type="text"
              placeholder="Postal Code"
              autoComplete="off"
              onChange={this.handleInputChange}
            />
            <div className="input-group-append">
              <button
                type="submit"
                className="btn btn-outline-secondary"
                id="btn-search"
              >
                <i className="fas fa-search"></i> Search
              </button>
            </div>
          </div>
        </form>
        <datalist id="skills">
          {this.state.skills.map(skill => (
            <option value={skill.name} key={skill.id} />
          ))}
        </datalist>

        {this.state.categories.length > 0 ? 
          <CategoryList categories={this.state.categories} pullAllCategories={this.pullAllCategories} showingAllCategories={this.state.showingAllCategories} />
          : null
        }
      </PageContainer>
    </>
    );
  }
}
 
export default Home;