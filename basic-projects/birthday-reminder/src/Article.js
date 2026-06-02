// react imports
import React from 'react';

const Article = ({person}) => {
    const {id, name, age, image} = person;
    return (
        <article id={id} className="person">
            <img src={image} alt={name} />
            <div>
              <h4>{name}</h4>
              <p>{age} years</p>
            </div>
        </article>
    );
}

export default Article;