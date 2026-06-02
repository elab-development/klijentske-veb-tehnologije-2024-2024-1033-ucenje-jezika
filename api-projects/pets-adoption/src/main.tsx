import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Home from './pages/Home.tsx';
import PetDetails from './pages/PetDetails.tsx';
import Pets from './pages/Pets.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'pets', element: <Pets /> },
      { path: 'pets/:id', element: <PetDetails /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
