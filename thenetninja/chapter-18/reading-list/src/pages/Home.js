// react imports
import React from 'react';

// custom hooks
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';


export default function Home() {
  const { user } = useAuthContext();

  const { documents: books } = useCollection(
    'books',
    ['uid', '==', user.uid]
  );

  return (
    <div className="App">
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}