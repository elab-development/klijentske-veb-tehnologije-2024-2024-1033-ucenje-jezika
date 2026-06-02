import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPinterest,
} from 'react-icons/fa';

function Footer() {
  return (
    <div className='w-full mt-24 bg-gray-900 text-gray-300 py-2 px-2'>
      <div className='max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-6 border-b-2 border-gray-600 py-8 px-4'>
        <div>
          <h6 className='footer-h6'>Solutions</h6>
          <ul>
            <li className='footer-li'>Travel</li>
            <li className='footer-li'>Booking</li>
            <li className='footer-li'>Flights</li>
            <li className='footer-li'>Cruises</li>
            <li className='footer-li'>Ground</li>
          </ul>
        </div>
        <div>
          <h6 className='footer-h6'>Support</h6>
          <ul>
            <li className='footer-li'>Pricing</li>
            <li className='footer-li'>Documentation</li>
            <li className='footer-li'>Tours</li>
            <li className='footer-li'>Refunds</li>
          </ul>
        </div>
        <div>
          <h6 className='footer-h6'>Company</h6>
          <ul>
            <li className='footer-li'>About</li>
            <li className='footer-li'>Blog</li>
            <li className='footer-li'>Jobs</li>
            <li className='footer-li'>Press</li>
            <li className='footer-li'>Partners</li>
          </ul>
        </div>
        <div>
          <h6 className='footer-h6'>Legal</h6>
          <ul>
            <li className='footer-li'>Claims</li>
            <li className='footer-li'>Privacy</li>
            <li className='footer-li'>Terms</li>
            <li className='footer-li'>Policies</li>
            <li className='footer-li'>Conditions</li>
          </ul>
        </div>
        <div className='col-span-2 py-8 md:pt-2'>
          <p className='footer-h6 uppercase'>Subscribe to our newsletter</p>
          <p className='py-4'>
            The latest deals, articles and resources sent to your inbox weekly.
          </p>
          <form className='flex flex-col sm:flex-row'>
            <input
              className='w-full p-2 mr-4 rounded-md mb-4'
              type='email'
              placeholder='Enter your email...'
            />
            <button className='p-2 mb-4 rounded-md'>Suscribe</button>
          </form>
        </div>
      </div>
      <div className='flex flex-col max-w-[1400px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500'>
        <p className='py-4'>2023 &copy; Experiences, All rights reserved </p>
        <div className='flex justify-between sm:w-[300px] pt-4 text-2xl'>
          <FaFacebook size={30} />
          <FaInstagram size={30} />
          <FaTwitter size={30} />
          <FaLinkedin size={30} />
          <FaPinterest size={30} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
