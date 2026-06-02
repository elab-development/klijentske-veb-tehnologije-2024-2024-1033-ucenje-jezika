import React from 'react';

const GlobalContext = React.createContext({
  searchTerm: '',
  setSearchTerm: () => {},
  books: [],
  setBooks: () => {},
  loading: false,
  setLoading: () => {},
  resultTitle: '',
  setResultTitle: () => {},
});

export default GlobalContext;
