import ProductCard from './ProductCard';

const PRODUCTS = [
  { id: 1, name: 'Blue Mug', price: 8.99, tag: 'kitchen' },
  { id: 2, name: 'Green Plant', price: 12.5, tag: 'home' },
  { id: 3, name: 'Red Notebook', price: 5.0, tag: 'office' },
  { id: 4, name: 'Yellow Lamp', price: 19.99, tag: 'home' },
];

export default function ProductGrid({ search, onAddToCart }) {
  const filtered = PRODUCTS.filter((p) =>
    `${p.name} ${p.tag}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <p className='muted' data-cy='product-count'>
        Showing {filtered.length} / {PRODUCTS.length}
      </p>
      <div className='products' data-cy='product-grid'>
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={() => onAddToCart(p)} />
        ))}
        {filtered.length === 0 && <div className='muted'>No products.</div>}
      </div>
    </div>
  );
}
