import type { Board } from './boardGenerator';

export type Player = 'red' | 'blue';

export type ColumnScoreMap = {
  [colId: string]: {
    opened: number;
    solved: boolean;
    solver?: Player;
    points: number;
  };
};

const pointsForOpened = (opened: number) => {
  if (opened <= 1) return 5;
  if (opened === 2) return 4;
  if (opened === 3) return 3;
  return 2;
};

export class GameEngine {
  board: Board | null = null;
  started = false;
  current: Player = 'red';
  scores: Record<Player, number> = { red: 0, blue: 0 };
  columnState: ColumnScoreMap = {};
  finalSolved = false;
  finalSolver?: Player;

  private hasRevealedThisTurn = false;
  private hasGuessedThisTurn = false;
  private lockRevealThisTurn = false;

  constructor(board: Board | null) {
    if (board) this.loadBoard(board);
  }

  loadBoard(board: Board) {
    this.board = JSON.parse(JSON.stringify(board));
    this.started = false;
    this.current = 'red';
    this.scores = { red: 0, blue: 0 };
    this.finalSolved = false;
    this.finalSolver = undefined;
    this.columnState = {};
    for (const col of board.columns) {
      this.columnState[col.id] = { opened: 0, solved: false, points: 0 };
    }
    this.resetTurnState();
  }

  start() {
    if (!this.board) throw new Error('No board loaded');
    this.started = true;
    this.current = 'red';
    this.resetTurnState();
  }

  get canReveal(): boolean {
    return (
      !this.finalSolved &&
      this.started &&
      !this.lockRevealThisTurn &&
      (!this.hasRevealedThisTurn || this.hasGuessedThisTurn)
    );
  }
  get canGuess(): boolean {
    return (
      this.allColumnsSolved() ||
      (!this.finalSolved && this.started && this.hasRevealedThisTurn)
    );
  }
  get canSkip(): boolean {
    return (
      this.allColumnsSolved() ||
      (this.started &&
        !this.finalSolved &&
        this.hasRevealedThisTurn &&
        !this.hasGuessedThisTurn)
    );
  }

  private resetTurnState() {
    this.hasRevealedThisTurn = false;
    this.hasGuessedThisTurn = false;
    this.lockRevealThisTurn = false;
  }

  private switchTurn() {
    this.current = this.current === 'red' ? 'blue' : 'red';
    this.resetTurnState();
  }

  skipTurn() {
    if (!this.canSkip) return;
    this.switchTurn();
  }

  private revealEntireColumn(columnId: string) {
    if (!this.board) return;
    const col = this.board.columns.find((c) => c.id === columnId);
    if (!col) return;
    for (const cl of col.clues) {
      if (!cl.revealed) cl.revealed = true;
    }
  }

  revealClue(columnId: string, clueId: string) {
    if (!this.board || !this.started || this.finalSolved) return;
    if (!this.canReveal) return;

    const col = this.board.columns.find((c) => c.id === columnId);
    if (!col) return;
    const clue = col.clues.find((cl) => cl.id === clueId);
    if (!clue || clue.revealed) return;

    clue.revealed = true;
    this.columnState[columnId].opened += 1;

    this.hasRevealedThisTurn = true;
    this.hasGuessedThisTurn = false;
  }

  guessColumn(columnId: string, guess: string) {
    if (!this.board || !this.started || this.finalSolved) return false;
    if (!this.canGuess) return false;

    const col = this.board.columns.find((c) => c.id === columnId);
    if (!col || this.columnState[columnId].solved) return false;

    const isCorrect = normalize(guess) === normalize(col.solution);
    if (isCorrect) {
      const opened = this.columnState[columnId].opened;
      const pts = pointsForOpened(Math.max(1, opened));

      this.columnState[columnId].solved = true;
      this.columnState[columnId].solver = this.current;
      this.columnState[columnId].points = pts;
      this.scores[this.current] += pts;

      this.revealEntireColumn(columnId);

      this.lockRevealThisTurn = true;

      this.hasGuessedThisTurn = true;
      return true;
    } else {
      this.switchTurn();
      return false;
    }
  }

  guessFinal(guess: string) {
    if (!this.board || !this.started || this.finalSolved) return false;
    if (!this.canGuess) return false;

    const isCorrect = normalize(guess) === normalize(this.board!.finalSolution);
    if (!isCorrect) {
      this.switchTurn();
      return false;
    }

    let total = 5;
    for (const col of this.board!.columns) {
      const st = this.columnState[col.id];
      if (st.solved) continue;
      const opened = st.opened;
      const pts = opened === 0 ? 6 : pointsForOpened(opened);
      st.solved = true;
      st.solver = this.current;
      st.points = pts;
      this.revealEntireColumn(col.id);
      total += pts;
    }

    this.scores[this.current] += total;
    this.finalSolved = true;
    this.finalSolver = this.current;
    return true;
  }

  allColumnsSolved() {
    return Object.values(this.columnState).every((s) => s.solved);
  }
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}
