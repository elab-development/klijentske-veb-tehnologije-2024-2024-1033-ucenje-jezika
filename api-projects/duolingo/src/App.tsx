import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useLoggedIn } from './hooks/useLoggedIn.hook';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Courses from './pages/Courses';
import Course from './pages/Course';
import Upcoming from './pages/Upcoming';
import Button from './components/Button';

function App() {
  const { loggedIn } = useLoggedIn();

  const handleButtonClick = () => {
    console.log('Duolingo mock function');
  };

  return (
    <BrowserRouter>
      <div data-testid='duolingo'>
        <Routes>
          <Route
            path='/'
            element={loggedIn ? <Home /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/login'
            element={loggedIn ? <Navigate to={'/'} /> : <Login />}
          />
          <Route
            path='/register'
            element={loggedIn ? <Navigate to={'/'} /> : <Register />}
          />
          <Route
            path='/courses'
            element={loggedIn ? <Courses /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/courses/:id'
            element={loggedIn ? <Course /> : <Navigate to={'/login'} />}
          />
          <Route
            path='/upcoming'
            element={loggedIn ? <Upcoming /> : <Navigate to={'/login'} />}
          />
        </Routes>
      </div>
      <Button onButtonClick={handleButtonClick} />
    </BrowserRouter>
  );
}

export default App;
