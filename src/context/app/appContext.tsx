'use client';

import { createContext, useContext, useReducer } from 'react';
import { CLEAR_ALERT, DISPLAY_ALERT } from '../actions';
import appReducer from './appReducer';

enum ModalTypes {
  Notification = 'notification',
  Edit = 'edit',
  Delete = 'delete',
  Alert = 'alert',
}

export enum ColorTypes {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Notification = 'notification',
}

export type AppState = {
  seenListings: string[];
  isLoading: boolean;
  showAlert: boolean;
  alertText: string;
  alertType: ColorTypes;
  showModal: boolean;
  modalMsg: string;
  modalTitle: '';
  modalType: ModalTypes;
};

const initialAppState: AppState = {
  seenListings: [],
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: ColorTypes.Notification,
  showModal: false,
  modalMsg: '',
  modalTitle: '',
  modalType: ModalTypes.Notification,
};

type AppActions = {
  displayAlert: (options: { type: ColorTypes; msg: string }) => void;
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

  const displayAlert = ({ type, msg }: { type: ColorTypes; msg: string }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { type, msg } });
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
