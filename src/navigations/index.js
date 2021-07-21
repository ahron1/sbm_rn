import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import DrawerNavigator from './DrawerNavigator';

import HomeNavigator from './HomeNavigator';

const AppNavContainer = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
      {/* <HomeNavigator /> */}
    </NavigationContainer>
  );
};

export default AppNavContainer;
