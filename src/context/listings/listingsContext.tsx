import { createContext, useContext } from 'react';

const ListingsContext = createContext(null);

const ListingsProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ListingsContext.Provider value={{}}>{children}</ListingsContext.Provider>
  );
};

const useListingsContext = () => {
  return useContext(ListingsContext);
};

export { ListingsProvider, useListingsContext };
