import {
  CONFIRM_FULFIL_FAIL,
  CONFIRM_FULFIL_LOADING,
  CONFIRM_FULFIL_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

export default ({orderId}) =>
  dispatch =>
  onSuccess => {
    console.log('in confirmfulfil action >> ');
    dispatch({
      type: CONFIRM_FULFIL_LOADING,
    });

    axiosInstance
      .post('/store_confirm_fulfil', {
        orderId: orderId,
      })
      .then(res => {
        console.log('in confirmfulfil action got response >> ', res.data);
        dispatch({
          type: CONFIRM_FULFIL_SUCCESS,
          // payload: dataOrders,
          payload: res.data,
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in confirm fulfil action error is >> ', err);
        dispatch({
          type: CONFIRM_FULFIL_FAIL,
          // payload: dataOrders,
          payload: err,
        });
      });
  };
