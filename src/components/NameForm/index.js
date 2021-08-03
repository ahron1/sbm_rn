import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import AppModal from '../common/AppModal';
import CustomButtonMedium from '../common/CustomButtonMedium';
import AppTextInput from '../common/AppTextInput';
import styles from './styles';
import userNameUpdate from '../../context/actions/auth/userNameUpdate';
import {GlobalContext} from '../../context/Provider';
import colors from '../../assets/theme/colors';

const NameForm = ({
  modalVisibleAddName,
  setModalVisibleAddName,
  // setStoredName,
  firebaseUid,
  currentUserName,
}) => {
  const [formAddName, setFormAddName] = useState(
    currentUserName ? {name: currentUserName} : {},
  );
  const [formErrorsAddName, setFormErrorsAddName] = useState({});
  const {authState, authDispatch} = useContext(GlobalContext);

  const storeCurrentName = () => {
    const userName = formAddName.name;
    // console.log(
    // 'in name form. update name button touched :>> ',
    // userName,
    // firebaseUid,
    // );
    userNameUpdate({userName, firebaseUid})(authDispatch)(() =>
      setModalVisibleAddName(false),
    );
  };

  const onSubmitName = () => {
    if (!formAddName.name) {
      setFormErrorsAddName(prev => {
        return {...prev, name: 'Please enter the store name'};
      });
    }
    if (
      Object.values(formAddName).length >= 1 &&
      Object.values(formAddName).every(x => x.trim().length > 0)
    ) {
      storeCurrentName();
    } else {
      // console.log('New name cannot add -errors');
    }
  };

  const onChangeName = ({name, value, isRequired}) => {
    setFormAddName({...formAddName, [name]: value});
    // console.log('in name form component. name form is :>> ', formAddName);

    if (value === '') {
      if (isRequired) {
        setFormErrorsAddName(prev => {
          return {...prev, [name]: 'This field is required'};
        });
      }
    } else {
      setFormErrorsAddName(prev => {
        return {...prev, [name]: null};
      });
    }
  };
  return (
    <AppModal
      modalVisible={modalVisibleAddName}
      setModalVisible={setModalVisibleAddName}
      modalTitle={'Store Name'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      // onDismiss={() => console.log('modal closed')}
      onModalClose={() => {
        // console.log('modal closed');
        setFormErrorsAddName({});
        setFormAddName({});
      }}
      modalBody={
        <View>
          <View style={styles.inputForm}>
            <AppTextInput
              style={styles.input}
              autoCapitalize="words"
              label="Enter the name of your store"
              maxLength={30}
              placeholder="Top Local Store"
              value={formAddName.name || ''}
              onChangeText={value => {
                onChangeName({name: 'name', value, isRequired: true});
              }}
              error={formErrorsAddName.name}
            />
          </View>

          <CustomButtonMedium
            style={styles.buttonSection}
            backgroundColor={colors.color1_4}
            title="OK"
            loading={authState.userNameUpdate.loading}
            disabled={authState.userNameUpdate.loading}
            onPress={onSubmitName}
          />
        </View>
      }
    />
  );
};

export default NameForm;
