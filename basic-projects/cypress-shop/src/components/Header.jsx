export default function Header({ title, children }) {
  return (
    <header className='header' data-cy='header'>
      <div className='brand'>
        <h1 className='h1'>{title}</h1>
      </div>
      <nav className='nav'>
        <button className='nav-btn' data-cy='nav-home' aria-current='page'>
          Home
        </button>
        <button className='nav-btn' data-cy='nav-about'>
          About
        </button>
        <button className='nav-btn' data-cy='nav-contact'>
          Contact
        </button>
      </nav>
      {children}
    </header>
  );
}
