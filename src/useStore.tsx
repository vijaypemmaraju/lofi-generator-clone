import create from 'zustand';

type Store = {
  isKick: boolean;
  setIsKick: (isBeat: boolean) => void;
  isSnare: boolean;
  setIsSnare: (isBeat: boolean) => void;
  isHat: boolean;
  setIsHat: (isBeat: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
};

// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>((set, get) => ({
  isKick: false,
  setIsKick: (isBeat: boolean) => set({ isKick: isBeat }),
  isSnare: false,
  setIsSnare: (isBeat: boolean) => set({ isSnare: isBeat }),
  isHat: false,
  setIsHat: (isBeat: boolean) => set({ isHat: isBeat }),
  volume: 1,
  setVolume: (volume: number) => set({ volume }),
}));

export default useStore;
