import React from 'react';
import Jumbotron from "../../components/Jumbotron";
import PageContainer from '../../components/PageContainer';
import './style.css';

const About = () => {

  return (
    <>
      <Jumbotron />
      <PageContainer title="About Us">
        <div className="about">
          <p>
            Skills HUB is an online community where you can share your valuable skills and know-how with your neighbours. Market your skills and services here to let the people around you know that you're available for hire. 
          </p>
          <p>
            Create an account and post your skills or to chat with the other Professionals in your area!
          </p>
        </div>
      </PageContainer>
    </>
  );
}
 
export default About;