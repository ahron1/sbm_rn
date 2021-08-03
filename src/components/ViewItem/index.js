import React, {useContext, useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import AppModal from '../common/AppModal';
import CustomButtonSmall from '../common/CustomButtonSmall';
import {GlobalContext} from '../../context/Provider';
import colors from '../../assets/theme/colors';
import styles from './styles';
import Icon from '../../components/common/Icon';
import AppTextInput from '../common/AppTextInput';
import CustomButton from '../common/CustomButton';
import editOrderItem from '../../context/actions/editOrderItem';

const ViewItem = ({
  item,
  modalVisibleViewItem,
  setModalVisibleViewItem,
  orderItemId,
  currentCodeNumber: orderStatusCodeNumber,
}) => {
  const canDeleteItem = orderStatusCodeNumber > 500 ? false : true;
  const {orderItemsDispatch, orderItemsState} = useContext(GlobalContext);
  const {
    // order_item_id: orderItemId,
    name: orderItemName,
    quantity: orderItemQuantity,
    price: orderItemPrice,
    available: orderItemAvailable,
  } = item;

  const [formPrice, setFormPrice] = useState(
    !orderItemPrice ? {price: '0'} : {price: orderItemPrice.toString()},
  );

  useEffect(() => {
    if (item) {
      setFormPrice({price: orderItemPrice ? orderItemPrice.toString() : '0'});
    }
  }, [item]);

  const [formErrorsPrice, setFormErrorsPrice] = useState({});
  const onChangePrice = ({value}) => {
    setFormPrice({...formPrice, price: value});
    if (value === '') {
      setFormErrorsPrice(prev => {
        return {...prev, price: 'Required'};
      });
    } else {
      setFormErrorsPrice(prev => {
        return {...prev, price: null};
      });
    }
  };

  const onSubmitItemPrice = () => {
    if (!formPrice.price) {
      setFormErrorsPrice(prev => {
        return {...prev, price: 'Required'};
      });
      // console.log('in item details form. submit pressed. price missing');
      return;
    }

    const price = formPrice.price;
    const availability = true;

    // console.log(
    // 'in item details form. submit pressed on item id ',
    // orderItemId,
    // 'price set to ',
    // price,
    // 'availability is ',
    // availability,
    // );
    //
    editOrderItem({
      orderItemId: orderItemId,
      orderItemPrice: price,
      orderItemAvailable: availability,
    })(orderItemsDispatch)(() => setModalVisibleViewItem(false));
  };

  const onSubmitNotAvailable = () => {
    const price = '0';
    const availability = false;

    // console.log(
    // 'in item details form. submit pressed on item id ',
    // orderItemId,
    // 'price set to ',
    // price,
    // 'availability is ',
    // availability,
    // );

    editOrderItem({
      orderItemId: orderItemId,
      orderItemPrice: price,
      orderItemAvailable: availability,
    })(orderItemsDispatch)(() => setModalVisibleViewItem(false));
  };

  return (
    <AppModal
      modalVisible={modalVisibleViewItem}
      setModalVisible={setModalVisibleViewItem}
      modalTitle={'Item details'}
      modalFooter={<></>}
      // onShow={() => console.log('modal shown')}
      onModalClose={() => {
        // console.log('modal closed');
      }}
      modalBody={
        <View>
          <View>
            <View style={styles.introSection}>
              <Text style={styles.introText}>
                Enter the price of the item and touch OK. If the item is not
                available, touch the Not Available button.
              </Text>
            </View>
            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Item: </Text>
              <Text style={styles.orderItemContent}> {orderItemName}</Text>
            </View>
            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Quantity: </Text>
              <Text style={styles.orderItemContent}> {orderItemQuantity}</Text>
            </View>

            <View style={styles.orderItem}>
              <Text style={styles.orderItemTitle}>Available: </Text>
              {/* <Text style={styles.orderItemContent}> */}
              <Text style={[styles.orderItemContent, styles.price]}>
                {' '}
                {orderItemAvailable === null
                  ? 'Please update..'
                  : orderItemAvailable
                  ? 'Yes'
                  : 'No'}
              </Text>
            </View>

            <View style={styles.priceSection}>
              <View style={styles.priceTitle}>
                <Text style={styles.textBold}>Price:{'  '} </Text>
              </View>
              <View style={styles.InrTitle}>
                <Text style={styles.text}>
                  <Icon
                    type="materialCommunity"
                    name="currency-inr"
                    style={styles.price}
                  />{' '}
                </Text>
              </View>
              <View>{/* <Text>Price is: {orderItemPrice}</Text> */}</View>
              <View style={styles.priceField}>
                <AppTextInput
                  style={styles.input}
                  keyboardType="numeric"
                  // defaultValue={
                  // orderItemPrice === null ? '000' : orderItemPrice.toString()
                  // }
                  value={formPrice.price || ''}
                  maxLength={4}
                  onChangeText={value => {
                    onChangePrice({value});
                  }}
                  error={formErrorsPrice.price}
                />
              </View>
            </View>
          </View>
          {canDeleteItem && (
            <CustomButton
              title="OK"
              backgroundColor={colors.color4_3}
              style={styles.buttonSection}
              loading={orderItemsState.editOrderItem.loading}
              disabled={orderItemsState.editOrderItem.loading}
              onPress={() => {
                onSubmitItemPrice();
              }}
            />
          )}

          {canDeleteItem && (
            <CustomButtonSmall
              title="Not Available"
              backgroundColor={colors.color3_1}
              style={styles.buttonSection}
              loading={orderItemsState.editOrderItem.loading}
              disabled={orderItemsState.editOrderItem.loading}
              onPress={() => {
                onSubmitNotAvailable();
              }}
            />
          )}
        </View>
      }
    />
  );
};

export default ViewItem;
