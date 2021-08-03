import React from 'react';
import {
  ALLORDERS,
  OFFERS,
  ORDERITEMS,
  // REWARDS,
  PROFILE,
  ORDERSTATUS,
  CUSTOMERS,
} from '../constants/routeNames';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import OrderItems from '../screens/OrderItems';
import AllOrders from '../screens/AllOrders';
import Profile from '../screens/Profile';
import Offers from '../screens/Offers';
// import Rewards from '../screens/Rewards';
import OrderStatus from '../screens/OrderStatus';

import colors from '../assets/theme/colors';
import {Button} from 'react-native';
import Customers from '../screens/Customers';

const HomeNavigator = ({navigation}) => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.color2_4,
        headerStyle: {backgroundColor: colors.color1_2},
        cardStyle: {backgroundColor: colors.color2_4},
        headerLeft: null, //to remove default back button.
        headerRight: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="Back"
            color={colors.color1_2}
          />
        ),
      }}
      initialRouteName={PROFILE}>
      <HomeStack.Screen name={ALLORDERS} component={AllOrders} />
      <HomeStack.Screen name={CUSTOMERS} component={Customers} />
      <HomeStack.Screen name={ORDERITEMS} component={OrderItems} />
      <HomeStack.Screen name={PROFILE} component={Profile} />
      <HomeStack.Screen name={OFFERS} component={Offers} />
      {/* <HomeStack.Screen name={REWARDS} component={Rewards} /> */}
      <HomeStack.Screen name={ORDERSTATUS} component={OrderStatus} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
