import React from 'react';
import API from '../../utils/API';
import Jumbotron from "../../components/Jumbotron";
import PageContainer from '../../components/PageContainer';
import CategoryList from './CategoryList';


class Home extends React.Component {
  mounted = false;

  state = {
    search: "",
    postalCode: "",
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
    
    this.getPostalCodeFromGps();    
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
    console.log(value);
  }

  pullAllCategories = () => {
    this.searchCategories(true);
  }

  getPostalCodeFromGps = () => {
    //checks whether the browser supports geolocation
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
        API.getPostalCodeFromGeoLocation(position.coords)
          .then(res => {
            if (this.mounted) {
              this.setState({ postalCode: res.data[0].long_name });
            }
          })
          .catch(err => console.log(err));
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    
  }

  render() { 
    return (
    <>
      <Jumbotron />
      <PageContainer title="Search Professionals">

        <form onSubmit={this.onSubmit}>
              
          <div className="search-box">
            <input
              name="search"
              type="text"
              className="search"
              placeholder="What kind of service are you looking for?"
              aria-label="Search"
              aria-describedby="btn-search"
              autoComplete="off"
              list="skills"
              onChange={this.handleInputChange}
              />
            <span className="divider">
              <i className="fas fa-map-marker-alt" title="Get current location" onClick={this.getPostalCodeFromGps}></i>
            </span>
            <input
              name="postalCode"
              type="text"
              className="postal"
              placeholder="Postal Code"
              autoComplete="off"
              value={this.state.postalCode}
              onChange={this.handleInputChange}
            />
            <button
              type="submit"
              className="btn btn-primary"
              id="btn-search"
            >
              <i className="fas fa-search"></i> Search
            </button>
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