import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducer";

const initialState = {
  user: null,
  isFecthing: false,
  error: false,
};

export const initializer = (initialValue = initialState) =>
  JSON.parse(localStorage.getItem("currentUser")) || initialValue;

export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  // 利用context，共享useReducer的state和dispatch
  // 所有子組件都可以用state和dispatch
  const [state, dispatch] = useReducer(AuthReducer, {}, initializer);
  console.log(state);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFecthing: state.isFecthing,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
