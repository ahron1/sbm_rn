import React, {useContext, useState} from 'react';
import styles from './styles';
import {Alert, Linking, Text, TouchableOpacity, View} from 'react-native';
import {GlobalContext} from '../../context/Provider';
import FloatingCenterButton from '../common/FloatingCenterButton';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/theme/colors';
import {CUSTOMERS, PROFILE} from '../../constants/routeNames';
import AddCustomer from '../AddCustomer';
import CustomButtonMedium from '../common/CustomButtonMedium';

const OffersComponent = () => {
  const {authState} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  const [modalVisibleAddCustomer, setModalVisibleAddCustomer] = useState(false);
  let customerView;

  if (authState.latitude && authState.longitude) {
    customerView = (
      <>
        <View style={styles.container}>
          <Text style={styles.loadingText}>
            Special offers for your customers.
          </Text>
          <View styles={styles.loadingTextIndicator}>
            <Text style={styles.loadingText}>
              You will be eligible to make special offers after doing regular
              business for 3 months.
            </Text>
            <Text style={styles.loadingText}>
              We will sponsor and promote offers for customers of high ranked
              stores.
            </Text>
          </View>
        </View>
        <FloatingCenterButton
          buttonText="Broadcast"
          iconType="fa"
          iconName="bullhorn"
          circleColor={colors.color3_4}
          iconColor={colors.color2_4}
          onPress={() => {
            // console.log('in orders empty component. + button pressed');
            if (authState.latitude && authState.longitude) {
              // setModalVisibleAddCustomer(true);
              // navigate(CUSTOMERS);
              const storeName = authState.userName;
              // console.log('in component offers. ', storeName);
              const message =
                'Namaskar, ' +
                ' \n\n' +
                storeName +
                ' is now on Storebhai! ' +
                ' \n\nSo please use the Storebhai app and send your orders to ' +
                storeName +
                '. It is very easy and a better experience.' +
                ' \n\nInstall the Storebhai app from this link now: ' +
                ' \n' +
                ' http://play.google.com/store/apps/details?id=com.storebhai.android_user_app ' +
                '\n\n' +
                storeName +
                ' looks forward to serving your orders on Storebhai.' +
                '\n\n' +
                'StayHomeStaySafe, \n' +
                storeName;
              Linking.openURL(
                // 'whatsapp://send?text=' + message + '&phone=91' + formNumberClean,
                'whatsapp://send?text=' + message,
              );
            } else {
              Alert.alert(
                'Not logged in',
                'Please log in first.',

                [
                  {
                    text: 'OK',
                    onPress: () => navigate(PROFILE),
                  },
                ],
              );
            }
          }}
        />

        <AddCustomer
          modalVisibleAddCustomer={modalVisibleAddCustomer}
          setModalVisibleAddCustomer={setModalVisibleAddCustomer}
        />
      </>
    );
  } else {
    // console.log('in stores component. address not yet updated .');
    customerView = (
      <View style={styles.emptyContainer}>
        <View styles={styles.emptyTextIndicator}>
          <Text style={styles.emptyText}>
            Please first update your address on the profile page.
          </Text>
        </View>
        <View style={styles.buttonSection}>
          <CustomButtonMedium
            style={styles.button}
            backgroundColor={colors.color1_4}
            primary
            title="OK"
            onPress={() => {
              navigate(PROFILE);
            }}
          />
        </View>
      </View>
    );
  }

  return customerView;
};

export default OffersComponent;
