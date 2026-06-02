import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { VscDebugStackframeDot } from 'react-icons/vsc';

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'The Views',
    },
    {
      url: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      title: 'Private Beaches',
    },
    {
      url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Comfort',
    },
    {
      url: 'https://images.unsplash.com/photo-1617995815236-7f06f6e53180?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Aestetics',
    },
    {
      url: 'https://images.unsplash.com/photo-1676385153271-965fc8b96522?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Vacation',
    },
    {
      url: 'https://images.unsplash.com/photo-1597634285596-01fd1bffe116?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      title: 'Calm',
    },
    {
      url: 'https://images.unsplash.com/photo-1440778303588-435521a205bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Relaxation',
    },
    {
      url: 'https://images.unsplash.com/photo-1472586662442-3eec04b9dbda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80',
      title: 'Family',
    },
    {
      url: 'https://images.unsplash.com/photo-1530125086495-effd3661612e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      title: 'Pools',
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1400px] h-[900px] w-full m-auto py-16 px-4 relative group'>
      <h1 className='text-4xl font-bold mb-10 text-center'>
        {slides[currentIndex].title}
      </h1>
      <div
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
      >
        <div className='absolute top-[60%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactLeft size={30} onClick={prevSlide} />
        </div>
        <div className='absolute top-[60%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 group-hover:bg-black/20 text-white cursor-pointer'>
          <BsChevronCompactRight size={30} onClick={nextSlide} />
        </div>
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, index) => (
          <div
            className='text-2xl cursor-pointer'
            key={slide.title}
            onClick={() => goToSlide(index)}
          >
            <VscDebugStackframeDot />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
