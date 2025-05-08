// import { createContext, useReducer } from "react";
// import DarkModeReducer from "./darkModeReducer";

// const INITIAL_STATE = {
//   darkMode: false,
// };

// export const DarkModeContext = createContext(INITIAL_STATE);

// export const DarkModeContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

//   return (
//     <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// };

// import { createContext, useContext, useReducer } from 'react';

// const DarkModeContext = createContext();

// const INITIAL_STATE = {
//   darkMode: false,
// };

// function darkModeReducer(state, action) {
//   switch (action.type) {
//     case 'TOGGLE':
//       return { darkMode: !state.darkMode };
//     default:
//       return state;
//   }
// }

// export function DarkModeContextProvider({ children }) {
//   const [state, dispatch] = useReducer(darkModeReducer, INITIAL_STATE);

//   return (
//     <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

// export function useDarkMode() {
//   return useContext(DarkModeContext);
// }

import { createContext, useContext, useReducer } from 'react';
import DarkModeReducer from './darkModeReducer';

const DarkModeContext = createContext();

const INITIAL_STATE = {
  darkMode: false,
};

export function DarkModeContextProvider({ children }) {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}