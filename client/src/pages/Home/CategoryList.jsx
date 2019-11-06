import React from 'react';
import { Card, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './style.css';

const CategoryList = props => {
  console.log(props.categories);
  return (
    <Row className="justify-content-md-center mt-5">
      {props.categories.map(category => {
        return (
          <Link key={category.id} to={`/search/${category.id}`} role="button" className="btn btn-link">
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
  );
}
 
export default CategoryList;