import { Chord } from '@tonaljs/tonal';

export const beats = [
  [['C4'], ['D4'], ['D4', 'E4'], ['D4'], [], ['C4'], ['D4', 'E4'], ['D4']],
  // [['E4'], ['D4'], ['D4', 'E4'], ['D4'], [], ['E4'], ['D4', 'E4'], ['D4']],
  // [[], ['D4'], ['D4', 'E4'], [], ['D4'], ['D4'], ['D4', 'E4'], ['D4']],
];

export const velocityMappings = {
  C4: [0.2, 0.25],
  D4: [0.1, 0.15],
  E4: [0.125, 0.15],
};

export const chordProgressions: string[][][] = [
  [
    Chord.get('C4M7').notes,
    Chord.get('A3m7').notes,
    Chord.get('E3m7').notes,
    Chord.get('F3M7').notes,
  ],
  [
    Chord.get('Eb3M7').notes,
    Chord.get('C3m7').notes,
    Chord.get('F3m7').notes,
    Chord.get('Ab3M7').notes,
  ],
];
