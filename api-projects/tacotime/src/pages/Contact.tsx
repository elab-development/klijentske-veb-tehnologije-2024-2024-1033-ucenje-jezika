import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import lizard from '../assets/lizard.png';
import envelope from '../assets/envelope.png';
import '../styles/Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (name.trim() === '') {
      toast.error('Please enter your name', { id: 'contact' });
      return;
    }

    if (email.trim() === '') {
      toast.error('Please enter your email', { id: 'contact' });
      return;
    }

    if (message.trim() === '') {
      toast.error('Please enter your message', { id: 'contact' });
      return;
    }

    toast.success('Message sent successfully!', { id: 'contact' });

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className='contact'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='container row'>
        <div className='img'>
          <img src={lizard} alt='lizard' className='imglizard' />
          <img src={envelope} alt='envelope' className='imgenvelope' />
        </div>
        <div className='contact-content'>
          <div className='content'>
            <div className='recipe row'>
              <h2>Contact us</h2>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
              />
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
              <input
                type='text'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder='Message'
                className='textbox'
              />
              <button onClick={handleSendMessage} type='button' className='btn'>
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
