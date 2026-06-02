export default function Footer() {
  return (
    <footer className='footer' data-cy='footer'>
      <p className='muted'>
        © {new Date().getFullYear()} Cypress App • Built for Cypress testing
      </p>
    </footer>
  );
}
