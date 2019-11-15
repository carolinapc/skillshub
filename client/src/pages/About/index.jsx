import React from 'react';
import Jumbotron from "../../components/Jumbotron";
import PageContainer from '../../components/PageContainer';



class About extends React.Component {

  render() { 
    return (
    <>
      <Jumbotron />
      <PageContainer title="About Us">
      <span>
      <p>
        Skills HUB is an online community where you can share your valuable skills and know-how with your neighbours. Market your skills and services here to let the people around you know that you're available for hire. 
        <br></br> 
        <br></br>
        Create an account and post your skills or to chat with the other Professionals in your area!
      </p>

      </span>
       
      </PageContainer>
    </>
    );
  }
}
 
export default About;