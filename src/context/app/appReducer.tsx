import { CLEAR_ALERT, DISPLAY_ALERT, CLOSE_MODAL } from '../actions';

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
    case CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        modalMsg: '',
        modalTitle: '',
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default appReducer;
