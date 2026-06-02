import { useContext } from 'react';
import GlobalContext from '../context/Context';

export const useLoggedIn = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Context not defined!');
  }
  const { loggedIn, setLoggedIn } = context;
  return { loggedIn, setLoggedIn };
};
