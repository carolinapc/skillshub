import React from 'react';
import { Form, Button } from 'react-bootstrap';
import API from '../../utils/API';

class ReviewForm extends React.Component {

  state = {
    skillId: this.props.skillId,
    review: "",
    score: 0,
    scoreChosen: false
  }

  saveReview = event => {
    event.preventDefault();
    const data = {
      SkillId: this.state.skillId,
      score: this.state.score,
      review: this.state.review
    };

    API.addReview(data).then(res => {
      this.props.getSkillFromDb({ id: res.data.SkillId });
    }).catch(err => console.log(err.response));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleMouseOver = event => {
    if(!this.state.scoreChosen)
      this.setState({ score: event.target.id });
  }
  
  handleMouseOut = () => {
    if(!this.state.scoreChosen)
      this.setState({ score: 0 });
  }

  handleStarClick = event => {
    this.setState({ score: event.target.id, scoreChosen: true });
  }

  getScoreClass = score => {
    if (this.state.score <= score-1) {
      return "far";
    }  
    else {
      return "fas";
    }
  }

  getStars = ()=>{
    let stars = [];

    for (let i = 1; i <= 5; i++){
      stars.push(<i key={i} className={`${this.getScoreClass(i)} fa-star star`} id={i} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onClick={this.handleStarClick}></i>);
    }
    
    return stars;
  }

  render() {

    return (
      <>
        <h5>Add Your Review</h5>
        <h5>{this.getStars()}</h5>
        <Form.Control as="textarea" rows="5" name="review" value={this.state.review} placeholder="Comment your review..." onChange={this.handleInputChange} />
        <Button onClick={this.saveReview} className="mt-3">Submit</Button>
      </>
    );
  }
}
 
export default ReviewForm;