import { type FormEvent, useMemo, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Please fill in Name, Email, and Message.');
      return;
    }

    const to = 'info@sports.org';
    const subject = `${name} — Contact from sports.org`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const href = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  };

  return (
    <section className='mx-auto max-w-6xl space-y-6'>
      <header>
        <h1 className='text-2xl font-semibold'>Contact us</h1>
        <p className='text-gray-600'>
          Questions, feedback, or partnership ideas? We’d love to hear from you.
        </p>
      </header>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='space-y-6'>
          <div className='rounded-2xlbg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-lg font-semibold'>Get in touch</h2>
            <ul className='space-y-3 text-gray-700'>
              <li className='flex items-center gap-2'>
                <Mail className='h-5 w-5 text-indigo-600' />
                <a href='mailto:info@sports.org' className='hover:underline'>
                  info@sports.org
                </a>
              </li>
              <li className='flex items-center gap-2'>
                <Phone className='h-5 w-5 text-indigo-600' />
                <a href='tel:+381601234567' className='hover:underline'>
                  +381 60 123 4567
                </a>
              </li>
              <li className='flex items-center gap-2'>
                <MapPin className='h-5 w-5 text-indigo-600' />
                <span>Belgrade, Serbia</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className='rounded-2xlbg-white p-6 shadow-sm'>
            <h2 className='mb-4 text-lg font-semibold'>Send a message</h2>
            <form onSubmit={onSubmit} className='grid grid-cols-1 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Your name'
                  className='mt-1 w-full rounded-lg shadow-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='you@example.com'
                  className='mt-1 w-full rounded-lg shadow-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder='How can we help?'
                  className='mt-1 w-full rounded-lg shadow-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
                />
              </div>

              <div className='flex justify-end'>
                <button
                  type='submit'
                  className='cursor-pointer inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700'
                >
                  <Send className='h-4 w-4' />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='rounded-2xl bg-white p-6 shadow-sm'>
          <h2 className='mb-3 text-lg font-semibold'>Our location</h2>
          <ContactMap />
          <p className='mt-2 text-sm text-gray-600'>
            We’re based in Belgrade. Use the form or email to reach out — we
            usually reply within 1–2 business days.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const center = useMemo(() => ({ lat: 44.8176, lng: 20.4569 }), []);

  return (
    <div className='overflow-hidden rounded-xl shadow-md'>
      {!isLoaded ? (
        <div className='h-[500px] w-full bg-gray-50 p-4 text-sm text-gray-600'>
          Loading map…
        </div>
      ) : (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '500px' }}
          center={center}
          zoom={12}
          options={{ streetViewControl: false, mapTypeControl: false }}
        >
          <Marker position={center} title='sports.org — Belgrade, Serbia' />
        </GoogleMap>
      )}
    </div>
  );
}
