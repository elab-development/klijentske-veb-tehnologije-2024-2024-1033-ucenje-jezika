import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Theere is a problem with loading ContextProvider');
  }
  const {
    searchTerm,
    setSearchTerm,
    books,
    setBooks,
    loading,
    setLoading,
    resultTitle,
    setResultTitle,
  } = context;
  return {
    searchTerm,
    setSearchTerm,
    books,
    setBooks,
    loading,
    setLoading,
    resultTitle,
    setResultTitle,
  };
};
