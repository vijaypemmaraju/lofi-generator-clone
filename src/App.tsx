import cx from 'classnames';
import * as Tone from 'tone';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import startSong from './startSong';
import useStore from './useStore';

const App: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [toneInitialized, setToneInitialized] = useState(false);
  const isBeat = useStore(store => store.isBeat);

  useEffect(() => {
    (async () => {
      if (isPlaying) {
        if (!toneInitialized) {
          Tone.start();

          setToneInitialized(true);
        }

        await Tone.loaded();

        await startSong();
      } else {
        Tone.Transport.stop();
      }
    })();
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center prose">
      <motion.div
        initial={{
          background: 'rgba(136, 106, 106, .18)',
        }}
        animate={{
          width: isBeat ? 250 : 200,
          height: isBeat ? 250 : 200,
        }}
        className={cx(
          'rounded-full shadow-lg w-[200px] h-[200px] flex flex-col items-center justify-center',
        )}
      >
        <button
          type="button"
          className="w-[100px] h-[100px] bg-transparent border-none btn hover:border-none hover:bg-transparent p-0"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          <motion.div
            className={cx(
              'w-[100px] h-[100px]',
              isPlaying && 'bg-gray-300',
              !isPlaying &&
                'w-0 h-0 border-solid border-t-[50px] border-t-transparent border-b-[50px] border-b-transparent border-l-[100px] border-l-gray-300',
            )}
            layout
          />
        </button>
      </motion.div>
      {/* <input type="range" min="0" max="100" value="40" className="range" /> */}
    </div>
  );
};

export default App;
