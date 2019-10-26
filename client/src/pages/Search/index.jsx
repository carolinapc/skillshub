import React from 'react';
import GoogleApi from '../../utils/GoogleAPI';
import API from '../../utils/API';
import BookList from '../../components/BookList';
import PageContainer from '../../components/PageContainer';
import io from "socket.io-client";

class Search extends React.Component {
  state = {
    search: "",
    books: [],
    booksSaved: [],
    notFoundMsg: ""
  }
  
  componentDidMount = () => {
    API.getBooks()
      .then(res => {
        this.setState({ booksSaved: res.data });
      })
      .catch(err => console.log(err));
  }

  onSubmit = event => {
    event.preventDefault();

    //search books on google api
    GoogleApi.getBooks(this.state.search)
      .then(res => {

        if (res.data.totalItems > 0) {
          let books = res.data.items.map(book => {
            const { authors, title, description, imageLinks, infoLink } = book.volumeInfo;
            const image = imageLinks ? imageLinks.thumbnail.replace("http:", "https:") : "https://via.placeholder.com/150x200/C5C5C5/000000?text=no+image";

            //check if the book was saved and get its _id (db id)
            const bookSaved = this.state.booksSaved.filter(bSaved => bSaved.id === book.id);
            const _id = bookSaved.length > 0 ? bookSaved[0]._id : "";
            
            return {
              _id,
              id: book.id,
              title,
              authors: authors.join(", "),
              description,
              image,
              link: infoLink
            }
          });
          
          this.setState({ books });  
        }
        else {
          this.setState({ books: [], notFoundMsg: "No books were found" });  
        }
      })
      .catch(err => {
        this.setState({ books: [], notFoundMsg: "No books were found" });
      });
    
  }

  saveBook = book => {
    delete book._id;
    API.saveBook(book)
      .then((res) => {
        const books = this.state.books.map(b => {
          if (b.id === book.id) {
            b._id = res.data._id;
          }
          return b;
        });

        this.setState({ books });
        
        const socket = io();
        socket.emit("save_book", `The book ${book.title} was saved!`);
      })
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() { 
    return (
      <PageContainer title="Book Search">

        <form onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
            <input
              name="search"
              type="text"
              className="form-control"
              placeholder="Book Title"
              aria-label="Book Title"
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

        {this.state.books.length > 0 ? 
          <BookList type="search" saveBook={this.saveBook} books={this.state.books} />
          : this.state.notFoundMsg
        }
      </PageContainer>
    );
  }
}
 
export default Search;