import { studentActionType, tutorActionType } from "../actionTypes";

export const authReducer = (state, action) => {
  switch (action.type) {
    case tutorActionType.verifyTutor:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };

    case studentActionType.verifyStudent:
      console.log(action.payload);
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
