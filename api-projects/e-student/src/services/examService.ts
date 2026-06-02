import type { Exam, ExamSession, ExamTerm, ExamData } from '../data/examsData';
import { getExamData, isRegistrationOpen } from '../data/examsData';

export const REG_CHANGE_EVENT = 'exam-regs-changed';

export type ExamRegistration = {
  id: string;
  userId: number;
  termId: string;
  createdAt: string;
};

const nowISO = () => new Date().toISOString();

function loadRegs(): ExamRegistration[] {
  const raw = localStorage.getItem('examRegs');
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ExamRegistration[];
  } catch {
    return [];
  }
}

function saveRegs(regs: ExamRegistration[]) {
  localStorage.setItem('examRegs', JSON.stringify(regs));
  window.dispatchEvent(new CustomEvent(REG_CHANGE_EVENT));
}

function hasOtherTermSameExamSession(
  regs: ExamRegistration[],
  data: ExamData,
  userId: number,
  targetTerm: ExamTerm
) {
  const targetSessionId = targetTerm.sessionId;
  const targetExamId = targetTerm.examId;

  return regs.some((r) => {
    if (r.userId !== userId) return false;
    const t = data.terms.find((x) => x.id === r.termId);
    if (!t) return false;
    return (
      t.sessionId === targetSessionId &&
      t.examId === targetExamId &&
      t.id !== targetTerm.id
    );
  });
}

export class ExamService {
  getData(): ExamData {
    return getExamData();
  }
  getSessions(): ExamSession[] {
    return this.getData().sessions;
  }
  getExams(): Exam[] {
    return this.getData().exams;
  }
  getTerms(): ExamTerm[] {
    return this.getData().terms;
  }
  getTerm(termId: string): ExamTerm | undefined {
    return this.getData().terms.find((t) => t.id === termId);
  }
  getTermsBySession(sessionId: string): ExamTerm[] {
    return this.getData().terms.filter((t) => t.sessionId === sessionId);
  }

  getAllRegistrations(): ExamRegistration[] {
    return loadRegs();
  }
  getUserRegistrations(userId: number): ExamRegistration[] {
    return loadRegs().filter((r) => r.userId === userId);
  }
  isUserRegisteredForTerm(userId: number, termId: string): boolean {
    return loadRegs().some((r) => r.userId === userId && r.termId === termId);
  }
  countRegistrationsForTerm(termId: string): number {
    return loadRegs().filter((r) => r.termId === termId).length;
  }

  canRegister(userId: number, termId: string, at = new Date()) {
    const data = this.getData();
    const term = data.terms.find((t) => t.id === termId);
    if (!term) return { ok: false, reason: 'Nepostojeći termin' };
    const session = data.sessions.find((s) => s.id === term.sessionId);
    if (!session) return { ok: false, reason: 'Nepostojeći rok' };
    if (!isRegistrationOpen(session, at)) {
      return {
        ok: false,
        reason: 'Prijave trenutno nisu otvorene za ovaj rok',
      };
    }
    if (this.isUserRegisteredForTerm(userId, termId)) {
      return { ok: false, reason: 'Već ste prijavljeni na ovaj termin' };
    }
    if (hasOtherTermSameExamSession(loadRegs(), data, userId, term)) {
      return {
        ok: false,
        reason: 'Već ste prijavljeni na termin istog ispita u ovom roku',
      };
    }
    return { ok: true };
  }

  register(userId: number, termId: string) {
    const check = this.canRegister(userId, termId);
    if (!check.ok) return check;
    const regs = loadRegs();
    regs.push({
      id: `${userId}-${termId}`,
      userId,
      termId,
      createdAt: nowISO(),
    });
    saveRegs(regs);
    return { ok: true };
  }

  unregister(userId: number, termId: string) {
    const regs = loadRegs();
    const before = regs.length;
    const filtered = regs.filter(
      (r) => !(r.userId === userId && r.termId === termId)
    );
    if (filtered.length === before) {
      return { ok: false, reason: 'Niste prijavljeni na ovaj termin' };
    }
    saveRegs(filtered);
    return { ok: true };
  }
}

export const examService = new ExamService();
