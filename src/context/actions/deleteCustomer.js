import {Alert} from 'react-native';
import {
  DELETE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_LOADING,
  DELETE_CUSTOMER_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const addCustomer =
  ({customerNumber}) =>
  dispatch =>
  onSuccess =>
  onFail => {
    dispatch({
      type: DELETE_CUSTOMER_LOADING,
    });

    axiosInstance
      .post('/store_delete_customer', {
        customerNumber: customerNumber,
      })
      .then(res => {
        // console.log('in action add customer . got response >> ', res.data);
        dispatch({
          type: DELETE_CUSTOMER_SUCCESS,
          payload: {
            customerNumber: customerNumber,
          },
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in action add customer. fail.. error is >> ', err);
        Alert.alert(
          'Error',
          "This customer's contact details could not be deleted",
        );

        dispatch({
          type: DELETE_CUSTOMER_FAIL,
          payload: err,
        });
        onFail();
      });
  };

export default addCustomer;
