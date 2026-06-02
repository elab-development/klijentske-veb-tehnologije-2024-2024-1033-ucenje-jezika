import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Home from './pages/Home';
import Exams from './pages/Exams';
import MyRegistrations from './pages/MyRegistrations';
import NotFound from './pages/NotFound';
import { AuthProvider } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/exams' element={<Exams />} />
              <Route path='/my-registrations' element={<MyRegistrations />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
