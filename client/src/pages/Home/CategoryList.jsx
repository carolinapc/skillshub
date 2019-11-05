import React from 'react';
import { Card, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './style.css';

const CategoryList = props => {

  return (
    <Row className="justify-content-md-center mt-5">
      {props.categories.map(category => {
        return (
          <Link key={category.id} to={`/search/${category.id}`} role="button" className="btn btn-link">
            <Card style={{ width: '18rem' }} className="shadow">
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </Row>
  );
}
 
export default CategoryList;