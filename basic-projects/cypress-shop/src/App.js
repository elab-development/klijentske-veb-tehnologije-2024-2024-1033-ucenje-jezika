import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CartBadge from './components/CartBadge';
import Counter from './components/Counter';
import TodoList from './components/TodoList';
import ProductGrid from './components/ProductGrid';
import NewsletterForm from './components/NewsletterForm';
import Footer from './components/Footer';

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');

  const addToCart = () => setCartCount((c) => c + 1);

  const pageTitle = useMemo(() => 'Cypress App', []);

  return (
    <div className='app' data-cy='app-root'>
      <Header title={pageTitle}>
        <CartBadge count={cartCount} />
      </Header>

      <main className='container'>
        <section className='panel' aria-label='Search and intro'>
          <h2 className='h2'>Welcome 👋</h2>
          <p className='muted'>
            This is a demo React app built for practicing Cypress testing.
          </p>
          <SearchBar value={search} onChange={setSearch} />
        </section>

        <section className='grid'>
          <div className='col'>
            <div className='panel' aria-label='Counter panel'>
              <h3 className='h3'>Counter</h3>
              <Counter />
            </div>

            <div className='panel' aria-label='Todo panel'>
              <h3 className='h3'>Tasks</h3>
              <TodoList />
            </div>

            <div className='panel' aria-label='Newsletter panel'>
              <h3 className='h3'>Newsletter</h3>
              <NewsletterForm />
            </div>
          </div>

          <div className='col'>
            <div className='panel' aria-label='Products panel'>
              <h3 className='h3'>Products</h3>
              <ProductGrid search={search} onAddToCart={addToCart} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
