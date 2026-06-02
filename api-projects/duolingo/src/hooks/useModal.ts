import { useContext } from 'react';
import GlobalContext from '../context/Context';

export const useModal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Context not defined!');
  }
  const { courseModalOpen, setCourseModalOpen } = context;
  return { courseModalOpen, setCourseModalOpen };
};
