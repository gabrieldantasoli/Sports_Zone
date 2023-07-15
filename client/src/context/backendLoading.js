import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  loading: false,
};

export const LoadingContext = createContext(INITIAL_STATE);

const loadingReducer = (state, action) => {
  switch (action.type) {
    case "LOADING_START":
      return {
        loading: true,
      };
    case "LOADING_END":
      return {
        loading: false,
      };
    default:
      return state;
  }
};

export const LoadingContextProvider = ({ children }) => {
  const [state, modifyLoad] = useReducer(loadingReducer, INITIAL_STATE);

  return (
    <LoadingContext.Provider
      value={{
        loading: state.loading,
        modifyLoad,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
