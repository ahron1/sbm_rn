import {
  GET_ORDERITEMS_LOADING,
  GET_ORDERITEMS_SUCCESS,
  GET_ORDERITEMS_FAIL,
  EDIT_ORDERITEM_LOADING,
  EDIT_ORDERITEM_SUCCESS,
  EDIT_ORDERITEM_FAIL,
} from '../../constants/actionTypes';

const orderItemsReducer = (state, {type, payload}) => {
  switch (type) {
    case GET_ORDERITEMS_LOADING:
      return {
        ...state,
        getOrderItems: {
          ...state.getOrderItems,
          loading: true,
        },
      };
    case GET_ORDERITEMS_SUCCESS:
      return {
        ...state,
        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          data: payload,
          error: null,
        },
      };
    case GET_ORDERITEMS_FAIL:
      return {
        ...state,
        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          error: payload,
        },
      };

    case EDIT_ORDERITEM_LOADING:
      return {
        ...state,
        editOrderItem: {
          ...state.editOrderItems,
          loading: true,
        },
      };
    case EDIT_ORDERITEM_SUCCESS:
      return {
        ...state,
        editOrderItem: {
          ...state.editOrderItems,
          loading: false,
          error: null,
        },

        getOrderItems: {
          ...state.getOrderItems,
          loading: false,
          error: null,
          data: [
            ...state.getOrderItems.data.filter(
              x => x.order_item_id !== payload.order_item_id,
            ),
            payload,
          ],
        },
      };
    case EDIT_ORDERITEM_FAIL:
      return {
        ...state,
        editOrderItem: {
          ...state.editOrderItems,
          loading: false,
          error: payload,
        },
      };
  }
};

export default orderItemsReducer;
