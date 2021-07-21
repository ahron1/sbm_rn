import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from '../../components/common/Icon';
import styles from './styles';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {
  ALLORDERS,
  OFFERS,
  REWARDS,
  PROFILE,
  CUSTOMERS,
} from '../../constants/routeNames';

const SideMenu = ({navigation}) => {
  const menuItems = [
    {
      // icon: <Icon type="simpleLine" name="docs" size={40} />,
      icon: <Icon type="material" name="format-list-numbered" size={40} />,
      name: 'Orders received',
      onPress: () => {
        navigation.navigate(ALLORDERS);
      },
    },

    {
      icon: <Icon type="material" name="storefront" size={40} />,
      name: 'Store Profile',
      onPress: () => {
        navigation.navigate(PROFILE);
      },
    },
    {
      icon: <Icon type="ionicon" name="md-gift-outline" size={40} />,
      name: 'Store Offers',
      onPress: () => {
        navigation.navigate(OFFERS);
      },
    },
    {
      icon: <Icon type="simpleLine" name="badge" size={40} />,
      name: 'Points Earned',
      onPress: () => {
        navigation.navigate(REWARDS);
      },
    },
    {
      icon: <Icon type="ionicon" name="md-people-outline" size={40} />,
      name: 'Customers',
      onPress: () => {
        navigation.navigate(CUSTOMERS);
      },
    },
  ];

  return (
    <SafeAreaView>
      <View style={styles.sideBarTop}>
        <Image
          height={1}
          width={1}
          source={require('../../assets/images/logo2.png')}
          style={styles.logoImage}
        />
        <Text style={styles.sideBarTopBrandText}>Storebhai</Text>
        <Text style={styles.sideBarTopAppText}>Manager App</Text>
      </View>
      <ScrollView style={styles.container}>
        <View>
          {menuItems.map(({name, icon, onPress}) => (
            <TouchableOpacity key={name} onPress={onPress}>
              <View style={styles.sideBarItem}>
                {icon}
                <Text style={styles.sideBarItemText}>{name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SideMenu;
