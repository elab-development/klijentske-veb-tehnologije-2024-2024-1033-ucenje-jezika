import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Artists from './pages/Artists';
import ArtistDetails from './pages/ArtistDetails';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/:id' element={<EventDetails />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/artists/:id' element={<ArtistDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
