import { HANDLE_CHANGE } from '../actions';

const userReducer = (state, action) => {
  switch (action.type) {
    case HANDLE_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      throw new Error(`There is no action: ${action.type}`);
  }
};

export default userReducer;
