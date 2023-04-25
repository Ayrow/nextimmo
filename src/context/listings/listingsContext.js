const { createContext, useContext } = require('react');

const ListingsContext = createContext();

const ListingsProvider = ({ children }) => {
  return <ListingsContext.Provider>{children}</ListingsContext.Provider>;
};

const useListingsContext = () => {
  return useContext(ListingsContext);
};

export { ListingsProvider, useListingsContext };
