import { studentActionType, tutorActionType } from "../actionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case tutorActionType.verifyTutor:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ user: action.payload })
      );
      return {
        ...state,
        user: action.payload,
      };

    case studentActionType.verifyStudent:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ user: action.payload })
      );
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
