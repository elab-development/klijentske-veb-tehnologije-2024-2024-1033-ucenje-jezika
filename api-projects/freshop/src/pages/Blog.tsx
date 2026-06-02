import React from 'react';
import Title from '../components/Title';
import Feed from '../components/Blog/Feed';

const Blog: React.FC = () => {
  return (
    <>
      <Title text='BLOG' />
      <Feed />
    </>
  );
};

export default Blog;
