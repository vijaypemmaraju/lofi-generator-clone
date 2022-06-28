import cx from 'classnames';
import * as Tone from 'tone';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import between, { betweenInt } from './between';
import { melodyNotes, harmonyNotes, chords } from './notes';

const App: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toneInitialized, setToneInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      if (isPlaying) {
        if (!toneInitialized) {
          Tone.start();

          setToneInitialized(true);
        }

        await Tone.loaded();

        const chosenChordProgressionIndex = betweenInt(0, chords.length - 1);
        const chosenMelody = melodyNotes[chosenChordProgressionIndex];
        const chosenHarmony = harmonyNotes[chosenChordProgressionIndex];
        const chosenChord = chords[chosenChordProgressionIndex];

        const synth = new Tone.PolySynth({
          volume: -5,
        }).toDestination();
        const polysynth = new Tone.PolySynth(Tone.Synth).toDestination();
        const filter = new Tone.Filter(1000, 'lowpass');
        const filter2 = new Tone.Filter(1000, 'lowpass');
        const filter3 = new Tone.Filter(1000, 'lowpass');
        const filter4 = new Tone.Delay('8n');

        const sampler = await new Promise<Tone.Sampler>(resolve => {
          const s = new Tone.Sampler({
            urls: {
              C4: 'samples/kick.wav',
              D4: 'samples/hat.wav',
              E4: 'samples/rim.wav',
            },
            release: 1,
            volume: -10,
            onload: () => {
              s.chain(filter2, filter3, filter4, Tone.Destination);
              resolve(s);
            },
          }).toDestination();
        });

        sampler.chain(filter, Tone.Destination);

        Tone.Transport.bpm.value = 70;

        const beat = [
          ['C4'],
          ['D4'],
          ['D4', 'E4'],
          ['D4'],
          [],
          ['C4'],
          ['D4', 'E4'],
          ['D4'],
        ];

        const velocityMappings = {
          C4: [0.2, 0.25],
          D4: [0.01, 0.03],
          E4: [0.2, 0.25],
        };

        let position = 0;

        let currentChord = 0;

        Tone.Transport.scheduleRepeat(time => {
          const delay = 0.03;
          beat[position].forEach(sample => {
            const chosenSample = Math.random() > 0.9 ? 'D4' : sample;
            sampler.triggerAttack(
              chosenSample,
              time + between(0.01, delay),
              between(
                velocityMappings[chosenSample][0],
                velocityMappings[chosenSample][1],
              ),
            );
          });
          position += 1;
          if (position >= beat.length) {
            position = 0;
          }
        }, '8n');

        let position2 = 0;

        Tone.Transport.scheduleRepeat(time => {
          const { notes } = chosenMelody[currentChord];
          const { notes: harmony } = chosenHarmony[currentChord];
          const delay = 0.03;
          const noteChoice = betweenInt(0, notes.length);
          if (Math.random() < 0.5) {
            synth
              .connect(filter)
              .triggerAttackRelease(
                notes[noteChoice],
                '8n',
                time + between(0.01, delay),
                between(0.1, 0.2),
              );
            synth
              .connect(filter)
              .triggerAttackRelease(
                harmony[noteChoice],
                '8n',
                time + between(0.01, delay),
                between(0.05, 0.1),
              );
          }
          position2 += 1;
          if (position2 > 8) {
            // currentChord = betweenInt(0, chords.length - 1);
            currentChord += 1;
            if (currentChord >= chords.length) {
              currentChord = 0;
            }
            position2 = 1;
          }
        }, '4n');

        const chordRhythm = [1, 1, 0, 1, 0, 1, 0, 1];

        Tone.Transport.scheduleRepeat(time => {
          const { notes } = chosenChord[currentChord];
          if (chordRhythm[position2 - 1] === 0) {
            return;
          }
          const delay = 0.03;
          for (const note of notes) {
            polysynth
              .connect(filter)
              .triggerAttackRelease(
                note,
                '8n',
                time + between(0.01, delay),
                between(0.025, 0.01),
              );
          }
        }, '4n');

        const rainfall = new Tone.Player().toDestination();
        await rainfall.load('rainfall.wav');
        rainfall.volume.value = -15;
        Tone.Transport.scheduleOnce(() => {
          rainfall.chain(filter, filter2, filter3).start();
        }, '0');

        const vinyl = new Tone.Player().toDestination();
        await vinyl.load('vinyl.flac');
        vinyl.volume.value = -20;
        Tone.Transport.scheduleOnce(() => {
          vinyl.chain(filter, filter2, filter3).start();
        }, '0');

        Tone.Transport.start();
      } else {
        Tone.Transport.stop();
      }
    })();
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center prose">
      <button
        type="button"
        className="bg-transparent border-none btn hover:border-none hover:bg-transparent"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <motion.div
          className={cx(
            isPlaying && 'w-[100px] h-[100px] bg-gray-300',
            !isPlaying &&
              'w-0 h-0 border-solid border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[100px] border-l-gray-300',
          )}
          layout
        />
      </button>
    </div>
  );
};

export default App;
