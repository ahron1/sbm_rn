import {Alert} from 'react-native';
import {
  ADD_CUSTOMER_FAIL,
  ADD_CUSTOMER_LOADING,
  ADD_CUSTOMER_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const addCustomer =
  ({customerName, customerNumber}) =>
  dispatch =>
  onSuccess =>
  onFail => {
    dispatch({
      type: ADD_CUSTOMER_LOADING,
    });

    axiosInstance
      .post('/store_add_customer', {
        customerNumber: customerNumber,
        customerName: customerName,
      })
      .then(res => {
        // console.log('in action add customer . got response >> ', res.data);
        dispatch({
          type: ADD_CUSTOMER_SUCCESS,
          payload: {
            customerNumber: customerNumber,
            customerName: customerName,
          },
        });
        onSuccess();
      })
      .catch(err => {
        // console.log('in action add customer. fail.. error is >> ', err);
        Alert.alert(
          'Error',
          "This customer's contact details are already in the system.\n\nIf there is a problem please contact us.",
        );

        dispatch({
          type: ADD_CUSTOMER_FAIL,
          payload: err,
        });
        onFail();
      });
  };

export default addCustomer;
