import {
  GET_CUSTOMERS_LOADING,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_LOADING,
  ADD_CUSTOMER_SUCCESS,
} from '../../constants/actionTypes';

const customersReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_CUSTOMERS_LOADING:
      return {
        ...state,
        getCustomers: {
          ...state.getCustomers,
          loading: true,
        },
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        getCustomers: {
          ...state.getCustomers,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        getCustomers: {
          ...state.getCustomers,
          loading: false,
          error: payload,
        },
      };
    case ADD_CUSTOMER_LOADING:
      return {
        ...state,
        addCustomer: {
          ...state.addCustomer,
          loading: true,
        },
      };
    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        addCustomer: {
          ...state.addCustomer,
          loading: false,
          error: null,
          // data: payload,
        },
        getCustomers: {
          ...state.getCustomers,
          loading: false,
          error: null,
          data: [
            ...state.getCustomers.data,
            {
              customer_mobile_number: payload.customerNumber,
              customer_name: payload.CustomerName,
            },
          ],
        },
      };
    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        addCustomer: {
          ...state.addCustomer,
          loading: false,
          error: payload,
        },
      };
  }
};

export default customersReducer;
