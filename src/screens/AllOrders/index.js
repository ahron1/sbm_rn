import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import AllOrdersComponent from '../../components/AllOrders';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const AllOrders = () => {
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

  return <AllOrdersComponent />;
};

export default AllOrders;
