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

const StoreServicesForm = ({
  // orderId,
  // customerId,
  // storeId,
  // total,
  setModalVisibleStoreServices,
  modalVisibleStoreServices,
}) => {
  const label1 = 'Yes';
  const label2 = 'No';
  const deliveryRadioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'offers_delivery_true',
      selected: true,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'offers_delivery_false',
      labelStyle: {fontSize: 18},
    },
  ];
  const pickupRadioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'offers_pickup_true',
      selected: true,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'offers_pickup_false',
      labelStyle: {fontSize: 18},
    },
  ];

  const [deliveryRadioButtons, setDeliveryRadioButtons] = useState(
    deliveryRadioButtonsData,
  );
  const [pickupRadioButtons, setPickupRadioButtons] = useState(
    pickupRadioButtonsData,
  );
  // useEffect(() => {
  // setRadioButtons(radioButtonsData);
  // }, [selectedStoreDetails]);

  function onPressDeliveryRadioButton(radioButtonsArray) {
    setDeliveryRadioButtons(radioButtonsArray);
  }
  function onPressPickupRadioButton(radioButtonsArray) {
    setPickupRadioButtons(radioButtonsArray);
  }

  const onSubmitMakePayment = () => {
    let isPaymentCredit;
    let isPaymentOnline;
    let isPaymentCash;
    if (deliveryRadioButtons[0].selected || deliveryRadioButtons[1].selected) {
      if (deliveryRadioButtons[0].selected) {
        console.log(' . cash ');
        isPaymentCash = true;
        isPaymentOnline = false;
        isPaymentCredit = false;
      } else if (deliveryRadioButtons[1].selected) {
        console.log(' . online ');
        isPaymentCash = false;
        isPaymentOnline = true;
        isPaymentCredit = false;
      }
    } else {
      Alert.alert('Payment method', 'Please choose your payment method');
    }
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
        // setFormErrorsOrderSend({});
        // setFormOrderSend({});
      }}
      modalBody={
        <View>
          <View style={styles.introSection}>
            <Text style={styles.rowItemContent}>
              Select which services your store offers and your service area
              radius.
            </Text>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={styles.listRow}>
              <Text style={styles.textBold}>Pickup service</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <RadioGroup
                radioButtons={pickupRadioButtons}
                onPress={onPressPickupRadioButton}
                label="pickup"
                layout="row"
              />
            </View>
          </View>
          <View style={{}}>
            <View style={styles.listRow}>
              <Text style={styles.textBold}>Delivery service</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <RadioGroup
                radioButtons={deliveryRadioButtons}
                onPress={onPressDeliveryRadioButton}
                label="delivery"
                layout="row"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              alignItems: 'center',
              // alignSelf: 'center',
            }}>
            <View style={{flex: 3}}>
              <Text style={styles.textBold}>Service area: </Text>
            </View>
            {/* <View style={{flex: 1}}> */}
            <View style={{}}>
              <AppTextInput
                style={styles.input}
                // label="Service area (in kilometers):"
                keyboardType="numeric"
                defaultValue="1"
                // placeholder="Pincode"
                // maxLength={6}
                // onChangeText={handleChange('pincode')}
                // onBlur={handleBlur('pincode')}
                // value={values.pincode}
              />

              {/*
              {errors.pincode && touched.pincode && (
                <Text style={styles.errorText}>{errors.pincode}</Text>
              )}
*/}
            </View>
            <View style={{flex: 3}}>
              <Text style={styles.text}> kilometers</Text>
            </View>
          </View>

          <View>
            <CustomButtonMedium
              title="OK"
              onPress={onSubmitMakePayment}
              style={styles.buttonSection}
              // loading={ordersState.payOrder.loading}
              // disabled={ordersState.payOrder.loading}
              backgroundColor={colors.color1_4}
            />
          </View>
        </View>
      }
    />
  );
};

export default StoreServicesForm;
