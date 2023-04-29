import listingsReducer from './listingsReducer';

const { createContext, useContext, useReducer } = require('react');

const ListingsContext = createContext();

const initialListingsState = {
  listings: [],
  title: '',
};

const ListingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listingsReducer, initialListingsState);

  return (
    <ListingsContext.Provider value={{ ...state }}>
      {children}
    </ListingsContext.Provider>
  );
};

const useListingsContext = () => {
  return useContext(ListingsContext);
};

export { ListingsProvider, useListingsContext };
