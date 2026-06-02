import { Link } from 'react-router-dom';
import {
  FaBriefcase,
  FaChalkboardTeacher,
  FaLanguage,
  FaUserGraduate,
} from 'react-icons/fa';

import '../../styles/AboutSection.css';
import aboutSectionImg from '../../assets/about-img.svg';
import AboutSectionCard from './AboutSectionCard';

const AboutSection = () => {
  return (
    <section className='about'>
      <div className='row'>
        <div className='image'>
          <img src={aboutSectionImg} alt='about' />
        </div>

        <div className='content'>
          <h3>Why Doulingo?</h3>
          <p>
            Duolingo offers courses in a wide range of languages, from popular
            ones like Spanish, French, and German to lesser-studied languages
            like Welsh and Navajo. Duolingo has an active community of learners
            and forums where users can ask questions, share tips, and support
            each other.
          </p>
          <Link to={'/courses'} className='inline-btn'>
            our courses
          </Link>
        </div>
      </div>

      <div className='box-container'>
        <AboutSectionCard
          icon={<FaLanguage />}
          heading='+100'
          text='languages'
        />
        <AboutSectionCard
          icon={<FaUserGraduate />}
          heading='+500k'
          text='brilliant students'
        />
        <AboutSectionCard
          icon={<FaChalkboardTeacher />}
          heading='+2k'
          text='expert tutors'
        />
        <AboutSectionCard
          icon={<FaBriefcase />}
          heading='100%'
          text='satisfaction'
        />
      </div>
    </section>
  );
};

export default AboutSection;
