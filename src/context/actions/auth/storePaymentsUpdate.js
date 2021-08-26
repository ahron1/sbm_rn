import {
  STORE_PAYMENTS_UPDATE_FAIL,
  STORE_PAYMENTS_UPDATE_LOADING,
  STORE_PAYMENTS_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';

import axiosInstance from '../../../helpers/axiosInterceptor';

const storePaymentsUpdate =
  ({paymentOnline, upiId}) =>
  dispatch =>
  onSuccess => {
    // console.log(
    // 'in store payments update. dispatch loading  with values:>>  ',
    // paymentOnline,
    // upiId,
    // );

    dispatch({
      type: STORE_PAYMENTS_UPDATE_LOADING,
    });
    axiosInstance
      .post('/update_store_payments', {
        paymentOnline: paymentOnline,
        upiId: upiId,
      })
      .then(res => {
        dispatch({
          type: STORE_PAYMENTS_UPDATE_SUCCESS,
          payload: {
            paymentOnline: paymentOnline,
            upiId: upiId,
          },
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in store payments update. error is >> ', err);
        dispatch({
          type: STORE_PAYMENTS_UPDATE_FAIL,
          payload: err,
        });
      });
  };

export default storePaymentsUpdate;
