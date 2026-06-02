import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setMsg('Please enter a valid email.');
      return;
    }
    setMsg('Subscribed! 🎉');
    setEmail('');
  };

  return (
    <form onSubmit={submit} className='newsletter' data-cy='newsletter-form'>
      <label htmlFor='email'>Your email</label>
      <input
        id='email'
        type='text'
        placeholder='you@example.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-cy='newsletter-input'
      />
      <button className='btn' type='submit' data-cy='newsletter-submit'>
        Subscribe
      </button>
      {msg && (
        <p className='status' data-cy='newsletter-status'>
          {msg}
        </p>
      )}
    </form>
  );
}
