import {
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAIL,
  CONFIRM_ORDER_LOADING,
  CONFIRM_ORDER_SUCCESS,
  CONFIRM_ORDER_FAIL,
  CONFIRM_PAYMENT_FAIL,
  CONFIRM_PAYMENT_LOADING,
  CONFIRM_PAYMENT_SUCCESS,
  CONFIRM_FULFIL_FAIL,
  CONFIRM_FULFIL_LOADING,
  CONFIRM_FULFIL_SUCCESS,
} from '../../constants/actionTypes';

const ordersReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_ORDERS_LOADING:
      return {
        ...state,
        getOrders: {
          ...state.getOrders,
          loading: true,
        },
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        getOrders: {
          ...state.getOrders,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_ORDERS_FAIL:
      return {
        ...state,
        getOrders: {
          ...state.getOrders,
          loading: false,
          error: payload,
        },
      };
    case CONFIRM_ORDER_LOADING:
      return {
        ...state,
        confirmOrder: {
          ...state.confirmOrder,
          loading: true,
        },
      };
    case CONFIRM_ORDER_SUCCESS:
      return {
        ...state,
        confirmOrder: {
          ...state.confirmOrder,
          loading: false,
          error: null,
        },
      };
    case CONFIRM_ORDER_FAIL:
      return {
        ...state,
        confirmOrder: {
          ...state.confirmOrder,
          loading: false,
          error: payload,
        },
      };
    case CONFIRM_FULFIL_LOADING:
      return {
        ...state,
        confirmFulfil: {
          ...state.confirmFulfil,
          loading: true,
        },
      };
    case CONFIRM_FULFIL_SUCCESS:
      return {
        ...state,
        confirmFulfil: {
          ...state.confirmFulfil,
          loading: false,
          error: null,
        },
      };
    case CONFIRM_FULFIL_FAIL:
      return {
        ...state,
        confirmFulfil: {
          ...state.confirmFulfil,
          loading: false,
          error: payload,
        },
      };

    case CONFIRM_PAYMENT_LOADING:
      return {
        ...state,
        confirmPayment: {
          ...state.confirmPayment,
          loading: true,
        },
      };
    case CONFIRM_PAYMENT_SUCCESS:
      return {
        ...state,
        confirmPayment: {
          ...state.confirmPayment,
          loading: false,
          error: null,
        },
      };
    case CONFIRM_PAYMENT_FAIL:
      return {
        ...state,
        confirmPayment: {
          ...state.confirmPayment,
          loading: false,
          error: payload,
        },
      };
  }
};

export default ordersReducer;
