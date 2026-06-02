import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useEventim } from '../store/eventim';
import { EventEntity } from '../data/domain/EventEntity';
import EventCard from '../components/EventCard';
import { FaStar } from 'react-icons/fa';

export default function EventDetail() {
  const { id: eventIdParam, eventId: eventIdAlt } = useParams();
  const eventId = eventIdParam ?? eventIdAlt ?? '';
  const { events, artists, reviews } = useEventim();

  const raw = events.find((e) => e.id === eventId);
  const event = raw ? new EventEntity(raw) : null;

  const artistById = useMemo(
    () => Object.fromEntries(artists.map((a) => [a.id, a])),
    [artists]
  );

  const eventReviews = useMemo(
    () =>
      reviews.filter((r) => r.targetType === 'event' && r.targetId === eventId),
    [reviews, eventId]
  );
  const avgRating =
    eventReviews.length > 0
      ? (
          eventReviews.reduce((s, r) => s + r.rating, 0) / eventReviews.length
        ).toFixed(1)
      : null;

  const related = useMemo(() => {
    if (!event) return [];
    const sameCity = events
      .filter((e) => e.id !== event.id && e.venue.city === event.venue.city)
      .slice(0, 3);
    if (sameCity.length) return sameCity;

    const byArtist = events
      .filter(
        (e) =>
          e.id !== event.id &&
          e.artistIds.some((id) => event.artistIds.includes(id))
      )
      .slice(0, 3);

    return byArtist;
  }, [events, event]);

  if (!event) {
    return (
      <div className='py-16 text-center'>
        <h1 className='text-2xl font-semibold text-white'>Event not found</h1>
        <p className='mt-2 text-sm text-gray-400'>
          The event you’re looking for doesn’t exist or hasn’t been loaded yet.
        </p>
        <Link
          to='/events'
          className='mt-6 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500'
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className='py-8'>
      <section className='relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13]'>
        <div className='grid gap-6 p-6 md:grid-cols-[minmax(280px,42%)_1fr] md:p-8'>
          <div className='overflow-hidden rounded-xl border border-white/10 bg-white/5'>
            <img
              src={event.imageUrl || '/placeholder.png'}
              alt={event.title}
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>

          <div className='space-y-4'>
            <div className='inline-flex items-center gap-2'>
              <span className='rounded-md bg-red-600/20 px-2 py-0.5 text-xs font-medium text-red-300'>
                {event.type}
              </span>
              {avgRating && (
                <span className='rounded-md bg-white/5 px-2 py-0.5 text-xs text-yellow-300'>
                  ★ {avgRating} ({eventReviews.length})
                </span>
              )}
            </div>

            <h1 className='text-2xl font-bold text-white sm:text-3xl'>
              {event.title}
            </h1>

            <p className='text-sm text-gray-300'>
              <span className='font-medium'>{event.formattedDate()}</span>
              <span className='mx-2 text-gray-500'>•</span>
              {event.venue.name} · {event.venue.city}, {event.venue.country}
            </p>

            <div className='flex flex-wrap gap-2'>
              {event.artistIds.length ? (
                event.artistIds.map((id: string) => {
                  const a = artistById[id];
                  return a ? (
                    <Link
                      key={id}
                      to={`/artists/${id}`}
                      className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200 transition hover:bg-red-600/20 hover:text-white'
                    >
                      {a.name}
                    </Link>
                  ) : (
                    <span
                      key={id}
                      className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400'
                    >
                      Unknown artist
                    </span>
                  );
                })
              ) : (
                <span className='text-xs text-gray-400'>Artists: —</span>
              )}
            </div>

            {event.description ? (
              <p className='whitespace-pre-line text-sm leading-relaxed text-gray-300'>
                {event.description}
              </p>
            ) : (
              <p className='text-sm text-gray-400'>
                No description provided for this event.
              </p>
            )}

            <div className='flex flex-wrap gap-2 pt-2'>
              <Link
                to='/events'
                className='rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white'
              >
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATIONS */}
      <ReservationSection eventId={event.id} />

      {/* REVIEWS */}
      <ReviewsSection eventId={event.id} />

      {/* Related events */}
      <section className='mt-12'>
        <div className='mb-4 flex items-end justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-white'>
              You may also like
            </h2>
            <p className='text-sm text-gray-400'>
              More shows {event.venue.city ? `in ${event.venue.city}` : ''}{' '}
              {event.venue.city ? 'or with similar artists.' : ''}
            </p>
          </div>
          <Link
            to='/events'
            className='hidden rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white md:inline-block'
          >
            Browse all events
          </Link>
        </div>

        <RelatedGrid events={related} artistById={artistById} />
      </section>
    </div>
  );
}

