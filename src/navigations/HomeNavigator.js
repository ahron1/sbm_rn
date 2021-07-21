import React from 'react';
import {
  ALLORDERS,
  CUSTOMERS,
  OFFERS,
  REWARDS,
  PROFILE,
  ORDERITEMS,
} from '../constants/routeNames';

import {createStackNavigator} from '@react-navigation/stack';
import AllOrders from '../screens/AllOrders/index';
import OrderItems from '../screens/OrderItems/index';
import Profile from '../screens/Profile/index';
import Offers from '../screens/Offers/index';
import Rewards from '../screens/Rewards/index';
import Customers from '../screens/Customers/index';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      initialRouteName={ALLORDERS}
      screenOptions={{headerTitleAlign: 'center'}}>
      <HomeStack.Screen name={ALLORDERS} component={AllOrders} />
      <HomeStack.Screen name={ORDERITEMS} component={OrderItems} />
      <HomeStack.Screen name={PROFILE} component={Profile} />
      <HomeStack.Screen name={OFFERS} component={Offers} />
      <HomeStack.Screen name={REWARDS} component={Rewards} />
      <HomeStack.Screen name={CUSTOMERS} component={Customers} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
