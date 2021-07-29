import React, {useContext, useState} from 'react';
import {View, Text, Linking} from 'react-native';
import AppModal from '../common/AppModal';
// import CustomButton from '../common/CustomButton';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import addOrderItem from '../../context/actions/addOrderItem';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import addCustomer from '../../context/actions/addCustomer';

const AddCustomer = ({modalVisibleAddCustomer, setModalVisibleAddCustomer}) => {
  const {customersDispatch, customersState} = useContext(GlobalContext);
  const [formAddCustomer, setFormAddCustomer] = useState({});
  const [formErrorsAddCustomer, setFormErrorsAddCustomer] = useState({});

  const onSubmitAddCustomer = () => {
    if (!formAddCustomer.customerName) {
      setFormErrorsAddCustomer(prev => {
        return {...prev, customerName: "Enter customer's name"};
      });
    }
    if (!formAddCustomer.customerNumber) {
      setFormErrorsAddCustomer(prev => {
        return {
          ...prev,
          customerNumber: "Enter customer's WhatsApp number",
        };
      });
    }

    if (
      Object.values(formAddCustomer).length >= 2 &&
      Object.values(formAddCustomer).every(x => x.trim().length > 0)
    ) {
      console.log(
        'A OK, will add new customer',
        formAddCustomer.customerName,
        formAddCustomer.customerNumber,
      );
      addCustomer({
        customerName: formAddCustomer.customerName,
        customerNumber: formAddCustomer.customerNumber,
      })(customersDispatch)(() => {
        setFormErrorsAddCustomer({});
        setFormAddCustomer({});
        setModalVisibleAddCustomer(false);
        console.log(
          'in add customer component. name is ',
          formAddCustomer.customerName,
        );
        Linking.openURL(
          'whatsapp://send?text=' +
            'Hello, ' +
            formAddCustomer.customerName +
            " I want to refer my favorite local store to you and earn rewards. I am sharing the store's name and number \n\n" +
            '&phone=91' +
            formAddCustomer.customerNumber,
        );
      });
    } else {
      console.log('New customer cannot add -errors');
    }
  };

  const onChangeAddCustomer = ({name, value, isRequired}) => {
    setFormAddCustomer({...formAddCustomer, [name]: value});

    if (value === '') {
      if (isRequired) {
        setFormErrorsAddCustomer(prev => {
          return {...prev, [name]: 'This field is required'};
        });
      }
    } else {
      setFormErrorsAddCustomer(prev => {
        return {...prev, [name]: null};
      });
    }
  };

  return (
    <AppModal
      modalVisible={modalVisibleAddCustomer}
      setModalVisible={setModalVisibleAddCustomer}
      modalTitle={'New customer'}
      modalFooter={<></>}
      onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        console.log('modal closed');
        setFormErrorsAddCustomer({});
        setFormAddCustomer({});
      }}
      modalBody={
        <View>
          <View style={styles.introSection}>
            <Text style={styles.introText}>
              Enter the name and WhatsApp number of the customer:
            </Text>
          </View>
          <View>
            <AppTextInput
              label="Customer Name: "
              placeholder="Mr. Important Customer"
              maxLength={30}
              value={formAddCustomer.customerName || ''}
              onChangeText={value => {
                onChangeAddCustomer({
                  name: 'customerName',
                  value,
                  isRequired: true,
                });
              }}
              error={formErrorsAddCustomer.customerName}
            />
            <AppTextInput
              label="Customer's WhatsApp Number:"
              placeholder="9876543210"
              keyboardType="phone-pad"
              value={formAddCustomer.customerNumber || ''}
              maxLength={10}
              onChangeText={value => {
                onChangeAddCustomer({
                  name: 'customerNumber',
                  value,
                  isRequired: true,
                });
              }}
              error={formErrorsAddCustomer.customerNumber}
            />
          </View>

          <CustomButtonMedium
            title="OK"
            onPress={onSubmitAddCustomer}
            loading={customersState.addCustomer.loading}
            disabled={customersState.addCustomer.loading}
            style={styles.buttonSection}
            backgroundColor={colors.color1_4}
          />
        </View>
      }
    />
  );
};

export default AddCustomer;
