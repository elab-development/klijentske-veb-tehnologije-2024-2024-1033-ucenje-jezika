// react imports
import React from 'react';

// components
import Article from './Article';

const List = ({people}) => {
  return (
    <>
      {people.map((person) => {
        return <Article person={person}/>
      })}
    </>
  );
};

export default List;