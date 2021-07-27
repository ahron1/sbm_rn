import {
  EDIT_ORDERITEM_LOADING,
  EDIT_ORDERITEM_FAIL,
  EDIT_ORDERITEM_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const editOrderItem =
  ({
    orderItemId: orderItemId,
    orderItemPrice: orderItemPrice,
    orderItemAvailable: orderItemAvailable,
  }) =>
  dispatch =>
  onSuccess => {
    console.log(
      'in editordersitems dispatch loading >> ',
      'order item id is: ',
      orderItemId,
      'order item price is ',
      orderItemPrice,
      'available is ',
      orderItemAvailable,
    );
    dispatch({
      type: EDIT_ORDERITEM_LOADING,
    });

    axiosInstance
      .post('/update_store_order_item', {
        orderItemId: orderItemId,
        orderItemPrice: orderItemPrice,
        orderItemAvailable: orderItemAvailable,
      })
      .then(res => {
        console.log('in editordersitems. received response data >> ', res.data);
        dispatch({
          type: EDIT_ORDERITEM_SUCCESS,
          payload: res.data,
          // payload: {
          // orderItemId: orderItemId,
          // orderItemPrice: orderItemPrice,
          // orderItemAvailable: orderItemAvailable,
          // },
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in editorderitems error is >> ', err);
        dispatch({
          type: EDIT_ORDERITEM_FAIL,
          // payload: dataOrders,
          payload: err,
        });
      });

    // dispatch({
    // type: GET_ORDERITEMS_SUCCESS,
    // payload: dataOrderItems.find(x => x.orderId === orderId).orderItems,
    // });
  };

export default editOrderItem;
