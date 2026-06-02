import React from 'react';

// utils
import './write.css';

export default function Write() {
  return (
    <div className='write'>
      <img
        className='write-img'
        src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        alt=''
      />
      <form className='write-form'>
        <div className='write-form-group'>
          <label htmlFor='fileInput'>
            <i className='write-icon fa-solid fa-plus'></i>
          </label>
          <input type='file' id='fileInput' style={{ display: 'none' }} />
          <input
            type='text'
            placeholder='Title'
            className='write-input'
            autoFocus={true}
          />
        </div>
        <div className='write-form-group'>
          <textarea
            placeholder='Post a story'
            type='text'
            className='write-input write-text'
          ></textarea>
          <button type='' className='write-submit'>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
