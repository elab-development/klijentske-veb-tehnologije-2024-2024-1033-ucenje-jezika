import { useNavigate } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import logo from '../../assets/logo.png';
import '../../styles/Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='hero'>
      <div className='container row'>
        <div className='hero-content'>
          <div className='content'>
            <div className='recipe row'>
              <h2>Delicious Mexican Recipes for Every Occasion</h2>
              <p>
                Discover authentic Mexican recipes that bring vibrant flavors to
                every meal. From tacos to tamales, find the perfect dish for any
                occasion and spice up your kitchen!
              </p>
              <div className='btn' onClick={() => navigate('/recipes')}>
                <span>Recipes</span>
                <FiChevronRight size={24} />
              </div>
            </div>
          </div>
        </div>
        <div className='img'>
          <img src={logo} alt='logo' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
