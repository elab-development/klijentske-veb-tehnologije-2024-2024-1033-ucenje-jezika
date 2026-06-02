import React from 'react';
import AboutUsDesc from '../components/About/AboutUsDesc';
import TeamMember from '../components/About/TeamMember';
import Title from '../components/Title';

const About: React.FC = () => {
  return (
    <>
      <Title text='ABOUT US' />
      <AboutUsDesc />
      <TeamMember />
    </>
  );
};

export default About;
