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
  modalMsg: string;
  modalTitle: string;
  modalCategory: ModalCategories;
  refItem?: string;
  modalCancelText?: string;
  modalConfirmText?: string;
  modalFunction?: ((ref: string) => void) | (() => void);
};

type AlertType = {
  showAlert?: boolean;
  alertText?: string;
  alertTitle?: string;
  alertCategory?: AlertCategories;
};

export type AppState = {
  seenListings: string[];
  alert: AlertType;
  modal: ModalType;
  isEditing: boolean;
  refItem: string;
};

const listingSession =
  typeof window != 'undefined'
    ? window.sessionStorage.getItem('storedSeenListings')
    : null;
const storedSeenListings = listingSession ? JSON.parse(listingSession) : null;

const initialAppState: AppState = {
  seenListings: storedSeenListings || [],
  alert: {
    showAlert: false,
    alertText: '',
    alertCategory: AlertCategories.Notification,
  },
  modal: {
    showModal: false,
    modalMsg: '',
    modalTitle: '',
    refItem: '',
    modalCategory: ModalCategories.Delete,
    modalFunction: () => null,
  },
  isEditing: false,
  refItem: '',
};

type AppActions = {
  displayAlert: ({
    category,
    msg,
  }: {
    category: AlertCategories;
    msg: string;
  }) => void;

  closeModal: () => void;

  displayModal: ({
    modalMsg,
    modalCategory,
    modalTitle,
    refItem,
    modalFunction,
  }: {
    modalMsg: string;
    modalCategory: ModalCategories;
    modalTitle: string;
    refItem?: string;
    modalFunction?: (ref: string) => void;
  }) => void;

  editItem: (refItem: ObjectId | string) => void;
  stopEditingItem: () => void;
  addListingToAlreadySeen: (refItem: ObjectId | string) => void;
  addSeenListingsToSessionStorage: (listings: any) => void;
  removeSeenListingsFromSessionStorage: () => void;
};

const initialAppActions: AppActions = {
  displayAlert: () => null,
  closeModal: () => null,
  displayModal: () => null,
  editItem: () => null,
  stopEditingItem: () => null,
  addListingToAlreadySeen: () => null,
  addSeenListingsToSessionStorage: () => null,
  removeSeenListingsFromSessionStorage: () => null,
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
  const [userSeenListing, setUserSeenListing] = useState(storedSeenListings);

  const addSeenListingsToSessionStorage = (listings) => {
    sessionStorage.setItem('storedSeenListings', JSON.stringify(listings));
  };

  const removeSeenListingsFromSessionStorage = () => {
    sessionStorage.removeItem('storedSeenListings');
  };

  const addListingToAlreadySeen = (ref: any) => {
    const newArray = userSeenListing || [];
    if (ref) {
      newArray.push(ref);
      state.seenListings = newArray;
      setUserSeenListing(newArray);
      addSeenListingsToSessionStorage(newArray);
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
    }, 3000);
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
    modalFunction,
  }: ModalType) => {
    dispatch({
      type: DISPLAY_MODAL,
      payload: {
        modalTitle,
        modalMsg,
        modalCategory,
        refItem,
        modalFunction,
      },
    });
    if (
      modalCategory !== ModalCategories.Delete &&
      modalCategory !== ModalCategories.Edit
    ) {
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

  if (AppContext) {
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
            addListingToAlreadySeen,
            addSeenListingsToSessionStorage,
            removeSeenListingsFromSessionStorage,
          },
        }}>
        {children}
      </AppContext.Provider>
    );
  }
};

const useAppContext = () => {
  if (AppContext) {
    return useContext(AppContext);
  }
};

export { AppProvider, useAppContext };
