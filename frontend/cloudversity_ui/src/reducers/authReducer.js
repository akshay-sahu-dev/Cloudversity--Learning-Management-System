import { AUTH, LOGOUT } from "../actionTypes";

const initialState = {user: {}}
const authReducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {

    case AUTH:

      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        user: action.payload,
      };

      case LOGOUT:

      localStorage.clear();
      return { user: {} };

    default:
      return state;
  }
};

export default authReducer;
