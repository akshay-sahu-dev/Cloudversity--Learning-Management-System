import React, { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, dispatch] = useReducer(authReducer, null, () => {
    const data = localStorage.getItem("userInfo");
    return data ? JSON.parse(data) : null;
  });

  console.log("AuthContext", user);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
