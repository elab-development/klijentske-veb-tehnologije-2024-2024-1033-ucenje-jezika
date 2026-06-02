import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';

import '../styles/About.css';
import aboutImg from '../assets/about.png';
import elipse from '../assets/elipse.png';

const About = () => {
  return (
    <div className='about'>
      <div className='aboutContainer'>
        <div className='aboutContent'>
          <h2 className='lobsterFont'>TacoTime</h2>
          <p>Welcome to TacoTime!</p>
          <p>
            At TacoTime, we're passionate about sharing the vibrant flavors of
            Mexico. Our mission is to bring you a diverse collection of
            authentic Mexican recipes that are easy to follow and delicious to
            taste. Whether you're a seasoned chef or a home cook, you'll find
            something to love in our selection of classic and regional dishes.
            Our team is dedicated to exploring Mexican gastronomy to provide you
            with true representations of its rich culinary heritage. Join us on
            this flavorful journey and make every meal a fiesta with TacoTime!
          </p>
          <p>Buen provecho!</p>
          <p>The TacoTime Team</p>
        </div>
        <div className='aboutImg'>
          <img src={aboutImg} alt='about' />
          <div className='aboutInfo'>
            <FiPhone size={30} />
            <p>+381 64 3267 881</p>
          </div>
          <div className='aboutInfo'>
            <MdOutlineEmail size={30} />
            <p>tacotime@mail.rs</p>
          </div>
        </div>

        <img className='elipse1' src={elipse} alt='elipse1' />
        <img className='elipse2' src={elipse} alt='elipse2' />
        <img className='elipse3' src={elipse} alt='elipse3' />
        <img className='elipse4' src={elipse} alt='elipse4' />
        <img className='elipse5' src={elipse} alt='elipse5' />
        <img className='elipse6' src={elipse} alt='elipse6' />
        <img className='elipse7' src={elipse} alt='elipse7' />
        <img className='elipse8' src={elipse} alt='elipse8' />
        <img className='elipse8' src={elipse} alt='elipse8' />
        <img className='elipse9' src={elipse} alt='elipse9' />
        <img className='elipse10' src={elipse} alt='elipse10' />
      </div>
    </div>
  );
};

export default About;
