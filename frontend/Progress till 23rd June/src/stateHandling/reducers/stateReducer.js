import { courseActionType } from "../actionTypes";

export const stateReducer = (state, action) => {
  switch (action.type) {
    case courseActionType.allCourses:
      return { ...state, courses: action.payload };

    case courseActionType.getWishlist:
      console.log(action.type);
      return { ...state, wishListItems: action.payload };

    case courseActionType.removeFromWishList:
      return { ...state, wishListItems: action.payload };

    case courseActionType.getCart:
      return { ...state, cartItems: action.payload };

    case "FETCH_ENROLLED_COURSES":
      return { ...state, enrolledCourses: action.payload };

    case "FETCH_LAST_VIEWED_COURSE":
      return { ...state, lastViewedCourse: action.payload };

    case "FETCH_CREATED_COURSES":
      return { ...state, createdCourses: action.payload };

    default:
      break;
  }
};
