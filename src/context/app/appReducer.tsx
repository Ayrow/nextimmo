import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  CLOSE_MODAL,
  DISPLAY_MODAL,
  EDIT_ITEM,
  STOP_EDITING_ITEM,
} from '../actions';

import { AppState } from './appContext';

type AppAction = {
  type: string;
  payload?: any;
};

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.msg,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
      };
    case DISPLAY_MODAL:
      return {
        ...state,
        showModal: true,
        modalTitle: action.payload.modalTitle,
        modalMsg: action.payload.modalMsg,
        modalType: action.payload.modalType,
        refItem: action.payload.refItem,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        modalMsg: '',
        modalTitle: '',
        refItem: '',
      };
    case EDIT_ITEM:
      return {
        ...state,
        isEditing: true,
        refItem: action.payload,
      };
    case STOP_EDITING_ITEM:
      return {
        ...state,
        isEditing: false,
        refItem: '',
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default appReducer;
