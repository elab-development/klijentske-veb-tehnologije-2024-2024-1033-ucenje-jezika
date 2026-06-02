import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import DigitalList from './pages/DigitalList';
import DigitalDetails from './pages/DigitalDetails';
import TraditionalList from './pages/TraditionalList';
import TraditionalDetails from './pages/TraditionalDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/digital' element={<DigitalList />} />
          <Route path='/digital/:id' element={<DigitalDetails />} />
          <Route path='/traditional' element={<TraditionalList />} />
          <Route path='/traditional/:id' element={<TraditionalDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
