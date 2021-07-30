import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Alert, TextInput} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import {useNavigation} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import {ALLORDERS} from '../../constants/routeNames';
import orderPayment from '../../context/actions/orderPayment';
import Icon from '../common/Icon';
import AppTextInput from '../common/AppTextInput';
import storeServicesUpdate from '../../context/actions/auth/storeServicesUpdate';

const StoreServicesForm = ({
  setModalVisibleStoreServices,
  modalVisibleStoreServices,
}) => {
  const {authState, authDispatch} = useContext(GlobalContext);
  const deliveryRadius = authState.deliveryRadius;
  const offersPickup = authState.offersPickup;
  const offersDelivery = authState.offersDelivery;
  const [formRadius, setFormRadius] = useState(
    !deliveryRadius ? {radius: '1'} : {radius: deliveryRadius.toString()},
  );
  const [formErrorsRadius, setFormErrorsRadius] = useState({});
  const onChangeRadius = ({value}) => {
    setFormRadius({...formRadius, radius: value});
    if (value === '') {
      setFormErrorsRadius(prev => {
        return {...prev, radius: 'Required'};
      });
    } else {
      setFormErrorsRadius(prev => {
        return {...prev, radius: null};
      });
    }
  };
  const label1 = 'Yes';
  const label2 = 'No';
  const deliveryRadioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'offers_delivery_true',
      selected:
        offersDelivery !== null ? (offersDelivery ? true : false) : false,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'offers_delivery_false',
      selected:
        offersDelivery !== null ? (offersDelivery ? false : true) : false,
      labelStyle: {fontSize: 18},
    },
  ];
  const pickupRadioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'offers_pickup_true',
      selected: offersPickup !== null ? (offersPickup ? true : false) : false,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'offers_pickup_false',
      selected: offersPickup !== null ? (offersPickup ? false : true) : false,
      labelStyle: {fontSize: 18},
    },
  ];

  const [deliveryRadioButtons, setDeliveryRadioButtons] = useState(
    deliveryRadioButtonsData,
  );
  const [pickupRadioButtons, setPickupRadioButtons] = useState(
    pickupRadioButtonsData,
  );

  function onPressDeliveryRadioButton(radioButtonsArray) {
    setDeliveryRadioButtons(radioButtonsArray);
  }
  function onPressPickupRadioButton(radioButtonsArray) {
    setPickupRadioButtons(radioButtonsArray);
  }

  const onSubmitStoreServices = () => {
    if (!formRadius.radius) {
      setFormErrorsRadius(prev => {
        return {...prev, radius: 'Required'};
      });
      console.log('in store submit form, submit pressed. missing radius');
      return;
    }
    const updatedRadius = Number(formRadius.radius);
    let deliveryService;
    let pickupService;
    if (deliveryRadioButtons[0].selected || deliveryRadioButtons[1].selected) {
      if (deliveryRadioButtons[0].selected) {
        console.log('delivery yes');
        deliveryService = true;
      } else if (deliveryRadioButtons[1].selected) {
        console.log('delivery no');
        deliveryService = false;
      }
    } else {
      Alert.alert('Delivery service', 'Choose yes or no for delivery service');
      return;
    }
    if (pickupRadioButtons[0].selected || pickupRadioButtons[1].selected) {
      if (pickupRadioButtons[0].selected) {
        console.log('pickup yes');
        pickupService = true;
      } else if (pickupRadioButtons[1].selected) {
        console.log('pickup no');
        pickupService = false;
      }
    } else {
      Alert.alert('Pickup service', 'Choose yes or no for pickup service');
      return;
    }
    console.log(
      'in store submit form, submit pressed. ALL OK \n',
      'delivery is: ',
      deliveryService,
      '\n',
      'pickup is: ',
      pickupService,
      '\n',
      'delivery radius is ',
      updatedRadius,
    );
    storeServicesUpdate({deliveryService, pickupService, updatedRadius})(
      authDispatch,
    )(() => setModalVisibleStoreServices(false));
  };

  return (
    <AppModal
      modalVisible={modalVisibleStoreServices}
      setModalVisible={setModalVisibleStoreServices}
      modalTitle={'Store services'}
      modalFooter={<></>}
      onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        console.log('modal closed');
        setFormErrorsRadius({});
        // setFormRadius()
      }}
      modalBody={
        <View>
          <View style={styles.introSection}>
            <Text style={styles.introContent}>
              Select which services your store offers and your service area
              radius.
            </Text>
          </View>
          <View style={styles.serviceSection}>
            <View style={styles.serviceRow}>
              <Text style={styles.textBold}>Pickup service</Text>
            </View>
            <View style={styles.radioSection}>
              <RadioGroup
                radioButtons={pickupRadioButtons}
                onPress={onPressPickupRadioButton}
                label="pickup"
                layout="row"
              />
            </View>
          </View>
          <View style={styles.serviceSection}>
            <View style={styles.serviceRow}>
              <Text style={styles.textBold}>Delivery service</Text>
            </View>
            <View style={styles.radioSection}>
              <RadioGroup
                radioButtons={deliveryRadioButtons}
                onPress={onPressDeliveryRadioButton}
                label="delivery"
                layout="row"
              />
            </View>
          </View>

          <View style={styles.radiusSection}>
            <View style={styles.radiusTitle}>
              <Text style={styles.textBold}>Service area:{'  '} </Text>
            </View>
            {/* <View style={{flex: 1}}> */}
            <View>
              <AppTextInput
                style={styles.input}
                keyboardType="numeric"
                // defaultValue={!deliveryRadius ? '1' : deliveryRadius.toString()}
                // defaultValue={formRadius.radius}
                value={formRadius.radius || ''}
                maxLength={4}
                onChangeText={value => {
                  onChangeRadius({value});
                }}
                error={formErrorsRadius.radius}
              />
            </View>
            <View style={styles.radiusTitle}>
              <Text style={styles.text}>{'  '}kilometers</Text>
            </View>
          </View>

          <View>
            <CustomButtonMedium
              title="OK"
              onPress={onSubmitStoreServices}
              style={styles.buttonSection}
              loading={authState.storeServicesUpdate.loading}
              disabled={authState.storeServicesUpdate.loading}
              backgroundColor={colors.color1_4}
            />
          </View>
        </View>
      }
    />
  );
};

export default StoreServicesForm;
