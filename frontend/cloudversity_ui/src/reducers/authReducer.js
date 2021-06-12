import { AUTH, LOGOUT } from "../actionTypes";

const authReducer = (state = { user: null }, action) => {

  switch (action.type) {

    case AUTH:
      console.log("Inside Auth reducer")
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        user: action.payload.data,
      };

      case LOGOUT:

      localStorage.clear();
      return { ...state, user:null};

    default:
      return state;
  }
};



export default authReducer;
