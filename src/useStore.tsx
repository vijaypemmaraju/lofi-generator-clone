import create from 'zustand';

type Store = {};

// eslint-disable-next-line import/prefer-default-export

const useStore = create<Store>((set, get) => ({}));

export default useStore;
