import React from 'react';
import {useReducer} from 'react';
import {createContext} from 'react';
import ordersInitialState from './initialStates/ordersInitialState';
import ordersReducer from './reducers/ordersReducer';
import orderItemsInitialState from './initialStates/orderItemsInitialState';
import orderItemsReducer from './reducers/orderItemsReducer';
import authReducer from './reducers/AuthReducer';
import authInitialState from './initialStates/authInitialState';
import storesReducer from './reducers/storesReducer';
import storesInitialState from './initialStates/storesInitialState';
import customersReducer from './reducers/customersReducer';
import customersInitialState from './initialStates/customersInitialState';

const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [ordersState, ordersDispatch] = useReducer(
    ordersReducer,
    ordersInitialState,
  );
  const [orderItemsState, orderItemsDispatch] = useReducer(
    orderItemsReducer,
    orderItemsInitialState,
  );
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [customersState, customersDispatch] = useReducer(
    customersReducer,
    customersInitialState,
  );
  const [storesState, storesDispatch] = useReducer(
    storesReducer,
    storesInitialState,
  );
  // const [profileState, profileDispatch] = useReducer(
  // profileReducer,
  // profileInitialState,
  // );

  return (
    <GlobalContext.Provider
      value={{
        ordersState,
        ordersDispatch,
        orderItemsState,
        orderItemsDispatch,
        authState,
        authDispatch,
        storesState,
        storesDispatch,
        customersState,
        customersDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export {GlobalContext};
