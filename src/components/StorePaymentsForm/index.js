import React, {useContext, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import RadioGroup from 'react-native-radio-buttons-group';
import AppTextInput from '../common/AppTextInput';
import storePaymentsUpdate from '../../context/actions/auth/storePaymentsUpdate';

const StorePaymentsForm = ({
  modalVisibleStorePayments,
  setModalVisibleStorePayments,
}) => {
  const {authState, authDispatch} = useContext(GlobalContext);

  const paymentOnline = authState.paymentOnline;
  const upiId = authState.upiId;
  const [formUpiId, setFormUpiId] = useState({upiId: upiId});
  const [formErrorsUpiId, setFormErrorsUpiId] = useState({});

  const onChangeUpiId = ({value}) => {
    setFormUpiId({...formUpiId, upiId: value});
    /*
    if (value === '') {
      setFormErrorsUpiId(prev => {
        return {...prev, upiId: 'Required'};
      });
    } else {
      setFormErrorsUpiId(prev => {
        return {...prev, upiId: null};
      });
    }
    */
  };
  const label1 = 'Yes';
  const label2 = 'No';
  const paymentCashRadioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'payment_cash_true',
      selected: true,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'payment_cash_false',
      selected: false,
      labelStyle: {fontSize: 18},
      disabled: true,
    },
  ];

  const paymentOnlineRadioButtonsData = [
    {
      id: '1',
      label: label1,
      value: 'payment_online_true',
      selected: paymentOnline !== null ? (paymentOnline ? true : false) : false,
      labelStyle: {fontSize: 18},
    },
    {
      id: '2',
      label: label2,
      value: 'payment_online_false',
      selected: paymentOnline !== null ? (paymentOnline ? false : true) : false,
      labelStyle: {fontSize: 18},
    },
  ];

  const [paymentCashRadioButtons, setPaymentCashRadioButtons] = useState(
    paymentCashRadioButtonsData,
  );
  const [paymentOnlineRadioButtons, setPaymentOnlineRadioButtons] = useState(
    paymentOnlineRadioButtonsData,
  );

  const onPressPaymentCashRadioButton = radioButtonsArray => {
    setPaymentCashRadioButtons(radioButtonsArray);
  };
  const onPressPaymentOnlineRadioButton = radioButtonsArray => {
    setFormErrorsUpiId({});
    setPaymentOnlineRadioButtons(radioButtonsArray);
  };

  const onSubmitStorePayments = () => {
    const submittedUpiId = formUpiId.upiId;
    let cleanUpiId = submittedUpiId ? submittedUpiId.replace(/\s/g, '') : upiId;
    //todo - regex check for UPI ID
    let submittedPaymentOnline;
    if (
      paymentOnlineRadioButtons[0].selected ||
      paymentOnlineRadioButtons[1].selected
    ) {
      if (paymentOnlineRadioButtons[0].selected) {
        submittedPaymentOnline = true;
      } else if (paymentOnlineRadioButtons[1].selected) {
        submittedPaymentOnline = false;
      }
    } else {
      Alert.alert('online payment ', 'Choose yes or no for online payment ');
      return;
    }

    if (submittedPaymentOnline) {
      if (!formUpiId.upiId) {
        setFormErrorsUpiId(prev => {
          return {...prev, upiId: 'Required for online payment'};
        });
        // console.log('in store submit form, submit pressed. missing radius');
        return;
      } else {
        setFormErrorsUpiId(prev => {
          // console.log(submittedUpiId);
          return {...prev, upiId: null};
        });
      }
    }

    if (!submittedPaymentOnline) {
      cleanUpiId = null;
    }

    // console.log(
    // 'in storepaymentform. onlinepayment is: >> ',
    // submittedPaymentOnline,
    // ' upi id is > ',
    // cleanUpiId,
    // );
    storePaymentsUpdate({
      paymentOnline: submittedPaymentOnline,
      upiId: cleanUpiId,
    })(authDispatch)(() => setModalVisibleStorePayments(false));
  };

  return (
    <AppModal
      modalVisible={modalVisibleStorePayments}
      setModalVisible={setModalVisibleStorePayments}
      modalTitle={'Payment methods'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        setFormErrorsUpiId({});
        // setFormUpiId({upiId: null});
        // setFormRadius()
      }}
      modalBody={
        <View>
          <View style={styles.introSection}>
            <Text style={styles.introContent}>
              Select which payment methods your store accepts from customers.
            </Text>
          </View>
          <View style={styles.serviceSection}>
            <View style={styles.serviceRow}>
              <Text style={styles.textBold}>Cash payment</Text>
            </View>
            <View style={styles.radioSection}>
              <RadioGroup
                radioButtons={paymentCashRadioButtons}
                onPress={onPressPaymentCashRadioButton}
                label="cash"
                layout="row"
              />
            </View>
          </View>

          <View style={styles.serviceSection}>
            <View style={styles.serviceRow}>
              <Text style={styles.textBold}>Online payment</Text>
            </View>
            <View style={styles.radioSection}>
              <RadioGroup
                radioButtons={paymentOnlineRadioButtons}
                onPress={onPressPaymentOnlineRadioButton}
                label="credit"
                layout="row"
              />
            </View>
          </View>

          <View style={styles.radiusSection}>
            <View style={styles.radiusTitle}>
              <Text style={styles.textBoldItalic}>UPI ID :{'  '} </Text>
            </View>
            {/* <View style={{flex: 1}}> */}
            <View>
              <AppTextInput
                style={styles.input}
                // keyboardType="numeric"
                // defaultValue={!deliveryRadius ? '1' : deliveryRadius.toString()}
                // defaultValue={formRadius.radius}
                placeholder="9876543210@upi"
                value={formUpiId.upiId || ''}
                maxLength={45}
                onChangeText={value => {
                  onChangeUpiId({value});
                }}
                error={formErrorsUpiId.upiId}
              />
            </View>
          </View>
          <Text style={styles.textItalic}>
            1. UPI Must be a MERCHANT UPI ID.
          </Text>
          <Text style={styles.textItalic}>
            2. Online payment will be implemented after verification and KYC.
          </Text>

          <View>
            <CustomButtonMedium
              title="OK"
              onPress={onSubmitStorePayments}
              style={styles.buttonSection}
              loading={authState.storePaymentsUpdate.loading}
              disabled={authState.storePaymentsUpdate.loading}
              backgroundColor={colors.color1_4}
            />
          </View>
        </View>
      }
    />
  );
};

export default StorePaymentsForm;
