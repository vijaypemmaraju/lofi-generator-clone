import create from 'zustand';

type Store = {
  isBeat: boolean;
  setIsBeat: (isBeat: boolean) => void;
};

// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>((set, get) => ({
  isBeat: false,
  setIsBeat: (isBeat: boolean) => set({ isBeat }),
}));

export default useStore;
