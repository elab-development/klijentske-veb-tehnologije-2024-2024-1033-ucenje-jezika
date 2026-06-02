export type Exam = {
  id: string;
  name: string;
  code: string;
};

export type ExamSession = {
  id: string;
  name: string;
  year: number;
  periodStart: string;
  periodEnd: string;
  regStart: string;
  regEnd: string;
};

export type ExamTerm = {
  id: string;
  examId: string;
  sessionId: string;
  startsAt: string;
  endsAt?: string;
  room?: string;
};

export const EXAMS: Exam[] = [
  {
    id: 'aros',
    code: 'AROS',
    name: 'Arhitektura računara i operativni sistemi',
  },
  { id: 'p1', code: 'PR1', name: 'Programiranje 1' },
  { id: 'tv', code: 'TV', name: 'Teorija verovatnoće' },
  {
    id: 'kteh',
    code: 'KTEH',
    name: 'Klijentske veb tehnologije i skriptni jezici',
  },
  { id: 'cis', code: 'CIS', name: 'Cloud infrastruktura i servisi' },
  { id: 'spa', code: 'SPA', name: 'Strukture podataka i algoritmi' },
  { id: 'bp', code: 'BP', name: 'Baze podataka' },
  { id: 'stat', code: 'STAT', name: 'Statistika' },
  { id: 'mkt', code: 'MKT', name: 'Marketing' },
  { id: 'dms', code: 'DMS', name: 'Diskretne matematičke strukture' },
  { id: 'fmr', code: 'FMR', name: 'Finansijski menadžment i računovodstvo' },
];

// Rokovi
export const SESSIONS_2025: ExamSession[] = [
  {
    id: 'jan-2025',
    name: 'Januarski',
    year: 2025,
    periodStart: '2025-01-20',
    periodEnd: '2025-01-31',
    regStart: '2025-01-05',
    regEnd: '2025-01-15',
  },
  {
    id: 'feb-2025',
    name: 'Februarski',
    year: 2025,
    periodStart: '2025-02-10',
    periodEnd: '2025-02-20',
    regStart: '2025-01-25',
    regEnd: '2025-02-05',
  },
  {
    id: 'jun-2025',
    name: 'Junski',
    year: 2025,
    periodStart: '2025-06-10',
    periodEnd: '2025-06-20',
    regStart: '2025-05-25',
    regEnd: '2025-06-05',
  },
  {
    id: 'jul-2025',
    name: 'Julski',
    year: 2025,
    periodStart: '2025-07-01',
    periodEnd: '2025-07-10',
    regStart: '2025-06-15',
    regEnd: '2025-06-25',
  },
  {
    id: 'sep-2025',
    name: 'Septembarski',
    year: 2025,
    periodStart: '2025-09-01',
    periodEnd: '2025-09-10',
    regStart: '2025-08-15',
    regEnd: '2025-08-25',
  },
  {
    id: 'okt-2025',
    name: 'Oktobarski',
    year: 2025,
    periodStart: '2025-09-26',
    periodEnd: '2025-09-30',
    regStart: '2025-09-15',
    regEnd: '2025-09-25',
  },
];

export const toISODateTime = (d: string, time = '09:00'): string =>
  `${d}T${time}:00`;

export function isWithin(dateISO: string, startISO: string, endISO: string) {
  const t = new Date(dateISO).getTime();
  const a = new Date(startISO).getTime();
  const b = new Date(endISO).getTime();
  return t >= a && t <= b;
}

export function isRegistrationOpen(session: ExamSession, now = new Date()) {
  return isWithin(now.toISOString(), session.regStart, session.regEnd);
}

export function isExamPeriod(session: ExamSession, now = new Date()) {
  return isWithin(now.toISOString(), session.periodStart, session.periodEnd);
}

// Generišemo po jedan termin za svaki ispit u svakom roku (raspoređeno po danima)
function generateTerms(exams: Exam[], sessions: ExamSession[]): ExamTerm[] {
  const terms: ExamTerm[] = [];
  for (const s of sessions) {
    const start = new Date(s.periodStart);
    exams.forEach((exam, idx) => {
      const day = new Date(start);
      day.setDate(start.getDate() + (idx % 7));
      const startsAt = toISODateTime(
        day.toISOString().slice(0, 10),
        '10:00:00'
      );
      const endsAt = toISODateTime(day.toISOString().slice(0, 10), '12:00:00');

      terms.push({
        id: `${exam.id}-${s.id}`,
        examId: exam.id,
        sessionId: s.id,
        startsAt,
        endsAt,
        room: `A${(idx % 5) + 1}.0${(idx % 4) + 1}`,
      });
    });
  }
  return terms;
}

export type ExamData = {
  exams: Exam[];
  sessions: ExamSession[];
  terms: ExamTerm[];
};

export function seedExamData(): ExamData {
  const existing = localStorage.getItem('examData');
  if (existing) {
    try {
      return JSON.parse(existing) as ExamData;
    } catch {}
  }
  const terms = generateTerms(EXAMS, SESSIONS_2025);
  const payload: ExamData = { exams: EXAMS, sessions: SESSIONS_2025, terms };
  localStorage.setItem('examData', JSON.stringify(payload));
  return payload;
}

export function getExamData(): ExamData {
  const raw = localStorage.getItem('examData');
  if (!raw) return seedExamData();
  try {
    return JSON.parse(raw) as ExamData;
  } catch {
    return seedExamData();
  }
}
