/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react';

import coverImg from '../assets/cover_not_found.jpg';
import GlobalContext from './GlobalContext';

const URL = 'http://openlibrary.org/search.json?title=';

const ContextWrapper = (props) => {
  const [searchTerm, setSearchTerm] = useState('harry potter');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;

      if (docs) {
        const newBooks = docs.map((bookSingle) => {
          const {
            key,
            author_name,
            cover_i,
            edition_count,
            first_publish_year,
            title,
          } = bookSingle;

          return {
            id: key.replace('/works/', ''),
            author: author_name,
            cover_img: cover_i
              ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
              : coverImg,
            edition_count: edition_count,
            first_publish_year: first_publish_year,
            title: title,
          };
        });

        setBooks(newBooks);
        console.log(newBooks);

        if (newBooks.length > 1) {
          setResultTitle(`Search results for: ${searchTerm}`);
        } else {
          setResultTitle('No Search Result Found!');
        }
      } else {
        setBooks([]);
        setResultTitle('No Search Result Found!');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return (
    <GlobalContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        books,
        setBooks,
        loading,
        setLoading,
        resultTitle,
        setResultTitle,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
