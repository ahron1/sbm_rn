import {
  STORE_SERVICES_UPDATE_FAIL,
  STORE_SERVICES_UPDATE_LOADING,
  STORE_SERVICES_UPDATE_SUCCESS,
} from '../../../constants/actionTypes';

import axiosInstance from '../../../helpers/axiosInterceptor';

const storeServicesUpdate =
  ({deliveryService, pickupService, updatedRadius}) =>
  dispatch =>
  onSuccess => {
    console.log(
      'in store services update. dispatch loading  with values:>>  ',
      deliveryService,
      pickupService,
      updatedRadius,
    );

    dispatch({
      type: STORE_SERVICES_UPDATE_LOADING,
    });

    axiosInstance
      .post('/update_store_services', {
        deliveryService: deliveryService,
        pickupService: pickupService,
        updatedRadius: updatedRadius,
      })
      .then(res => {
        console.log('in store services update. got response >> ', res.data);
        dispatch({
          type: STORE_SERVICES_UPDATE_SUCCESS,
          payload: {
            deliveryService: deliveryService,
            pickupService: pickupService,
            updatedRadius: updatedRadius,
          },
        });
        onSuccess();
      })
      .catch(err => {
        console.log('in store services update. error is >> ', err);
        dispatch({
          type: STORE_SERVICES_UPDATE_FAIL,
          payload: err,
        });
      });
  };

export default storeServicesUpdate;
