'use client';

import { createContext, useContext, useReducer } from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT } from '../actions';
import appReducer from './appReducer';

export type AppState = {
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: string;
};

const initialAppState: AppState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

type AppActions = {
  displayAlert: (options: { type: string; msg: string }) => void;
};

const initialAppActions = {
  displayAlert: () => null,
};

const AppContext = createContext<{
  state: AppState;
  actions: AppActions;
}>({
  state: initialAppState,
  actions: initialAppActions,
});

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 4000);
  };

  const displayAlert = ({ type, msg }) => {
    let color = '';

    if (type == 'error') {
      color = 'bg-red-500';
    } else if (type == 'success') {
      color = 'bg-green-500';
    }

    dispatch({ type: DISPLAY_ALERT, payload: { color, msg } });
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ state, actions: { displayAlert } }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
