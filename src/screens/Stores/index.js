import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import StoresComponent from '../../components/Stores';
import {GlobalContext} from '../../context/Provider';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import getStores from '../../context/actions/getStores';

const Stores = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const {authState} = useContext(GlobalContext);
  const {storesDispatch, storesState} = useContext(GlobalContext);
  const route = useRoute();

  let orderId = 0;
  if (route.params) {
    // console.log('in stores screen. route is:>> ', route);
    if (route.params.orderId) {
      orderId = route.params.orderId;
    }
  }
  useEffect(() => {
    setOptions({
      headerLeft: () => (
        <NavMenuPressable
          onPress={() => {
            toggleDrawer();
          }}>
          <NavMenuComponent />
        </NavMenuPressable>
      ),
    });
  }, [setOptions, toggleDrawer]);

  useEffect(() => {
    // the navigation in the dep array is to trigger a reload/sort on navigating back to this screen
    console.log('navigating to stores screen.');
    const unsubscribe = navigation.addListener('focus', () => {
      if (authState.latitude && authState.longitude) {
        console.log('in stores screen. will call getstores');
        getStores()(storesDispatch);
      } else {
        console.log(
          'in stores screen. address not updated. will not call getstores',
        );
      }
    });
    return unsubscribe;
  }, [navigation]);

  if (orderId) {
    console.log('navigated from order items screen. order id is:>> ', orderId);
  } else {
    console.log('navigated from menu . order id is:>>  ', orderId);
  }
  return (
    <StoresComponent
      storesLoading={storesState.getStores.loading}
      storesData={storesState.getStores.data}
      orderId={orderId}
    />
  );
};

export default Stores;
