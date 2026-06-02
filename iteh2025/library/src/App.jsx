import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Home from './pages/Home';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Breadcrumbs />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id' element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
