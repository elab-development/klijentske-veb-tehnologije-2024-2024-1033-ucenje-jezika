import { useState } from 'react';
import { AppShell, Container } from '@mantine/core';
import Home from './pages/Home';
import StoreHeader from './components/StoreHeader';
import CartDrawer from './components/CartDrawer';

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === product.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { id: product.id, product, qty }];
    });
  };

  const updateQty = (productId, qty) => {
    setCart((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== productId);
      return prev.map((i) => (i.id === productId ? { ...i, qty } : i));
    });
  };

  const removeItem = (productId) => {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <AppShell header={{ height: 64 }} padding='md'>
      <AppShell.Header>
        <StoreHeader
          cartCount={cartCount}
          onCartClick={() => setCartOpen(true)}
        />
      </AppShell.Header>

      <AppShell.Main>
        <Container size='lg'>
          <Home addToCart={addToCart} />
        </Container>
      </AppShell.Main>

      <CartDrawer
        opened={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        updateQty={updateQty}
        removeItem={removeItem}
        clearCart={clearCart}
      />
    </AppShell>
  );
}
