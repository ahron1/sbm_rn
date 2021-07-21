import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import CustomersComponent from '../../components/Customers';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const Customers = () => {
  const {setOptions, toggleDrawer} = useNavigation();
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

  return <CustomersComponent />;
};

export default Customers;
