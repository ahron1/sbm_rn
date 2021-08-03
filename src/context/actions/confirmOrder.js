import {
  CONFIRM_ORDER_FAIL,
  CONFIRM_ORDER_LOADING,
  CONFIRM_ORDER_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

export default ({orderId}) =>
  dispatch =>
  onSuccess => {
    // console.log('in confirmorder action form order is >> ');
    dispatch({
      type: CONFIRM_ORDER_LOADING,
    });

    axiosInstance
      .post('/store_confirm_order', {
        orderId: orderId,
      })
      .then(res => {
        // console.log('in confirmorder action got response >> ', res.data);
        dispatch({
          type: CONFIRM_ORDER_SUCCESS,
          // payload: dataOrders,
          payload: res.data,
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in confirm order action error is >> ', err);
        dispatch({
          type: CONFIRM_ORDER_FAIL,
          // payload: dataOrders,
          payload: err,
        });
      });
  };
