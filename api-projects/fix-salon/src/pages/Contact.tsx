import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import { IoMdPin } from 'react-icons/io';
import toast from 'react-hot-toast';

import contact1 from '../assets/contact/contact1.png';
import { useLoggedInUser } from '../hooks/useLoggedInUser.hook';
import { Message, userMessages } from '../models/Message';

const Contact = () => {
  const { loggedInUser } = useLoggedInUser();
  const [name, setName] = useState(loggedInUser?.name?.split(' ')[0] || '');
  const [lastName, setLastName] = useState(
    loggedInUser?.name?.split(' ')[1] || ''
  );
  const [email, setEmail] = useState(loggedInUser?.email || '');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim() === '') {
      toast.error(<b className='text-lg'>Unesite Vaše ime!</b>);
      return;
    }
    if (lastName.trim() === '') {
      toast.error(<b className='text-lg'>Unesite Vaše prezime!</b>);
      return;
    }
    if (email.trim() === '') {
      toast.error(<b className='text-lg'>Unesite Vašu email adresu!</b>);
      return;
    }
    if (message.trim() === '') {
      toast.error(<b className='text-lg'>Unesite Vašu poruku!</b>);
      return;
    }

    const newMessage = new Message(name + lastName, email, message);
    userMessages.push(newMessage);
    toast.success(
      <b className='text-lg'>
        Vaša poruka je prosleđena. Uskoro ćete dobiti odgovor na prosleđenoj
        email adresi!
      </b>
    );
    navigate('/');
  };

  return (
    <div className='flex flex-col sm:flex-row'>
      <div className='flex-1 bg-pink-dark flex flex-col items-center'>
        <h1 className='text-5xl text-pink-heading my-10'>Kontaktirajte nas</h1>
        <div className='flex flex-col gap-5 bg-pink-light p-4'>
          <div className='flex gap-2 items-center text-pink-heading text-xl'>
            <MdEmail /> <span>salonlepotefix@gmail.com</span>
          </div>
          <div className='flex gap-2 items-center text-pink-heading text-xl'>
            <IoMdPin /> <span>Kralja Milana 50, Beograd</span>
          </div>
          <div className='flex gap-2 items-center text-pink-heading text-xl'>
            <MdLocalPhone /> <span>+381 612 345 67</span>
          </div>
        </div>

        <p className='mt-10 text-gray-500 text-xl'>
          Za sva dodatna pitanja, popunite formu ispod
        </p>

        <form
          className='mt-10 flex flex-col gap-2 w-80'
          onSubmit={handleSendMessage}
        >
          <input
            type='text'
            placeholder='Ime'
            className='p-2 rounded-lg'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            placeholder='Prezime'
            className='p-2 rounded-lg'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type='email'
            placeholder='Email adresa'
            className='p-2 rounded-lg'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            value={message}
            placeholder='Vaša poruka'
            className='p-2 rounded-lg'
            rows={3}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type='submit'
            className='bg-pink-heading text-white py-2 text-2xl hover:bg-pink-light'
          >
            Pošalji
          </button>
        </form>
      </div>
      <div className='flex-1 bg-pink-dark'>
        <img src={contact1} alt='woman' />
      </div>
    </div>
  );
};

export default Contact;
