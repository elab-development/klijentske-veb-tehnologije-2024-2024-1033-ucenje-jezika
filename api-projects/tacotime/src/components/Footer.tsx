import { MdOutlineEmail } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { FaViber } from 'react-icons/fa';

import '../styles/Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footerItem'>
        <FiPhone size={32} />
        <p>+381 64 3267 881</p>
      </div>
      <div className='footerItem'>
        <MdOutlineEmail size={32} />
        <p>tacotime@mail.rs</p>
      </div>
      <div className='footerItem'>
        <FaViber size={32} />
        <p>+381 64 3267 881</p>
      </div>
    </div>
  );
};

export default Footer;
