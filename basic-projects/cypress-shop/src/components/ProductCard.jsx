export default function ProductCard({ product, onAdd }) {
  return (
    <article className='card' data-cy={`product-${product.id}`}>
      <div className='card-img' aria-hidden='true'>
        {product.name.charAt(0)}
      </div>
      <div className='card-body'>
        <h4 className='h4'>{product.name}</h4>
        <p className='price'>${product.price.toFixed(2)}</p>
        <button className='btn' onClick={onAdd} data-cy={`add-${product.id}`}>
          Add to cart
        </button>
      </div>
    </article>
  );
}
