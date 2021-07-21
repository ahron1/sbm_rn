import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import OrderItemsComponent from '../../components/OrderItems';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const OrderItems = () => {
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

  return <OrderItemsComponent />;
};

export default OrderItems;
