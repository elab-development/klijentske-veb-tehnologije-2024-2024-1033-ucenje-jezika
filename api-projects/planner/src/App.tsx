import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import PlannerPage from './pages/PlannerPage';
import AddTaskPage from './pages/AddTaskPage';
import ProductivityPage from './pages/ProductivityPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/planner' element={<PlannerPage />} />
          <Route path='/productivity' element={<ProductivityPage />} />
          <Route path='/add-task' element={<AddTaskPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
