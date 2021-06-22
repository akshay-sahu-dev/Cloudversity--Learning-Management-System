import React, { createContext, useReducer } from "react";
import { stateReducer } from "../reducers/stateReducer";

export const StateContext = createContext();

function StateContextProvider({ children }) {
  const initialState = {
    courses: [],
    wishListItems: [],
    cartItems: [],
    enrolledCourses: [],
    lastViewedCourse: [],
    createdCourses: [],
  };

  const [state, dispatch] = useReducer(stateReducer, initialState);
  console.log("StateContext", state);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export default StateContextProvider;
