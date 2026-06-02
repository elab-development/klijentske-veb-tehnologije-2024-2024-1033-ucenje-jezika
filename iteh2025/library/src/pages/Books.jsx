import { useEffect, useState } from 'react';

import { useGlobalContext } from '../hooks/useGlobalContext.hook';
import Loader from '../components/Loader';
import Book from '../components/books/Book';

const Books = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [authorFilter, setAuthorFilter] = useState('');
  const [firstPublishYearFilter, setFirstPublishYearFilter] = useState('');

  const { books, loading, resultTitle } = useGlobalContext();

  const resetFilters = () => {
    setAuthorFilter('');
    setFirstPublishYearFilter('');
    setFilteredBooks(books);
  };

  const filter = () => {
    let newFilteredBooks = [];

    if (authorFilter && firstPublishYearFilter) {
      newFilteredBooks = books.filter(
        (book) =>
          book.author?.slice(0, 1)[0] === authorFilter &&
          book.first_publish_year === parseInt(firstPublishYearFilter)
      );
    } else if (authorFilter) {
      newFilteredBooks = books.filter(
        (book) => book.author?.slice(0, 1)[0] === authorFilter
      );
    } else if (firstPublishYearFilter) {
      newFilteredBooks = books.filter(
        (book) => book.first_publish_year === parseInt(firstPublishYearFilter)
      );
    } else {
      newFilteredBooks = books;
    }

    setFilteredBooks(newFilteredBooks);
  };

  useEffect(() => {
    let pagesCounter = 0;
    for (let i = 1; i <= Math.ceil(filteredBooks?.length / 20); i++) {
      pagesCounter += 1;
    }
    setTotalPages(pagesCounter);
    setCurrentPage(1);
  }, [filteredBooks]);

  useEffect(() => {
    setFilteredBooks(books);
  }, [books]);

  return (
    <section className='booklist'>
      {loading ? (
        <Loader />
      ) : (
        <div className='container'>
          <div className='section-title'>
            <h2>{resultTitle}</h2>
          </div>

          <div className='filters'>
            <div>
              <input
                type='text'
                placeholder='Author'
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
              />
              <input
                type='number'
                placeholder='First publish year'
                value={firstPublishYearFilter}
                onChange={(e) => setFirstPublishYearFilter(e.target.value)}
              />
            </div>

            <div>
              <button
                onClick={filter}
                disabled={authorFilter === '' && firstPublishYearFilter === ''}
              >
                Filter Books
              </button>
              <button
                onClick={resetFilters}
                disabled={authorFilter === '' && firstPublishYearFilter === ''}
              >
                Reset Filters
              </button>
            </div>
          </div>
          <div className='booklist-content grid'>
            {filteredBooks
              .slice(currentPage * 20 - 20, currentPage * 20)
              .map((item, index) => {
                return <Book key={index} {...item} />;
              })}
          </div>
        </div>
      )}

      {!loading && (
        <div className='books-paginate'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              className={`${page === currentPage && 'active'}`}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Books;
