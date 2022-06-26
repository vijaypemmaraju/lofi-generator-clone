import cx from 'classnames';
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';

const App: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
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
