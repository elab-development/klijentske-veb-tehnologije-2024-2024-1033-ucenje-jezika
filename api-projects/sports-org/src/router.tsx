import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetails';
import NewEvent from './pages/NewEvent';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'events', element: <Events /> },
      { path: 'events/:id', element: <EventDetail /> },
      { path: 'new', element: <NewEvent /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);
