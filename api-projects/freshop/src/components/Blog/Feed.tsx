import React from 'react';

import blog1 from '../../images/blog-img-01.jpg';
import blog2 from '../../images/blog-img-02.jpg';
import blog3 from '../../images/blog-img.jpg';

const Feed: React.FC = () => {
  return (
    <div className='latest-blog'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='title-all text-center'>
              <h1>latest blog</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
                amet lacus enim.
              </p>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 col-lg-4 col-xl-4'>
            <div className='blog-box'>
              <div className='blog-img'>
                <img className='img-fluid' src={blog3} alt='' />
              </div>
              <div className='blog-content'>
                <div className='title-blog'>
                  <h3>Fusce in augue non nisi fringilla</h3>
                  <p>
                    Nulla ut urna egestas, porta libero id, suscipit orci.
                    Quisque in lectus sit amet urna dignissim feugiat. Mauris
                    molestie egestas pharetra. Ut finibus cursus nunc sed
                    mollis. Praesent laoreet lacinia elit id lobortis.
                  </p>
                </div>
                <ul className='option-blog'>
                  <li>
                    <a href='#'>
                      <i className='far fa-heart'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fas fa-eye'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='far fa-comments'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-lg-4 col-xl-4'>
            <div className='blog-box'>
              <div className='blog-img'>
                <img className='img-fluid' src={blog1} alt='' />
              </div>
              <div className='blog-content'>
                <div className='title-blog'>
                  <h3>Fusce in augue non nisi fringilla</h3>
                  <p>
                    Nulla ut urna egestas, porta libero id, suscipit orci.
                    Quisque in lectus sit amet urna dignissim feugiat. Mauris
                    molestie egestas pharetra. Ut finibus cursus nunc sed
                    mollis. Praesent laoreet lacinia elit id lobortis.
                  </p>
                </div>
                <ul className='option-blog'>
                  <li>
                    <a href='#'>
                      <i className='far fa-heart'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fas fa-eye'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='far fa-comments'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-md-6 col-lg-4 col-xl-4'>
            <div className='blog-box'>
              <div className='blog-img'>
                <img className='img-fluid' src={blog2} alt='' />
              </div>
              <div className='blog-content'>
                <div className='title-blog'>
                  <h3>Fusce in augue non nisi fringilla</h3>
                  <p>
                    Nulla ut urna egestas, porta libero id, suscipit orci.
                    Quisque in lectus sit amet urna dignissim feugiat. Mauris
                    molestie egestas pharetra. Ut finibus cursus nunc sed
                    mollis. Praesent laoreet lacinia elit id lobortis.
                  </p>
                </div>
                <ul className='option-blog'>
                  <li>
                    <a href='#'>
                      <i className='far fa-heart'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fas fa-eye'></i>
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='far fa-comments'></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
