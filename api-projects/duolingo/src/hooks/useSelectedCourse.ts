import { useContext } from 'react';
import GlobalContext from '../context/Context';

export const useSelectedCourse = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Context not defined!');
  }
  const { selectedCourse, setSelectedCourse } = context;
  return { selectedCourse, setSelectedCourse };
};
