import { useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { FaInstagram } from 'react-icons/fa6';
import { RiTiktokLine } from 'react-icons/ri';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((s) => ({ ...s, [field]: e.target.value }));
      setError(null);
      setSuccess(null);
    };

  function validate(): string | null {
    if (!form.name.trim()) return 'Please enter your name.';
    if (!form.email.trim()) return 'Please enter your email.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email address.';
    if (!form.subject.trim()) return 'Please add a subject.';
    if (form.message.trim().length < 10)
      return 'Your message should be at least 10 characters.';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSuccess(
      "Thanks! Your message has been received. We'll get back to you soon"
    );
    setForm({ name: '', email: '', subject: '', message: '' });
  }

  return (
    <section className='min-h-[calc(100vh-8rem)] bg-white'>
      <div className='container mx-auto px-6 py-12'>
        <header className='mb-10'>
          <h1 className='text-4xl font-extrabold text-gray-800 mb-3'>
            Contact <span className='text-pink-600'>CatCaffe</span>
          </h1>
          <p className='text-gray-700 max-w-2xl'>
            Have feedback, partnership ideas, or café recommendations? Send us a
            message— we’d love to hear from you.
          </p>
        </header>

        <div className='grid gap-8 md:grid-cols-2'>
          <aside className='rounded-2xl shadow-sm bg-pink-50 p-6'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Get in touch
            </h2>

            <div className='space-y-4 text-gray-700'>
              <div>
                <div className='font-medium text-gray-900'>Email</div>
                <a
                  href='mailto:hello@catcaffe.app'
                  className='text-pink-700 hover:underline'
                >
                  hello@catcaffe.app
                </a>
              </div>

              <div>
                <div className='font-medium text-gray-900'>Support hours</div>
                <p>Mon–Fri, 09:00–17:00 (CET)</p>
              </div>

              <div>
                <div className='font-medium text-gray-900'>Social</div>
                <ul className='flex gap-3 items-center'>
                  <li>
                    <a className='text-gray-700 hover:text-pink-600' href='#'>
                      <BsTwitterX className='h-5 w-5 text-pink-600' />
                    </a>
                  </li>
                  <li>
                    <a className='text-gray-700 hover:text-pink-600' href='#'>
                      <FaInstagram className='h-6 w-6 text-pink-600' />
                    </a>
                  </li>
                  <li>
                    <a className='text-gray-700 hover:text-pink-600' href='#'>
                      <RiTiktokLine className='h-6 w-6 text-pink-600' />
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <div className='font-medium text-gray-900'>Location</div>
                <p>Belgrade, Serbia (remote-friendly)</p>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className='rounded-2xl shadow-sm bg-white p-6'
          >
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Send a message
            </h2>

            {error && (
              <div className='mb-4 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-2'>
                {error}
              </div>
            )}
            {success && (
              <div className='mb-4 rounded-lg bg-green-50 border border-green-200 text-green-700 px-4 py-2'>
                {success}
              </div>
            )}

            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='sm:col-span-1'>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <input
                  id='name'
                  type='text'
                  value={form.name}
                  onChange={onChange('name')}
                  className='mt-1 w-full rounded-lg border p-1 border-gray-300 focus:ring-pink-500'
                  placeholder='Your name'
                />
              </div>

              <div className='sm:col-span-1'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  id='email'
                  type='email'
                  value={form.email}
                  onChange={onChange('email')}
                  className='mt-1 w-full rounded-lg border p-1 border-gray-300 focus:border-pink-500 focus:ring-pink-500'
                  placeholder='you@example.com'
                />
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700'
                >
                  Subject
                </label>
                <input
                  id='subject'
                  type='text'
                  value={form.subject}
                  onChange={onChange('subject')}
                  className='mt-1 w-full rounded-lg border p-1 border-gray-300 focus:border-pink-500 focus:ring-pink-500'
                  placeholder='How can we help?'
                />
              </div>

              <div className='sm:col-span-2'>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  value={form.message}
                  onChange={onChange('message')}
                  rows={6}
                  className='mt-1 w-full rounded-lg border p-1 border-gray-300 focus:border-pink-500 focus:ring-pink-500'
                  placeholder='Write your message...'
                />
              </div>
            </div>

            <div className='mt-6 flex items-center gap-3'>
              <button
                type='submit'
                disabled={submitting}
                className='cursor-pointer inline-flex items-center justify-center rounded-lg bg-pink-600 px-6 py-3 font-semibold text-white shadow hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-60'
              >
                {submitting ? 'Sending...' : 'Send message'}
              </button>
              <span className='text-sm text-gray-500'>
                We’ll reply to your email address.
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
