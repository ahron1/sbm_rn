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
  onSuccess => {
    dispatch({
      type: ADD_CUSTOMER_LOADING,
    });

    axiosInstance
      .post('/store_add_customer', {
        customerNumber: customerNumber,
        customerName: customerName,
      })
      .then(res => {
        console.log('in action add customer . got response >> ', res.data);
        Alert.alert(
          'Already added',
          "This customer's contact details are already in the system.",
        );
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
        console.log('in action add customer. fail.. error is >> ', err);
        dispatch({
          type: ADD_CUSTOMER_FAIL,
          payload: err,
        });
      });
  };

export default addCustomer;
