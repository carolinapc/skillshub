import React from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './style.css';

const CategoryList = props => {
  
  return (
    <>
    <Row className="justify-content-md-center mt-5">
      {props.categories.map(category => {
        return (
          <Link key={category.id} to={`/search/?category=${category.id}`} role="button" className="btn btn-link">
            <Card style={{ width: '18rem' }} className="shadow card-custom">
              <Card.Body>
                <Card.Title>{category.name}</Card.Title>
                <Card.Text>
                  <img src={"/images/categories/"+category.image} alt={category.image} />
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        );
      })}
    </Row>
    <Row className="justify-content-md-center">
      {!props.showingAllCategories ?
        <Button onClick={props.pullAllCategories} className="justify-content-md-center mt-2">More Categories...</Button>
      : null}
    </Row>
  </>
  );
}
 
export default CategoryList;