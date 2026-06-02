import { useMemo } from 'react';
import { examService } from '../services/examService';
import { isRegistrationOpen } from '../data/examsData';
import { useAuth } from '../context/AuthContext';
import { useExamRegsVersion } from '../hooks/useExamRegsVersion';
import SessionCard from '../components/SessionCard';
import TermCard from '../components/TermCard';

export default function Exams() {
  const { user } = useAuth();
  const data = useMemo(() => examService.getData(), []);
  useExamRegsVersion();

  const now = new Date();

  return (
    <div>
      <div className='mx-auto w-full max-w-5xl px-4'>
        <h1 className='mb-4 text-2xl font-semibold'>Ispiti</h1>

        {data.sessions.map((s) => {
          const open = isRegistrationOpen(s, now);
          const terms = examService.getTermsBySession(s.id);

          return (
            <SessionCard key={s.id} session={s} open={open}>
              <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
                {terms.map((t) => {
                  const ex = data.exams.find((e) => e.id === t.examId)!;
                  return (
                    <TermCard
                      key={t.id}
                      term={t}
                      exam={ex}
                      userId={user?.id ?? null}
                      registrationOpen={open}
                    />
                  );
                })}
              </div>
            </SessionCard>
          );
        })}
      </div>
    </div>
  );
}
