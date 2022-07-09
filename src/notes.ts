import { Chord } from 'tonal';

export const beats = [
  [['C4'], ['D4'], ['D4', 'E4'], ['D4'], [], ['C4'], ['D4', 'E4'], ['D4']],
  [['E4'], ['D4'], ['D4', 'E4'], ['D4'], [], ['E4'], ['D4', 'E4'], ['D4']],
  [[], ['D4'], ['D4', 'E4'], [], ['D4'], ['D4'], ['D4', 'E4'], ['D4']],
];

export const velocityMappings = {
  C4: [0.2, 0.25],
  D4: [0.1, 0.15],
  E4: [0.125, 0.15],
};

export const chordProgressions: string[][][] = [
  [
    Chord.notes('C4M7'),
    Chord.notes('A3m7'),
    Chord.notes('E3m7'),
    Chord.notes('F3M7'),
  ],
  [
    Chord.notes('Eb3M7'),
    Chord.notes('C3m7'),
    Chord.notes('F3m7'),
    Chord.notes('Ab3M7'),
  ],
];
