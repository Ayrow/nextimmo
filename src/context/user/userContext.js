'use client';

import { createContext, useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  return <UserContext.Provider>{children}</UserContext.Provider>;
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
