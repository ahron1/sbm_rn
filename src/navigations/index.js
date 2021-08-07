import {NavigationContainer} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import DrawerNavigator from './DrawerNavigator.js';
import colors from '../assets/theme/colors';
import {GlobalContext} from '../context/Provider.js';
import SplashScreen from 'react-native-splash-screen';
import HomeNavigator from './HomeNavigator.js';

const AppNavContainer = () => {
  const {authState} = useContext(GlobalContext);
  const {credUpdated} = authState;

  useEffect(() => {
    SplashScreen.hide();
  }, [credUpdated]);

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
