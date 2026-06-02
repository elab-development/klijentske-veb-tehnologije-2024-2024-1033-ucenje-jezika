import { useState, useId } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

type Topic = 'Adoption' | 'Volunteering' | 'Partnerships' | 'Other';

export default function Contact() {
  const nameId = useId();
  const emailId = useId();
  const topicId = useId();
  const messageId = useId();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<Topic>('Adoption');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<
    Partial<Record<'name' | 'email' | 'message' | 'consent', string>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  function validate() {
    const e: Partial<Record<'name' | 'email' | 'message' | 'consent', string>> =
      {};
    if (!name.trim() || name.trim().length < 2)
      e.name = 'Please enter your full name (min 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'Please enter a valid email address.';
    if (!message.trim() || message.trim().length < 10)
      e.message = 'Please write a message (min 10 characters).';
    return e;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(false);
    const ve = validate();
    setErrors(ve);
    if (Object.keys(ve).length > 0) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSent(true);

    setName('');
    setEmail('');
    setTopic('Adoption');
    setMessage('');
    setErrors({});
  }

  return (
    <div className='space-y-12'>
      <section className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tight'>Contact us</h1>
        <p className='text-slate-700'>
          Have questions about adoption, partnerships, or volunteering? Send us
          a message — we’d love to hear from you.
        </p>
      </section>

      <section className='grid gap-6 lg:grid-cols-3'>
        <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1'>
          <h2 className='mb-4 text-lg font-semibold'>Get in touch</h2>
          <ul className='grid gap-4 text-sm'>
            <li className='flex items-start gap-3'>
              <span className='inline-grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-700'>
                <Mail className='h-5 w-5' />
              </span>
              <div>
                <p className='font-medium'>Email</p>
                <p className='text-slate-600'>hello@pawsandfriends.example</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='inline-grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-700'>
                <Phone className='h-5 w-5' />
              </span>
              <div>
                <p className='font-medium'>Phone</p>
                <p className='text-slate-600'>+1 (555) 123-4567</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='inline-grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-700'>
                <MapPin className='h-5 w-5' />
              </span>
              <div>
                <p className='font-medium'>Address</p>
                <p className='text-slate-600'>123 Shelter Ave, Pet City</p>
              </div>
            </li>
            <li className='flex items-start gap-3'>
              <span className='inline-grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-700'>
                <Clock className='h-5 w-5' />
              </span>
              <div>
                <p className='font-medium'>Hours</p>
                <p className='text-slate-600'>Mon–Fri, 9:00–17:00</p>
              </div>
            </li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2'
        >
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <label
                htmlFor={nameId}
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Name
              </label>
              <input
                id={nameId}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-400 focus:ring-red-200'
                    : 'border-slate-300 focus:ring-emerald-200'
                }`}
                placeholder='Your full name'
              />
              {errors.name && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={emailId}
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Email
              </label>
              <input
                id={emailId}
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-400 focus:ring-red-200'
                    : 'border-slate-300 focus:ring-emerald-200'
                }`}
                placeholder='you@example.com'
              />
              {errors.email && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className='mt-4'>
            <label
              htmlFor={topicId}
              className='mb-1 block text-sm font-medium text-slate-700'
            >
              Topic
            </label>
            <select
              id={topicId}
              value={topic}
              onChange={(e) => setTopic(e.target.value as Topic)}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-200'
            >
              <option>Adoption</option>
              <option>Volunteering</option>
              <option>Partnerships</option>
              <option>Other</option>
            </select>
          </div>

          <div className='mt-4'>
            <label
              htmlFor={messageId}
              className='mb-1 block text-sm font-medium text-slate-700'
            >
              Message
            </label>
            <textarea
              id={messageId}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${
                errors.message
                  ? 'border-red-400 focus:ring-red-200'
                  : 'border-slate-300 focus:ring-emerald-200'
              }`}
              placeholder='Tell us a bit about your interest…'
            />
            {errors.message && (
              <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                <AlertCircle className='h-4 w-4' /> {errors.message}
              </p>
            )}
          </div>

          <div className='mt-6 flex items-center gap-3'>
            <button
              type='submit'
              disabled={submitting}
              className='inline-flex h-11 items-center justify-center rounded-xl bg-emerald-600 px-5 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60 whitespace-nowrap leading-none'
            >
              <Send className='mr-2 h-4 w-4' />
              {submitting ? 'Sending…' : 'Send message'}
            </button>

            {sent && (
              <span className='inline-flex items-center gap-2 text-emerald-700'>
                <CheckCircle2 className='h-5 w-5' />
                Message sent
              </span>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
