export default function CartBadge({ count }) {
  return (
    <div className='cart' aria-label='Cart' data-cy='cart-badge'>
      🛒{' '}
      <span className='badge' data-cy='cart-count'>
        {count}
      </span>
    </div>
  );
}
