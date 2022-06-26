import cx from 'classnames';
import * as Tone from 'tone';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

const App: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toneInitialized, setToneInitialized] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      if (!toneInitialized) {
        Tone.start();

        setToneInitialized(true);
      }
      const synth = new Tone.Synth({ volume: -10 }).toDestination();
      const filter = new Tone.Filter(1500, 'lowpass').toDestination();

      const sampler = new Tone.Sampler({
        urls: {
          C4: 'samples/kick.wav',
          D4: 'samples/hat.wav',
          E4: 'samples/rim.wav',
        },
        release: 1,
        volume: -10,
      }).toDestination();

      const now = Tone.now();

      // Tone.Transport.timeSignature = [4, 4];
      console.log(Tone.Transport.timeSignature);
      const loopC = new Tone.Loop(time => {
        sampler.triggerAttack(['C4'], time);
        sampler.triggerAttack(['C4'], '+0:0.5');
        sampler.triggerAttack(['C4'], '+0:2');
        sampler.triggerAttack(['D4'], '+0:0.25', 0.1);
        sampler.triggerAttack(['D4'], '+0:0.5', 0.1);
        sampler.triggerAttack(['D4'], '+0:1', 0.1);
        sampler.triggerAttack(['E4'], '+0:1', 0.5);
        sampler.triggerAttack(['E4'], '+0:3', 0.5);
      }, '1m').start(0);
      // const loopB = new Tone.Loop(time => {
      //   sampler.triggerAttackRelease(['C4'], 4);
      // }, '1n').start(0);
      Tone.Transport.bpm.value = 70;

      Tone.Transport.start();
      // synth.connect(filter).triggerAttackRelease('C4', '8n');
    } else {
      Tone.Transport.stop();
    }
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
            !isPlaying && 'w-[100px] h-[100px] bg-gray-300',
            isPlaying &&
              'w-0 h-0 border-solid border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[100px] border-l-gray-300',
          )}
          layout
        />
      </button>
    </div>
  );
};

export default App;
