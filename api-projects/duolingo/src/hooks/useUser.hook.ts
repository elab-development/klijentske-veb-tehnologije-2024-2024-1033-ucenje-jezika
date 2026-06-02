import { useContext } from 'react';
import GlobalContext from '../context/Context';

export const useUser = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Context not defined!');
  }
  const { user, setUser } = context;
  return { user, setUser };
};
