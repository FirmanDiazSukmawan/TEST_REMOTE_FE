import {create} from 'zustand';

type LoadingStatus = {
  loading: boolean;
  refreshing: boolean;
  scrollLoading: boolean;
};

type LoadingState = {
  states: Record<string, LoadingStatus>;
  setLoading: (key: string, type: keyof LoadingStatus, value: boolean) => void;
  getStateByKey: (key: string) => LoadingStatus;
  resetState: (key: string) => void;
};

const defaultState: LoadingStatus = {
  loading: false,
  refreshing: false,
  scrollLoading: false,
};

export const useLoadingState = create<LoadingState>((set, get) => ({
  states: {},

  setLoading: (key, type, value) => {
    set(state => ({
      states: {
        ...state.states,
        [key]: {
          ...state.states[key],
          [type]: value,
        },
      },
    }));
  },

  getStateByKey: key => {
    return get().states[key] || defaultState;
  },

  resetState: key => {
    set(state => ({
      states: {
        ...state.states,
        [key]: defaultState,
      },
    }));
  },
}));
