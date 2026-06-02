import { useMemo } from 'react';
import { examService } from '../services/examService';
import { useAuth } from '../context/AuthContext';

export default function MyRegistrations() {
  const { user } = useAuth();
  const data = useMemo(() => examService.getData(), []);
  const regs = user ? examService.getUserRegistrations(user.id) : [];

  return (
    <div>
      <div className='mx-auto w-full max-w-5xl px-4'>
        <h1 className='mb-4 text-2xl font-semibold'>Moje prijave</h1>

        {regs.length === 0 ? (
          <p className='text-gray-600'>Nemate prijavljenih termina.</p>
        ) : (
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {regs.map((r) => {
              const term = data.terms.find((t) => t.id === r.termId);
              if (!term) return null;
              const exam = data.exams.find((e) => e.id === term.examId);
              const sess = data.sessions.find((s) => s.id === term.sessionId);
              return (
                <div key={r.id} className='rounded-xl border bg-white p-3'>
                  <div className='font-medium'>{exam?.name}</div>
                  <div className='text-sm text-gray-600'>
                    {sess?.name} {sess?.year}
                  </div>
                  <div className='text-sm text-gray-600'>
                    {term.startsAt.replace('T', ' ')}
                    {term.endsAt ? ` – ${term.endsAt.slice(11, 16)}` : ''}
                  </div>
                  <div className='text-xs text-gray-500 mt-1'>
                    Prijavljeno: {new Date(r.createdAt).toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
