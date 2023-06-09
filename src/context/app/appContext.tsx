'use client';

import { createContext, useContext, useReducer, useState } from 'react';
import {
  CLEAR_ALERT,
  CLOSE_MODAL,
  DISPLAY_ALERT,
  DISPLAY_MODAL,
  EDIT_ITEM,
  STOP_EDITING_ITEM,
} from '../actions';
import appReducer from './appReducer';
import { ObjectId } from 'mongoose';

export enum ModalCategories {
  Notification = 'notification',
  Success = 'success',
  Error = 'error',
  Edit = 'edit',
  Delete = 'delete',
  Alert = 'alert',
}

export enum AlertCategories {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Notification = 'notification',
}

type ModalType = {
  showModal?: boolean;
  modalMsg?: string;
  modalTitle?: string;
  modalCategory?: ModalCategories;
  refItem?: string;
};

type AlertType = {
  showAlert?: boolean;
  alertText?: string;
  alertTitle?: string;
  alertCategory?: AlertCategories;
};

export type AppState = {
  seenListings: ObjectId[];
  alert: AlertType;
  modal: ModalType;
  isEditing: boolean;
  refItem: string;
};

const initialAppState: AppState = {
  seenListings: [],
  alert: {
    showAlert: false,
    alertText: '',
    alertTitle: '',
    alertCategory: AlertCategories.Notification,
  },
  modal: {
    showModal: false,
    modalMsg: '',
    modalTitle: '',
    refItem: '',
    modalCategory: ModalCategories.Delete,
  },
  isEditing: false,
  refItem: '',
};

type AppActions = {
  displayAlert: ({
    category,
    msg,
    title,
  }: {
    category: AlertCategories;
    msg: string;
    title: string;
  }) => void;

  closeModal: () => void;

  displayModal: ({
    modalMsg,
    modalCategory,
    modalTitle,
    refItem,
  }: {
    modalMsg: string;
    modalCategory: ModalCategories;
    modalTitle: string;
    refItem?: string;
  }) => void;

  editItem: (refItem: ObjectId | string) => void;
  stopEditingItem: () => void;
};

const initialAppActions: AppActions = {
  displayAlert: () => null,
  closeModal: () => null,
  displayModal: () => null,
  editItem: () => null,
  stopEditingItem: () => null,
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
  const { seenListings, alert, modal, isEditing, refItem } = state;
  const [userSeenListing, setUserSeenListing] = useState(state.seenListings);

  const addListingToAlreadySeen = (ref: ObjectId) => {
    const newArray = userSeenListing;
    if (ref) {
      newArray.push(ref);
      setUserSeenListing(newArray);
    }
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const clearModal = () => {
    setTimeout(() => {
      dispatch({ type: CLOSE_MODAL });
    }, 2000);
  };

  const displayAlert = ({
    category,
    msg,
  }: {
    category: AlertCategories;
    msg: string;
  }) => {
    dispatch({ type: DISPLAY_ALERT, payload: { category, msg } });
    clearAlert();
  };

  const displayModal = ({
    modalTitle,
    modalMsg,
    modalCategory,
    refItem,
  }: ModalType) => {
    dispatch({
      type: DISPLAY_MODAL,
      payload: { modalTitle, modalMsg, modalCategory, refItem },
    });
    if (modalCategory !== (ModalCategories.Delete || ModalCategories.Edit)) {
      clearModal();
    }
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const editItem = (refItem: ObjectId) => {
    dispatch({ type: EDIT_ITEM, payload: refItem });
  };

  const stopEditingItem = () => {
    dispatch({ type: STOP_EDITING_ITEM });
  };

  return (
    <AppContext.Provider
      value={{
        state: {
          seenListings,
          alert,
          modal,
          isEditing,
          refItem,
        },
        actions: {
          displayAlert,
          closeModal,
          displayModal,
          editItem,
          stopEditingItem,
        },
      }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
