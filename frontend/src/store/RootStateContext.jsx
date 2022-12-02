import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';

const StoreContext = createContext();

const StoreProvider = ({ stores, children }) => (
  <StoreContext.Provider value={stores}>
    {children}
  </StoreContext.Provider>
);

const useRootStore = () => useContext(StoreContext);

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
  stores: PropTypes.objectOf(PropTypes.any).isRequired,
};

export { useRootStore, StoreProvider };