import React from 'react';
import API from '../../utils/API';
// import BookList from '../../components/BookList';
import PageContainer from '../../components/PageContainer';


class Search extends React.Component {
  state = {
    search: "",
    services: [],
    notFoundMsg: ""
  }
  
  // componentDidMount = () => {
  //   API.getServices()
  //     .then(res => {
  //       this.setState({ services: res.data });
  //     })
  //     .catch(err => console.log(err));
  // }

  // onSubmit = event => {
  //   event.preventDefault();

  // }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() { 
    return (
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

        {/* {this.state.books.length > 0 ? 
          <BookList type="search" saveBook={this.saveBook} books={this.state.books} />
          : this.state.notFoundMsg
        } */}
      </PageContainer>
    );
  }
}
 
export default Search;