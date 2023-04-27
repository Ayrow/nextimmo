import { createContext, useContext } from 'react';

const AppContext = createContext();

const initialAppState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
};

const AppProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
