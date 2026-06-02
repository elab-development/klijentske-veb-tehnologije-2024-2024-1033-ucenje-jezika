import { useContext } from 'react';
import GlobalContext from '../context/Context';

export const useSidebar = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('Context not defined!');
  }
  const { sidebarActive, setSidebarActive } = context;
  return { sidebarActive, setSidebarActive };
};
