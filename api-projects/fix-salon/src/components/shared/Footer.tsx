import logo from '../../assets/logo.png';
import FooterButton from '../test/FooterButton';

const Footer = () => {
  const handleButtonClick = () => {
    console.log('Footer button clicked!');
  };

  return (
    <div className='flex justify-between items-center bg-primary h-36 p-3'>
      <FooterButton onButtonClick={handleButtonClick} />
      <img src={logo} alt='logo' className='h-28' />
    </div>
  );
};

export default Footer;
