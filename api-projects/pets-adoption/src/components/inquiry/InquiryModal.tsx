import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import type { Inquiry } from '../../models/Inquiry';
import { addInquiry } from '../../storage/inquiries';

type Props = {
  open: boolean;
  onClose: () => void;
  petId: string;
  petName: string;
  onCreated?: (inq: Inquiry) => void;
};

export default function InquiryModal({
  open,
  onClose,
  petId,
  petName,
  onCreated,
}: Props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (open) {
      setEmail('');
      setMessage('');
      setSubmitting(false);
      setTimeout(() => bodyRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;
    setSubmitting(true);
    try {
      const inq = addInquiry({ petId, email, message });
      onCreated?.(inq);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 grid place-items-center bg-black/40 p-4'
      role='dialog'
      aria-modal='true'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl'>
        <div className='flex items-center justify-between border-b border-slate-200 p-4'>
          <h2 className='text-lg font-semibold'>
            Send inquiry about {petName}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg p-2 text-slate-500 hover:bg-slate-100'
            aria-label='Close'
          >
            <X className='h-5 w-5' />
          </button>
        </div>

        <form onSubmit={submit} className='p-4 space-y-4'>
          <div>
            <label
              htmlFor='inq-email'
              className='block text-sm font-medium text-slate-700'
            >
              Your email
            </label>
            <input
              id='inq-email'
              type='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
              className='mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
            />
          </div>

          <div>
            <label
              htmlFor='inq-message'
              className='block text-sm font-medium text-slate-700'
            >
              Message
            </label>
            <textarea
              id='inq-message'
              ref={bodyRef}
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Hi! We're interested in ${petName}. Could we meet this weekend?`}
              className='mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
            />
          </div>

          <div className='flex items-center justify-end gap-2 pt-1'>
            <button
              type='button'
              onClick={onClose}
              className='inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={submitting}
              className='inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60'
            >
              {submitting ? 'Sending…' : 'Send inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
