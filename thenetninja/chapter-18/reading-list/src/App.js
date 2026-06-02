// react imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// context
import { useAuthContext } from './hooks/useAuthContext';

// components
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={
                user ? <Home /> : <Login /> 
              } 
            />
            <Route path="/signup" element={
                user ? <Home /> : <Signup />
              }        
            />
            <Route path="/login" element={
                user ? <Home /> : <Login />
              } 
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App
