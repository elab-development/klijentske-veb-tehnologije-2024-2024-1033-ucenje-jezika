import type { ExamSession } from '../data/examsData';
import StatusPill from './StatusPill';

type Props = {
  session: ExamSession;
  open: boolean;
  children: React.ReactNode;
};

export default function SessionCard({ session, open, children }: Props) {
  return (
    <div className='mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100'>
      <div className='mb-3 flex flex-wrap items-center justify-between gap-3'>
        <div>
          <h2 className='text-lg font-semibold'>
            {session.name} {session.year}
          </h2>
          <p className='text-sm text-gray-600'>
            Ispitni period: {session.periodStart} – {session.periodEnd} •
            Prijave: {session.regStart} – {session.regEnd}
          </p>
        </div>
        <StatusPill open={open} />
      </div>
      {children}
    </div>
  );
}
