import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {Text, Pressable, View} from 'react-native';
import ProfileComponent from '../../components/Profile';
import NavMenuComponent, {
  NavMenuPressable,
} from '../../components/common/NavMenu';

const Profile = () => {
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

  return <ProfileComponent />;
};

export default Profile;
