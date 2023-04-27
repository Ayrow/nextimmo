import { CLEAR_ALERT, DISPLAY_ALERT } from '../actions';

const appReducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.color,
        alertText: action.payload.msg,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default appReducer;
