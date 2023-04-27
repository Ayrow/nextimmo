'use client';

import { createContext, useContext, useReducer } from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT } from '../actions';
import appReducer from './appReducer';

const AppContext = createContext();

const initialAppState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

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
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
