import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import DrawerNavigator from './DrawerNavigator.js';
import colors from '../assets/theme/colors';

const AppNavContainer = () => {
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.color1_1}
        // backgroundColor="blue"
        barStyle="light-content"
        hidden={false}
      />
      <NavigationContainer>
        <DrawerNavigator />
        {/* <HomeNavigator /> */}
      </NavigationContainer>
    </View>
  );
};

export default AppNavContainer;
