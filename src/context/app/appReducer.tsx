import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  CLOSE_MODAL,
  DISPLAY_MODAL,
  EDIT_ITEM,
  STOP_EDITING_ITEM,
} from '../actions';

import { AppState, ModalCategories } from './appContext';

type AppAction = {
  type: string;
  payload?: any;
};

const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        alert: {
          showAlert: true,
          alertCategory: action.payload.category,
          alertText: action.payload.msg,
        },
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: {
          showAlert: false,
          alertText: '',
          alertTitle: '',
        },
      };
    case DISPLAY_MODAL:
      return {
        ...state,
        modal: {
          showModal: true,
          modalTitle: action.payload.modalTitle,
          modalMsg: action.payload.modalMsg,
          modalCategory: action.payload.modalCategory,
          refItem: action.payload.refItem,
        },
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          showModal: false,
          modalMsg: '',
          modalTitle: '',
          modalCategory: ModalCategories.Delete,
          refItem: '',
        },
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
