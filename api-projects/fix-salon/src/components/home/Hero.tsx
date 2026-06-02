import icon1 from '../../assets/home/icons/icon-1.png';
import icon2 from '../../assets/home/icons/icon-2.png';
import icon3 from '../../assets/home/icons/icon-3.png';
import icon4 from '../../assets/home/icons/icon-4.png';
import icon5 from '../../assets/home/icons/icon-5.png';

const Hero = () => {
  return (
    <div>
      <div className='bg-hero h-[489px] relative'>
        <p className='uppercase absolute bottom-0 text-7xl'>Salon Lepote Fix</p>
      </div>
      <div className='flex flex-col gap-2 uppercase justify-center items-center my-10'>
        <p className='text-2xl'>istražite</p>
        <p className='text-4xl'>usluge koje nudimo</p>
        <div className='mt-10 flex flex-col sm:flex-row sm:flex-wrap justify-between gap-2 sm:gap-10'>
          <img src={icon1} alt='icon1' />
          <img src={icon2} alt='icon2' />
          <img src={icon3} alt='icon3' />
          <img src={icon4} alt='icon4' />
          <img src={icon5} alt='icon5' />
        </div>
      </div>
    </div>
  );
};

export default Hero;
