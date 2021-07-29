import {
  GET_CUSTOMERS_LOADING,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
} from '../../constants/actionTypes';
import axiosInstance from '../../helpers/axiosInterceptor';

const getCustomers = () => dispatch => {
  console.log('in getcustomers dispatch loading >> ');
  dispatch({
    type: GET_CUSTOMERS_LOADING,
  });

  axiosInstance
    .get('/get_store_customers')
    .then(res => {
      console.log('in getcustomers. server response is >> ', res.data);
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(err => {
      console.log('in getcustomers error is >> ', err);
      dispatch({
        type: GET_CUSTOMERS_FAIL,
        // payload: dataOrders,
        payload: err,
      });
    });
};

export default getCustomers;
