import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Current from './pages/Current';
import Hourly from './pages/Hourly';
import Weekly from './pages/Weekly';
import Details from './pages/Details';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/current' element={<Current />} />
            <Route path='/hourly' element={<Hourly />} />
            <Route path='/weekly' element={<Weekly />} />
            <Route path='/details' element={<Details />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