/* ---------- Reservations (list + form) ---------- */
function ReservationSection({ eventId }: { eventId: string }) {
  const { reservations, addReservation, events } = useEventim();
  const event = events.find((e) => e.id === eventId);

  const myReservations = reservations.filter((r) => r.eventId === eventId);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState<{ ok?: string; err?: string } | null>(null);

  function maskEmail(v: string) {
    const [u, d] = v.split('@');
    if (!u || !d) return v;
    const safeUser =
      u.length <= 2
        ? u[0] + '*'
        : u[0] + '*'.repeat(Math.max(1, u.length - 2)) + u[u.length - 1];
    return `${safeUser}@${d}`;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!name.trim()) return setMsg({ err: 'Please enter your name.' });
    if (!/^\S+@\S+\.\S+$/.test(email))
      return setMsg({ err: 'Please enter a valid email.' });
    if (qty < 1 || qty > 10)
      return setMsg({ err: 'Quantity must be between 1 and 10.' });

    addReservation({ eventId, name: name.trim(), email: email.trim(), qty });

    setName('');
    setEmail('');
    setQty(1);
    setMsg({ ok: 'Reservation saved locally.' });
  }

  return (
    <section className='mt-12' id='reserve'>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-white'>Reservations</h2>
        <div className='text-sm text-gray-400'>
          {myReservations.length} total
          {event ? (
            <>
              {' '}
              <span className='text-gray-600'>•</span>{' '}
              <span className='text-gray-500'>{event.title}</span>
            </>
          ) : null}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {/* List */}
        <div className='space-y-3'>
          {myReservations.length === 0 ? (
            <div className='rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-gray-400'>
              No reservations yet — reserve your seat now.
            </div>
          ) : (
            myReservations.map((r) => (
              <div
                key={r.id}
                className='rounded-xl border border-white/10 bg-[#0f0f13] p-4'
              >
                <div className='text-sm text-gray-300'>
                  <span className='font-semibold text-white'>{r.name}</span>{' '}
                  <span className='mx-1 text-gray-500'>·</span>
                  <span className='text-gray-400'>
                    {maskEmail(r.email)}
                  </span>{' '}
                  <span className='mx-1 text-gray-500'>·</span>
                  <span className='text-gray-300'>{r.qty} ticket(s)</span>
                </div>
                <div className='mt-1 text-xs text-gray-500'>
                  {new Date(r.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className='rounded-xl border border-white/10 bg-[#0f0f13] p-4'
        >
          <h3 className='mb-3 text-base font-semibold text-white'>
            Reserve tickets
          </h3>
          <p className='mb-3 text-xs text-gray-500'>
            Demo only — reservations are stored in your browser (no payment).
          </p>

          <div className='grid gap-3'>
            <div className='grid gap-2 sm:grid-cols-2'>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Your name'
                className='rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                type='email'
                className='rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
              />
            </div>

            <div className='flex items-center gap-2'>
              <label className='w-24 text-sm text-gray-400'>Quantity</label>
              <input
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                type='number'
                min={1}
                max={10}
                className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
              />
            </div>

            {msg?.err && (
              <div className='rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
                {msg.err}
              </div>
            )}
            {msg?.ok && (
              <div className='rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'>
                {msg.ok}
              </div>
            )}

            <div className='flex justify-end'>
              <button
                type='submit'
                className='rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/30 transition hover:bg-red-500'
              >
                Save reservation
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Reviews (list + form) ---------- */
function ReviewsSection({ eventId }: { eventId: string }) {
  const { reviews } = useEventim();
  const myReviews = reviews.filter(
    (r) => r.targetType === 'event' && r.targetId === eventId
  );
  const avg =
    myReviews.length > 0
      ? myReviews.reduce((s, r) => s + r.rating, 0) / myReviews.length
      : null;

  return (
    <section className='mt-12'>
      <div className='mb-3 flex items-center justify-between'>
        <h2 className='text-xl font-semibold text-white'>Reviews</h2>
        <div className='text-sm text-gray-400'>
          {avg ? (
            <div className='flex items-center gap-1'>
              <span className='text-yellow-300 flex items-center gap-1'>
                <FaStar />
                {avg.toFixed(1)}
              </span>{' '}
              <span className='text-gray-500'>({myReviews.length})</span>
            </div>
          ) : (
            <span className='text-gray-500'>No ratings yet</span>
          )}
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <ReviewsList reviews={myReviews} />
        <ReviewForm eventId={eventId} />
      </div>
    </section>
  );
}

function ReviewsList({
  reviews,
}: {
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    createdAt: string;
  }[];
}) {
  if (reviews.length === 0) {
    return (
      <div className='rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-gray-400'>
        No reviews yet — be the first to leave one!
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      {reviews.map((r) => (
        <div
          key={r.id}
          className='rounded-2xl border border-white/10 bg-[#0f0f13] p-4'
        >
          <div className='mb-1 text-sm text-gray-400'>
            <span className='font-semibold text-gray-200'>{r.author}</span>{' '}
            <span className='mx-1'>·</span>
            <span className='text-yellow-300'>
              {Array.from({ length: r.rating })
                .map(() => '★')
                .join('')}
            </span>
            <span className='mx-1'>·</span>
            <span className='text-xs text-gray-500'>
              {new Date(r.createdAt).toLocaleString()}
            </span>
          </div>
          <p className='text-sm text-gray-300'>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

function ReviewForm({ eventId }: { eventId: string }) {
  const { addReview } = useEventim();
  const [rating, setRating] = useState<number>(5);
  const [author, setAuthor] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [msg, setMsg] = useState<{ ok?: string; err?: string } | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    if (!author.trim()) return setMsg({ err: 'Please enter your name.' });
    if (comment.trim().length < 5)
      return setMsg({ err: 'Comment must be at least 5 characters.' });

    addReview({
      targetType: 'event',
      targetId: eventId,
      rating: Math.max(1, Math.min(5, rating)) as 1 | 2 | 3 | 4 | 5,
      author: author.trim(),
      comment: comment.trim(),
    });

    setAuthor('');
    setComment('');
    setRating(5);
    setMsg({ ok: 'Thanks! Your review was saved locally.' });
  }

  return (
    <form
      onSubmit={onSubmit}
      className='rounded-xl border border-white/10 bg-[#0f0f13] p-4'
    >
      <h3 className='mb-3 text-base font-semibold text-white'>
        Leave a review
      </h3>

      <div className='grid gap-3'>
        <div className='flex items-center gap-2'>
          <label className='w-24 text-sm text-gray-400'>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} ★
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-2'>
          <label className='w-24 text-sm text-gray-400'>Name</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder='Your name'
            className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
          />
        </div>

        <div>
          <label className='mb-1 block text-sm text-gray-400'>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Share your experience…'
            rows={4}
            className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
          />
        </div>

        {msg?.err && (
          <div className='rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
            {msg.err}
          </div>
        )}
        {msg?.ok && (
          <div className='rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200'>
            {msg.ok}
          </div>
        )}

        <div className='flex justify-end'>
          <button
            type='submit'
            className='rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/30 transition hover:bg-red-500'
          >
            Submit review
          </button>
        </div>
      </div>
    </form>
  );
}

/* ---------- Related grid helper ---------- */
function RelatedGrid({
  events,
  artistById,
}: {
  events: { id: string }[];
  artistById: Record<string, { name: string } | undefined>;
}) {
  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {events.length ? (
        events.map((e: any) => (
          <EventCard key={e.id} event={e} artistById={artistById} />
        ))
      ) : (
        <div className='rounded-2xl border border-white/10 bg-[#0f0f13] p-6 text-center text-gray-400'>
          No related events found.
        </div>
      )}
    </div>
  );
}
