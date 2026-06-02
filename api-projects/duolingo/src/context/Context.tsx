import React, { useEffect, useState } from 'react';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Language } from '../models/Language';

interface GlobalContextProps {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarActive: boolean;
  setSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  courseModalOpen: boolean;
  setCourseModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCourse: Course;
  setSelectedCourse: React.Dispatch<React.SetStateAction<Course>>;
  selectedLanguage: Language;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const GlobalContext = React.createContext<GlobalContextProps | undefined>(
  undefined
);

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(new User('', ''));
  const [loggedIn, setLoggedIn] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(
    new Course(-1, '', -1, [])
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    new Language(-1, '', '', '')
  );

  useEffect(() => {
    let storageUser = localStorage.getItem('user');
    if (storageUser) {
      setUser(JSON.parse(storageUser));
      setLoggedIn(true);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        loggedIn,
        setLoggedIn,
        sidebarActive,
        setSidebarActive,
        courseModalOpen,
        setCourseModalOpen,
        selectedCourse,
        setSelectedCourse,
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
