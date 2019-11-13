import React from 'react';
import { Card } from 'react-bootstrap';
import Utils from '../../utils';
import Moment from 'react-moment';
import './style.css';

const Reviews = props => {
  return (
    <>
      {props.reviews.map(review => {
        return (
          <Card key={review.id} className="mt-3">
            <Card.Header>
              <div className="wrap-review-header">
                <span>{Utils.getStars(review.score)}</span>
                <span><Moment format="YYYY/MM/DD" date={review.createAt} /></span>
              </div>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>{Utils.replaceNewLines(review.review)}</p>
                <footer className="blockquote-footer">
                  {review.User.firstName + " " + review.User.lastName}
                  <img src={review.User.image? `/images/uploads/${review.User.image}`  : "/profile.jpg"} alt="User" />
                </footer>
              </blockquote>
            </Card.Body>
          </Card>          
        );
      })}
    </>
  );
}
 
export default Reviews;