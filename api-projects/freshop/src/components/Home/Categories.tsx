import React from 'react';

import cat1 from '../../images/categories_img_01.jpg';
import cat2 from '../../images/categories_img_02.jpg';
import cat3 from '../../images/categories_img_03.jpg';

const Categories: React.FC = () => {
  return (
    <div className='categories-shop'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
            <div className='shop-cat-box'>
              <img className='img-fluid' src={cat1} alt='category' />
              <a className='btn hvr-hover' href='#'>
                Lorem ipsum dolor
              </a>
            </div>
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
            <div className='shop-cat-box'>
              <img className='img-fluid' src={cat2} alt='category' />
              <a className='btn hvr-hover' href='#'>
                Lorem ipsum dolor
              </a>
            </div>
          </div>
          <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
            <div className='shop-cat-box'>
              <img className='img-fluid' src={cat3} alt='category' />
              <a className='btn hvr-hover' href='#'>
                Lorem ipsum dolor
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
