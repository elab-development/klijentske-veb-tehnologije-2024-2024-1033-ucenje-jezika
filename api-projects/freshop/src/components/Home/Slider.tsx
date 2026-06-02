import React, { useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

import banner1 from '../../images/banner-01.jpg';
import banner2 from '../../images/banner-02.jpg';
import banner3 from '../../images/banner-03.jpg';

const Slider: React.FC = () => {
  const [slide, setSlide] = useState(0);
  const data = [
    { src: banner1, alt: 'banner1' },
    { src: banner2, alt: 'banner2' },
    { src: banner3, alt: 'banner3' },
  ];

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  return (
    <>
      <div className='carousel'>
        <BsArrowLeftCircleFill
          onClick={prevSlide}
          className='arrow arrow-left'
        />
        {data.map((item, idx) => {
          return (
            <img
              src={item.src}
              alt={item.alt}
              key={idx}
              className={slide === idx ? 'slide' : 'slide slide-hidden'}
            />
          );
        })}
        <BsArrowRightCircleFill
          onClick={nextSlide}
          className='arrow arrow-right'
        />
        <span className='indicators'>
          {data.map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                  slide === idx ? 'indicator' : 'indicator indicator-inactive'
                }
                onClick={() => setSlide(idx)}
              ></button>
            );
          })}
        </span>
      </div>
    </>
  );
};

export default Slider;
