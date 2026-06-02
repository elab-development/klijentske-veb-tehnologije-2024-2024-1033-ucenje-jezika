import { useContext } from 'react';
import GlobalContext from '../context/Context';

export const useSelectedLanguage = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Context not defined!');
  }
  const { selectedLanguage, setSelectedLanguage } = context;
  return { selectedLanguage, setSelectedLanguage };
};
