import { CLEAR_FORM, HANDLE_CHANGE, SETUP_USER } from '../actions';

const userReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CLEAR_FORM:
      return {
        ...state,
        email: '',
        password: '',
        confirmPassword: '',
      };
    case SETUP_USER:
      return {
        ...state,
        user: action.payload,
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default userReducer;
