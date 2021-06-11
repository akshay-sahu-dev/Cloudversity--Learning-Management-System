import { AUTH, LOGOUT } from "../actionTypes";

const initialState = {user: {}}
const authReducer = (state, action) => {
  state = state || initialState;
  switch (action.type) {

    case AUTH:
      console.log("Inside Auth reducer")
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        user: action.payload.data,
      };

      case LOGOUT:

      localStorage.setItem('profile', null );
      return { user: {} };

    default:
      return state;
  }
};



export default authReducer;
