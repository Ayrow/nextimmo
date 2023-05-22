'use client';

import { createContext, useContext, useReducer } from 'react';
import {
  CLEAR_ALERT,
  CLOSE_MODAL,
  DISPLAY_ALERT,
  DISPLAY_MODAL,
} from '../actions';
import appReducer from './appReducer';

export enum ModalTypes {
  Notification = 'notification',
  Success = 'success',
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
  modalTitle: string;
  refItem: string;
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
  refItem: '',
  modalType: ModalTypes.Notification,
};

type AppActions = {
  displayAlert: (options: { type: ColorTypes; msg: string }) => void;
  closeModal: () => void;
  displayModal: (options: {
    modalMsg: string;
    modalType: ModalTypes;
    modalTitle: string;
    refItem: string;
  }) => void;
};

const initialAppActions: AppActions = {
  displayAlert: () => null,
  closeModal: () => null,
  displayModal: () => null,
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

  const displayModal = ({ modalTitle, modalMsg, modalType, refItem }) => {
    dispatch({
      type: DISPLAY_MODAL,
      payload: { modalTitle, modalMsg, modalType, refItem },
    });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <AppContext.Provider
      value={{ state, actions: { displayAlert, closeModal, displayModal } }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
