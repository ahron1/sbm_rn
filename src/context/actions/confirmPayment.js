import {
  CONFIRM_PAYMENT_FAIL,
  CONFIRM_PAYMENT_LOADING,
  CONFIRM_PAYMENT_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

export default ({orderId}) =>
  dispatch =>
  onSuccess => {
    // console.log('in confirmpayment action payment is >> ');
    dispatch({
      type: CONFIRM_PAYMENT_LOADING,
    });

    axiosInstance
      .post('/store_confirm_payment', {
        orderId: orderId,
      })
      .then(res => {
        // console.log('in confirmpayment action got response >> ', res.data);
        dispatch({
          type: CONFIRM_PAYMENT_SUCCESS,
          // payload: dataOrders,
          payload: res.data,
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in confirm payment action error is >> ', err);
        dispatch({
          type: CONFIRM_PAYMENT_FAIL,
          // payload: dataOrders,
          payload: err,
        });
      });
  };
