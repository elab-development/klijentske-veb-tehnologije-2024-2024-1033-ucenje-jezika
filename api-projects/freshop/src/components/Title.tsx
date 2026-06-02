import React from 'react';
import { Link } from 'react-router-dom';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div>
      <div className='all-title-box'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <h2>{text}</h2>
              <ul className='breadcrumb'>
                <li className='breadcrumb-item'>
                  <Link to='/'>Home</Link>
                </li>
                <li className='breadcrumb-item active'>{text}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
