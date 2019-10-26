import React from 'react';
import './style.css';

const BookList = props => {

  const renderButtons = (book) => {
    if (props.type === "search") {
      if (book._id.trim() !== "") {
        return (
          <button disabled className="btn btn-outline-success"><i className="fas fa-check"></i> Saved</button>
        );
      }
      else {
        return (
          <button className="btn btn-outline-secondary" onClick={() => props.saveBook(book)}>
            <i className="fas fa-cloud"></i> Save
          </button>
        );
      }
    } 
    else {
      return (
        <button className="btn btn-outline-danger" onClick={() => props.deleteBook(book._id)}>
          <i className="far fa-trash-alt"></i> Delete
        </button>
      );
    }
  }

  return (
    <>
      {props.books.map(book => {
        const { id, authors, title, description, image, link } = book;
        return (
          <div className="card shadow-sm bg-light" key={id}>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div className="wrap-button">
                <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary"><i className="fas fa-external-link-alt"></i> View</a>
                {renderButtons(book)}
              </div>
              <h6 className="card-subtitle mb-2 text-muted">Written by {authors}</h6>
              <p className="card-text">
                <img src={image} alt={title} className="shadow-lg" />
                {description}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
 
export default BookList;