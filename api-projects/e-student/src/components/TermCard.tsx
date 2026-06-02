import type { ExamTerm, Exam } from '../data/examsData';
import { examService } from '../services/examService';

type Props = {
  term: ExamTerm;
  exam: Exam;
  userId: number | null;
  registrationOpen: boolean;
};

export default function TermCard({
  term,
  exam,
  userId,
  registrationOpen,
}: Props) {
  const count = examService.countRegistrationsForTerm(term.id);
  const registered =
    userId != null
      ? examService.isUserRegisteredForTerm(userId, term.id)
      : false;

  const onToggle = () => {
    if (userId == null) return;
    if (registered) {
      const res = examService.unregister(userId, term.id);
      if (!res.ok) alert(res.reason);
    } else {
      const res = examService.register(userId, term.id);
      if (!res.ok) alert(res.reason);
    }
  };

  return (
    <div className='rounded-xl border bg-white p-3'>
      <div className='font-medium'>{exam.name}</div>
      <div className='text-sm text-gray-600'>
        {term.startsAt.replace('T', ' ')}
        {term.endsAt ? ` – ${term.endsAt.slice(11, 16)}` : ''}
      </div>
      {term.room && (
        <div className='text-sm text-gray-500'>Učionica: {term.room}</div>
      )}
      <div className='mt-2 flex items-center justify-between'>
        <span className='text-sm text-gray-700'>Prijava: {count}</span>
        <button
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            registered
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : registrationOpen
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          onClick={onToggle}
          disabled={!registrationOpen && !registered}
        >
          {registered ? 'Odjavi' : 'Prijavi'}
        </button>
      </div>
    </div>
  );
}
