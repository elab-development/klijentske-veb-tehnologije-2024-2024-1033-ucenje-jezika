import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Tracks from './pages/Tracks';
import Track from './pages/Track';
import Weather from './pages/Weather';
import NotFound from './pages/NotFound';
import Layout from './layout/Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/tracks' element={<Tracks />} />
            <Route path='/tracks/:id' element={<Track />} />
            <Route path='/weather' element={<Weather />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
