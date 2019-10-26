import React from 'react';
import API from '../../utils/API';
import BookList from '../../components/BookList';
import PageContainer from '../../components/PageContainer';

class Saved extends React.Component {
  state = { books: [] };

  componentDidMount = () => {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(() => this.loadBooks())
      .catch(err => console.log(err));
  }

  render() { 
    return (
      <PageContainer title="Saved Books">
        {this.state.books.length > 0 ? 
          <BookList type="saved" deleteBook={this.deleteBook} books={this.state.books} />
          : "No books were found"
        }
      </PageContainer>
    );
  }
}
 
export default Saved;