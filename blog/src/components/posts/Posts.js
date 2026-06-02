import React from 'react';

// components
import Post from '../post/Post';

// utils
import './posts.css';

export default function Posts() {
  return (
    <div className='posts'>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}
