import type { Board } from '../lib/boardGenerator';

export const memoryBoards: Board[] = [
  {
    id: 'board_1',
    finalSolution: 'LEKTOR',
    columns: [
      {
        id: 'col_A',
        solution: 'PROFESIJA',
        revealed: false,
        clues: [
          { id: 'A1', text: 'ZANIMANJE', revealed: false },
          { id: 'A2', text: 'POSAO', revealed: false },
          { id: 'A3', text: 'VOJNIK', revealed: false },
          { id: 'A4', text: 'ADVOKAT', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'HANIBAL',
        revealed: false,
        clues: [
          { id: 'B1', text: 'SLONOVI', revealed: false },
          { id: 'B2', text: 'KARTAGINA', revealed: false },
          { id: 'B3', text: 'VOJSKOVOĐA', revealed: false },
          { id: 'B4', text: 'PRED VRATIMA', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'JEZIK',
        revealed: false,
        clues: [
          { id: 'C1', text: 'DLAKA', revealed: false },
          { id: 'C2', text: 'CIPELA', revealed: false },
          { id: 'C3', text: 'DUGAČAK', revealed: false },
          { id: 'C4', text: 'MIŠIĆ', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'GRAMATIKA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'PRAVILA', revealed: false },
          { id: 'D2', text: 'SEMANTIKA', revealed: false },
          { id: 'D3', text: 'SINTAKSA', revealed: false },
          { id: 'D4', text: 'FONOLOGIJA', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_2',
    finalSolution: 'KUHINJA',
    columns: [
      {
        id: 'col_A',
        solution: 'ZAČINI',
        revealed: false,
        clues: [
          { id: 'A1', text: 'BIBER', revealed: false },
          { id: 'A2', text: 'SO', revealed: false },
          { id: 'A3', text: 'PAPRIKA', revealed: false },
          { id: 'A4', text: 'KIM', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'POSUĐE',
        revealed: false,
        clues: [
          { id: 'B1', text: 'LONAC', revealed: false },
          { id: 'B2', text: 'TAVA', revealed: false },
          { id: 'B3', text: 'NOŽ', revealed: false },
          { id: 'B4', text: 'DASKA', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'RECEPT',
        revealed: false,
        clues: [
          { id: 'C1', text: 'SASTOJCI', revealed: false },
          { id: 'C2', text: 'PRIPREMA', revealed: false },
          { id: 'C3', text: 'KORACI', revealed: false },
          { id: 'C4', text: 'SLUŽENJE', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'TERMIKA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'KUVA', revealed: false },
          { id: 'D2', text: 'PRŽI', revealed: false },
          { id: 'D3', text: 'DINSTA', revealed: false },
          { id: 'D4', text: 'PEČE', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_3',
    finalSolution: 'PUTOVANJE',
    columns: [
      {
        id: 'col_A',
        solution: 'PRTЉAG',
        revealed: false,
        clues: [
          { id: 'A1', text: 'KOFER', revealed: false },
          { id: 'A2', text: 'TORBA', revealed: false },
          { id: 'A3', text: 'NASLON', revealed: false },
          { id: 'A4', text: 'ETIKETA', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'KARTA',
        revealed: false,
        clues: [
          { id: 'B1', text: 'AVION', revealed: false },
          { id: 'B2', text: 'VOZ', revealed: false },
          { id: 'B3', text: 'AUTOBUS', revealed: false },
          { id: 'B4', text: 'UKRCANJE', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'SMEŠTAJ',
        revealed: false,
        clues: [
          { id: 'C1', text: 'HOTEL', revealed: false },
          { id: 'C2', text: 'HOSTEL', revealed: false },
          { id: 'C3', text: 'RECEPCIJA', revealed: false },
          { id: 'C4', text: 'KLJUČ', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'TURA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'VODIČ', revealed: false },
          { id: 'D2', text: 'MAPA', revealed: false },
          { id: 'D3', text: 'OBILAZAK', revealed: false },
          { id: 'D4', text: 'FOTOAPARAT', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_4',
    finalSolution: 'ŠKOLA',
    columns: [
      {
        id: 'col_A',
        solution: 'UČIONICA',
        revealed: false,
        clues: [
          { id: 'A1', text: 'KLUPE', revealed: false },
          { id: 'A2', text: 'TABLA', revealed: false },
          { id: 'A3', text: 'KREDA', revealed: false },
          { id: 'A4', text: 'DNEVNIK', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'PREDMET',
        revealed: false,
        clues: [
          { id: 'B1', text: 'MATEMATIKA', revealed: false },
          { id: 'B2', text: 'ISTORIJA', revealed: false },
          { id: 'B3', text: 'BIOLOGIJA', revealed: false },
          { id: 'B4', text: 'LIKOVNO', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'OCENA',
        revealed: false,
        clues: [
          { id: 'C1', text: 'KONTROLNI', revealed: false },
          { id: 'C2', text: 'PISMENI', revealed: false },
          { id: 'C3', text: 'ODGOVARANJE', revealed: false },
          { id: 'C4', text: 'DNEVNIK USPEHA', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'ODMOR',
        revealed: false,
        clues: [
          { id: 'D1', text: 'UŽINA', revealed: false },
          { id: 'D2', text: 'DVORIŠTE', revealed: false },
          { id: 'D3', text: 'ZVONO', revealed: false },
          { id: 'D4', text: 'ODMORNA SOBA', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_5',
    finalSolution: 'MUZEJ',
    columns: [
      {
        id: 'col_A',
        solution: 'EKSPONAT',
        revealed: false,
        clues: [
          { id: 'A1', text: 'VITRINA', revealed: false },
          { id: 'A2', text: 'ETIKETA', revealed: false },
          { id: 'A3', text: 'ARTEFAKT', revealed: false },
          { id: 'A4', text: 'POSTAVKA', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'GALERIJA',
        revealed: false,
        clues: [
          { id: 'B1', text: 'S LIKE', revealed: false },
          { id: 'B2', text: 'RAM', revealed: false },
          { id: 'B3', text: 'KUSTOS', revealed: false },
          { id: 'B4', text: 'IZLOŽBA', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'ULAZNICA',
        revealed: false,
        clues: [
          { id: 'C1', text: 'KASA', revealed: false },
          { id: 'C2', text: 'POPUST', revealed: false },
          { id: 'C3', text: 'GRUPA', revealed: false },
          { id: 'C4', text: 'TURA', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'ARHIVA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'DOKUMENT', revealed: false },
          { id: 'D2', text: 'KATALOG', revealed: false },
          { id: 'D3', text: 'DEPONIJA', revealed: false },
          { id: 'D4', text: 'MAGACIN', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_6',
    finalSolution: 'TEATAR',
    columns: [
      {
        id: 'col_A',
        solution: 'SCENA',
        revealed: false,
        clues: [
          { id: 'A1', text: 'REFLEKTOR', revealed: false },
          { id: 'A2', text: 'ZAVESA', revealed: false },
          { id: 'A3', text: 'DEKOR', revealed: false },
          { id: 'A4', text: 'RASPON', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'GLUMAC',
        revealed: false,
        clues: [
          { id: 'B1', text: 'ULOGA', revealed: false },
          { id: 'B2', text: 'REPLIKA', revealed: false },
          { id: 'B3', text: 'KOSTIM', revealed: false },
          { id: 'B4', text: 'AUDICIJA', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'PREDSTAVA',
        revealed: false,
        clues: [
          { id: 'C1', text: 'PREMIJERA', revealed: false },
          { id: 'C2', text: 'REŽIJA', revealed: false },
          { id: 'C3', text: 'GENERALNA', revealed: false },
          { id: 'C4', text: 'APLAUZ', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'LOŽA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'BALKON', revealed: false },
          { id: 'D2', text: 'ORKESTAR', revealed: false },
          { id: 'D3', text: 'PARTER', revealed: false },
          { id: 'D4', text: 'SEDIŠTE', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_7',
    finalSolution: 'ZDRAVLJE',
    columns: [
      {
        id: 'col_A',
        solution: 'ISHRANA',
        revealed: false,
        clues: [
          { id: 'A1', text: 'VITAMIN', revealed: false },
          { id: 'A2', text: 'VLAKNA', revealed: false },
          { id: 'A3', text: 'KALORIJE', revealed: false },
          { id: 'A4', text: 'BALANS', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'VEŽBANJE',
        revealed: false,
        clues: [
          { id: 'B1', text: 'KARDIO', revealed: false },
          { id: 'B2', text: 'TEGOVI', revealed: false },
          { id: 'B3', text: 'ISTEZANJE', revealed: false },
          { id: 'B4', text: 'TRENING', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'SANI',
        revealed: false,
        clues: [
          { id: 'C1', text: 'ODMOR', revealed: false },
          { id: 'C2', text: 'REM', revealed: false },
          { id: 'C3', text: 'JASTUK', revealed: false },
          { id: 'C4', text: 'RUTINA', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'PREVENTIVA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'VAKCINA', revealed: false },
          { id: 'D2', text: 'PREGLED', revealed: false },
          { id: 'D3', text: 'HIGIJENA', revealed: false },
          { id: 'D4', text: 'SIMPTOM', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_8',
    finalSolution: 'POLITIKA',
    columns: [
      {
        id: 'col_A',
        solution: 'PARLAMENT',
        revealed: false,
        clues: [
          { id: 'A1', text: 'POSLANIK', revealed: false },
          { id: 'A2', text: 'ZASEDANJE', revealed: false },
          { id: 'A3', text: 'AMANDMAN', revealed: false },
          { id: 'A4', text: 'VEĆINA', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'IZBORI',
        revealed: false,
        clues: [
          { id: 'B1', text: 'GLASAČ', revealed: false },
          { id: 'B2', text: 'KUTIJA', revealed: false },
          { id: 'B3', text: 'KAMPANJA', revealed: false },
          { id: 'B4', text: 'LISTIĆ', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'VLADA',
        revealed: false,
        clues: [
          { id: 'C1', text: 'MINISTAR', revealed: false },
          { id: 'C2', text: 'PREMIJER', revealed: false },
          { id: 'C3', text: 'RESOR', revealed: false },
          { id: 'C4', text: 'SEDNICA', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'USTAV',
        revealed: false,
        clues: [
          { id: 'D1', text: 'PRAVO', revealed: false },
          { id: 'D2', text: 'AMANDMAN', revealed: false },
          { id: 'D3', text: 'NAČELA', revealed: false },
          { id: 'D4', text: 'ČLAN', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_9',
    finalSolution: 'ZIMA',
    columns: [
      {
        id: 'col_A',
        solution: 'SNEG',
        revealed: false,
        clues: [
          { id: 'A1', text: 'PAHULJA', revealed: false },
          { id: 'A2', text: 'SMEĆEĆI', revealed: false },
          { id: 'A3', text: 'ZAVEJ', revealed: false },
          { id: 'A4', text: 'GRUDVANJE', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'SKIJANJE',
        revealed: false,
        clues: [
          { id: 'B1', text: 'STAZA', revealed: false },
          { id: 'B2', text: 'PANTA', revealed: false },
          { id: 'B3', text: 'ŠTAPOVI', revealed: false },
          { id: 'B4', text: 'ŽIČARA', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'HLADNOĆA',
        revealed: false,
        clues: [
          { id: 'C1', text: 'MINUS', revealed: false },
          { id: 'C2', text: 'MRAZ', revealed: false },
          { id: 'C3', text: 'DAH', revealed: false },
          { id: 'C4', text: 'PROMRZLINA', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'NOVOGODINA',
        revealed: false,
        clues: [
          { id: 'D1', text: 'JELKA', revealed: false },
          { id: 'D2', text: 'UKRASI', revealed: false },
          { id: 'D3', text: 'VATROMET', revealed: false },
          { id: 'D4', text: 'ODBROJAVANJE', revealed: false },
        ],
      },
    ],
  },

  {
    id: 'board_10',
    finalSolution: 'TEHNOLOGIJA',
    columns: [
      {
        id: 'col_A',
        solution: 'RAČUNAR',
        revealed: false,
        clues: [
          { id: 'A1', text: 'PROCESOR', revealed: false },
          { id: 'A2', text: 'MEMORIJA', revealed: false },
          { id: 'A3', text: 'TASTATURA', revealed: false },
          { id: 'A4', text: 'EKRAN', revealed: false },
        ],
      },
      {
        id: 'col_B',
        solution: 'INTERNET',
        revealed: false,
        clues: [
          { id: 'B1', text: 'RUTER', revealed: false },
          { id: 'B2', text: 'MREŽA', revealed: false },
          { id: 'B3', text: 'BRAUZER', revealed: false },
          { id: 'B4', text: 'DOMEN', revealed: false },
        ],
      },
      {
        id: 'col_C',
        solution: 'SOFTVER',
        revealed: false,
        clues: [
          { id: 'C1', text: 'KOD', revealed: false },
          { id: 'C2', text: 'APLIKACIJA', revealed: false },
          { id: 'C3', text: 'BIBLIOTEKA', revealed: false },
          { id: 'C4', text: 'VERZIJA', revealed: false },
        ],
      },
      {
        id: 'col_D',
        solution: 'SIGURNOST',
        revealed: false,
        clues: [
          { id: 'D1', text: 'LOZINKA', revealed: false },
          { id: 'D2', text: 'DVOSTRUKA', revealed: false },
          { id: 'D3', text: 'ENKRIPCIJA', revealed: false },
          { id: 'D4', text: 'FIREWALL', revealed: false },
        ],
      },
    ],
  },
];
