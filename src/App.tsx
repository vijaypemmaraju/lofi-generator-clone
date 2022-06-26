import cx from 'classnames';
import * as Tone from 'tone';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import between from './between';

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

        const synth = new Tone.Synth({ volume: -10 }).toDestination();
        const filter = new Tone.Filter(2500, 'lowpass');

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
          [],
          [],
          ['C4'],
          ['D4', 'E4'],
          [],
        ];

        const velocityMappings = {
          C4: [0.3, 0.32],
          D4: [0.1, 0.12],
          E4: [0.3, 0.32],
        };

        let position = 0;

        Tone.Transport.scheduleRepeat(time => {
          console.log(Tone.Transport.position);
          const delay = 0.03;
          beat[position].forEach(sample =>
            sampler
              .connect(filter)
              .triggerAttack(
                sample,
                time + between(0, delay),
                between(
                  velocityMappings[sample][0],
                  velocityMappings[sample][1],
                ),
              ),
          );
          position += 1;
          if (position >= beat.length) {
            position = 0;
          }
        }, '8n');

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
