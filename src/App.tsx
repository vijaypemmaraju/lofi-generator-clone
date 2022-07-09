import cx from 'classnames';
import * as Tone from 'tone';
import { motion } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';

import startSong from './startSong';
import useStore from './useStore';

const App: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toneInitialized, setToneInitialized] = useState(false);
  const isKick = useStore(store => store.isKick);
  const isSnare = useStore(store => store.isSnare);
  const isHat = useStore(store => store.isHat);

  const volume = useStore(store => store.volume);
  const setVolume = useStore(store => store.setVolume);

  useEffect(() => {
    (async () => {
      if (isPlaying) {
        if (!toneInitialized) {
          Tone.start();

          setToneInitialized(true);
        }

        await Tone.loaded();
        setIsLoaded(true);

        await startSong();
      } else {
        setIsLoaded(false);
        Tone.Transport.stop();
      }
    })();
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center justify-center prose">
      <div className="w-[250px] h-[250px] pb-4 flex flex-col items-center justify-center prose">
        <motion.div
          initial={{
            background: 'rgba(106, 236, 106, .05)',
          }}
          animate={{
            width: isHat ? 250 : 200,
            height: isHat ? 250 : 200,
          }}
          className={cx(
            'rounded-full shadow-lg w-[200px] h-[200px] flex flex-col items-center justify-center',
          )}
        >
          <motion.div
            initial={{
              background: 'rgba(236, 106, 106, .05)',
            }}
            animate={{
              width: isSnare ? 250 : 200,
              height: isSnare ? 250 : 200,
            }}
            className={cx(
              'rounded-full shadow-lg w-[200px] h-[200px] flex flex-col items-center justify-center',
            )}
          >
            <motion.div
              initial={{
                background: 'rgba(136, 106, 106, .05)',
              }}
              animate={{
                width: isKick ? 250 : 200,
                height: isKick ? 250 : 200,
              }}
              className={cx(
                'rounded-full shadow-lg w-[200px] h-[200px] flex flex-col items-center justify-center',
              )}
            >
              {isPlaying && !isLoaded && (
                <div className="text-center">
                  <progress className="w-20 progress progress-info" />
                </div>
              )}
              {(!isPlaying || (isPlaying && isLoaded)) && (
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
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        className="range"
        onChange={e => setVolume(Number(e.target.value))}
      />
    </div>
  );
};

export default App;
