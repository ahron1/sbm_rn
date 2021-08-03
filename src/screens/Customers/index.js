import {useNavigation} from '@react-navigation/core';
import React, {useContext, useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import CustomersComponent from '../../components/Customers';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';
import {GlobalContext} from '../../context/Provider';
import getCustomers from '../../context/actions/getCustomers';

const Customers = ({navigation}) => {
  const {setOptions, toggleDrawer} = useNavigation();
  const {customersDispatch, customersState} = useContext(GlobalContext);

  const {
    data: dataGetCustomers,
    loading: loadingGetCustomers,
    error: errorGetCustomers,
  } = customersState.getCustomers;

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
    // console.log('navigating to  all orders screen.');
    const unsubscribe = navigation.addListener('focus', () => {
      getCustomers()(customersDispatch);
    });
    return unsubscribe;
    // the navigation in the dep array is to trigger a reload/sort on navigating back to this screen
  }, [navigation, dataGetCustomers]);

  return (
    <CustomersComponent
      dataGetCustomers={dataGetCustomers}
      loadingGetCustomers={loadingGetCustomers}
      errorGetCustomers={errorGetCustomers}
    />
  );
};

export default Customers;
