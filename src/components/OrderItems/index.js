import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import {Alert, FlatList, Linking, Pressable, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewItem from '../ViewItem';
import FloatingRightButton from '../common/FloatingRightButton';
import FloatingCenterButton from '../common/FloatingCenterButton';
import ListFooterComponent from '../common/ListFooter';
import styles from './styles';
import colors from '../../assets/theme/colors';
import Icon from '../../components/common/Icon';
import ListItemSeparatorComponent from '../common/ListItemSeparator';
import {ALLORDERS, ORDERSTATUS, STORES} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import getOrderStatus from '../../helpers/orderStatus';
import LoadingView from '../LoadingView';
import getDateTime from '../../helpers/dateTimeString';
import confirmOrder from '../../context/actions/confirmOrder';
import confirmFulfil from '../../context/actions/confirmFulfil';
import confirmPayment from '../../context/actions/confirmPayment';
import CustomButtonSmall from '../common/CustomButtonSmall';

// const OrderItemsComponent = ({orderStatusDetails, dataOrderItems}) => {
const OrderItemsComponent = ({
  orderId,
  customerName,
  dataOrderItems,
  loadingGetOrderItems,
}) => {
  const {ordersDispatch, ordersState} = useContext(GlobalContext);
  const [currentItem, setCurrentItem] = useState({});
  const [currentItemId, setCurrentItemId] = useState(null);
  const [modalVisibleViewItem, setModalVisibleViewItem] = useState(false);
  const {navigate} = useNavigation();
  const [order] = ordersState.getOrders.data.filter(
    x => x.order_id === orderId,
  );

  // console.log('order is > \n', order);

  const {
    time_100_created,
    time_200_customer_sent,
    price: orderPrice,
    is_delivery: isDelivery,
    is_pickup: isPickup,
    store_name: storeName,
    store_id: storeId,
    customer_note: orderComments,
    customer_mobile_number: customerMobileNumber,
    customer_address_line1: customerAddressLine1,
    customer_address_line2: customerAddressLine2,
    customer_city: customerCity,
    customer_pincode: customerPincode,
  } = order ? order : {};
  // the conditional assignment is to take care of deletion where the order item details are no longer found after deletion

  const {
    orderStatusText: orderStatusText,
    orderStatusNext: orderStatusNext,
    orderColorCode: orderColorCode,
    orderStatusCode: orderStatusCode,
    orderColorText: orderColorText,
  } = order ? getOrderStatus(order) : {};

  const currentCodeNumber = Number(orderStatusCode.substr(7, 3));
  // console.log(
  // 'in order items. order status code is :> ',
  // orderStatusCode,
  // 'number is ',
  // currentCodeNumber,
  // );
  // the conditional assignment is to take care of deletion where the order item details are no longer found after deletion

  let total;
  let checked;
  if (Array.isArray(dataOrderItems) && dataOrderItems.length > 0) {
    let prices = dataOrderItems.map(a => a.price * a.available);
    total = prices.reduce((accumulator, currentValue, currentIndex, array) => {
      return accumulator + currentValue;
    }, 0);

    let done = dataOrderItems.map(a => (a.available === null ? 0 : 1));
    checked = done.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  }
  const allItemsChecked = checked < dataOrderItems.length ? false : true;

  // const {orderId, orderPrice, orderDate, orderStatus, orderRatingStars} = order;

  const navigateOrderStatus = () => {
    navigate(ORDERSTATUS, {
      orderStatusCode: orderStatusCode,
      orderColorCode: orderColorCode,
      orderId: orderId,
      storeName: storeName,
      time_200_customer_sent: time_200_customer_sent,
    });
  };

  // move to helper func. asap.
  const OrderItemsButtons = () => {
    // console.log(
    // 'in order items component. orderstatuscode is:>> ',
    // orderStatusCode,
    // orderStatusText,
    // );
    var buttons;
    switch (orderStatusCode) {
      case 'status_900_order_complete':
      case 'status_700_payment_received':
        // console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Earn rewards"
                iconType="entypo"
                iconName="trophy"
                circleColor={colors.color3_3}
                iconColor={colors.color2_4}
                onPress={() => {
                  Linking.openURL(
                    'whatsapp://send?text=' +
                      'Hello Storebhai team, I completed an order on the app.' +
                      ' I want to ask about your rewards program.' +
                      '&phone=91' +
                      '8883672999',
                  );
                }}
              />
            </View>
          </View>
        );
        break;

      case 'status_600_payment_made':
      case 'status_500_customer_received':
      case 'status_400_store_fulfilled':
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Confirm payment"
                iconType="fontisto"
                iconName="inr"
                iconColor={colors.color2_2_4}
                circleColor={colors.color3_4}
                loading={ordersState.confirmPayment.loading}
                disabled={ordersState.confirmPayment.loading}
                onPress={() => {
                  Alert.alert(
                    'Confirm payment    ₹ ' + total,
                    'Did you receive the payment?' +
                      '\n\nAfter receiving payment from the customer, press OK to confirm.' +
                      '\n\nIf you have not yet received the payment, press Cancel',
                    [
                      {
                        text: 'Cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          // console.log('OKKKKK');
                          confirmPayment({
                            orderId,
                          })(ordersDispatch)(() => {
                            navigate(ALLORDERS);
                            // console.log(
                            // 'in order items components. payment confirmed . going back to all orders',
                            // );
                          });
                        },
                      },
                    ],
                  );
                }}
              />
            </View>
          </View>
        );
        break;
      case 'status_300_store_checked':
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Order fulfilled"
                iconType="fontisto"
                iconName="shopping-bag-1"
                circleColor={colors.color3_4}
                iconColor={colors.color2_4}
                disabled={ordersState.confirmFulfil.loading}
                loading={ordersState.confirmFulfil.loading}
                onPress={() => {
                  // console.log(
                  // 'in order items component. order fulfilled pressed. ',
                  // );

                  Alert.alert(
                    'Order fulfillment',
                    'Did you hand over the items to the customer?.' +
                      '\n\nAfter handing over the items to the customer, press Confirm.' +
                      '\n\nIf you have not yet given the items to the customer, press Cancel.',
                    [
                      {
                        text: 'Cancel',
                      },
                      {
                        text: 'Confirm',
                        onPress: () => {
                          confirmFulfil({
                            orderId,
                          })(ordersDispatch)(() => {
                            // console.log(
                            // 'in order items components. confirmed order fulfillment. going back to all orders',
                            // );
                            Alert.alert(
                              'Thank you',
                              'Thank you for fulfilling the order. \n\nPlease confirm after receiving payment',
                            );
                            navigate(ALLORDERS);
                          });
                        },
                      },
                    ],
                  );
                }}
              />
            </View>
          </View>
        );
        break;

      case 'status_200_customer_sent':
        buttons = !allItemsChecked ? (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Order status"
                iconType="ant"
                iconName="questioncircle"
                iconColor={colors.color2_4}
                circleColor={colors.color4_2}
                onPress={() => {
                  // console.log(
                  // 'in order items component. check status pressed. order status code is:>> ',
                  // orderStatusCode,
                  // );
                  navigateOrderStatus();
                }}
              />
            </View>
          </View>
        ) : (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Confirm Order"
                iconType="fa5"
                iconName="check"
                circleColor={colors.color3_4}
                iconColor={colors.color2_4}
                loading={ordersState.confirmOrder.loading}
                disabled={ordersState.confirmOrder.loading}
                onPress={() => {
                  // console.log(
                  // 'in order items component. confirm order pressed. ',
                  // );

                  Alert.alert(
                    'Order Confirmation',
                    'Did you confirm the prices and availability for all items?' +
                      '\n\nAfter checking all the prices and availability, press OK. ' +
                      '\n\nIf you have not yet checked all the items, press Cancel.',
                    [
                      {
                        text: 'Cancel',
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          confirmOrder({
                            orderId,
                          })(ordersDispatch)(() => {
                            navigate(ALLORDERS);
                            // console.log(
                            // 'in order items components. successfully confirmed order . going back to all orders',
                            // );
                            Alert.alert(
                              'Order confirmed',
                              'Thank you for confirming the order.' +
                                '\n\nPlease give the items to the customer as soon as possible.',
                            );
                          });
                        },
                      },
                    ],
                  );
                }}
              />
            </View>
          </View>
        );
        break;

      default:
        // console.log('in order items component. buttons func. status default');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Order status"
                iconType="ant"
                iconName="questioncircle"
                iconColor={colors.color2_4}
                circleColor={colors.color4_2}
                onPress={() => {
                  // console.log(
                  // 'in order items component. check status pressed. order status code is:>> ',
                  // orderStatusCode,
                  // );
                  navigateOrderStatus();
                }}
              />
            </View>
          </View>
        );
    }

    return buttons;
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyListView}>
        <Text style={styles.emptyListText}>This order is empty.</Text>
        <Text style={styles.emptyListText}>
          Touch the "Add item" button to write your order.
        </Text>
        <Text style={styles.emptyListText}>
          After you finish adding items, you can send the order to your local
          store.
        </Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    const message =
      'Namaskar, ' + customerName + '. I want to update about ...';

    return (
      <View>
        <View style={[styles.customerBoard]}>
          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardNameTitle]}>Customer: </Text>
            <Text style={[styles.dashboardNameContent]}>{customerName}</Text>
          </View>
          <View style={styles.dashboardItem}>
            <View style={styles.dashboardButton}>
              <CustomButtonSmall
                style={styles.button}
                primary
                title="Address"
                // loading={authState.userNameUpdate.loading}
                // disabled={authState.userNameUpdate.loading}
                onPress={() => {
                  Alert.alert(
                    customerName,
                    customerAddressLine1 +
                      '\n' +
                      customerAddressLine2 +
                      '\n' +
                      customerCity +
                      '\n' +
                      customerPincode,
                  );
                  // setModalVisibleAddName(true);
                }}
              />
            </View>
            <View style={styles.dashboardButton}>
              <CustomButtonSmall
                style={styles.button}
                primary
                title="Contact"
                // loading={authState.userNameUpdate.loading}
                // disabled={authState.userNameUpdate.loading}
                onPress={() => {
                  // console.log('contact touched ', customerName);
                  Alert.alert(customerName, 'Number: ' + customerMobileNumber, [
                    {
                      text: 'Cancel',
                    },
                    {
                      text: 'Call',
                      onPress: () => {
                        Linking.openURL(`tel:${customerMobileNumber}`);
                      },
                    },
                    {
                      text: 'WhatsApp',
                      onPress: () => {
                        Linking.openURL(
                          'whatsapp://send?text=' +
                            message +
                            '&phone=' +
                            customerMobileNumber,
                        );
                      },
                    },
                  ]);
                }}
              />
            </View>
          </View>
        </View>
        <View style={[styles.statusboard, {backgroundColor: orderColorCode}]}>
          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardItemTitle, {color: orderColorText}]}>
              Order Id:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {orderId}
            </Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardItemTitle, {color: orderColorText}]}>
              Order time:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {time_200_customer_sent
                ? getDateTime(new Date(time_200_customer_sent))
                : getDateTime(new Date(time_100_created))}
            </Text>
          </View>

          {(isPickup || isDelivery) && (
            <View style={styles.dashboardItem}>
              <Text
                style={[styles.dashboardItemTitle, {color: orderColorText}]}>
                Order type:{' '}
              </Text>
              <Text
                style={[styles.dashboardItemContent, {color: orderColorText}]}>
                {isDelivery || isPickup
                  ? 'Delivery'
                  : isPickup
                  ? 'Pickup'
                  : 'Unknown'}
              </Text>
            </View>
          )}
          {orderComments && (
            <View style={styles.dashboardItem}>
              <Text
                style={[styles.dashboardItemTitle, {color: orderColorText}]}>
                Comment:{' '}
              </Text>
              <Text
                style={[styles.dashboardItemContent, {color: orderColorText}]}>
                {orderComments}
              </Text>
            </View>
          )}

          <View style={styles.dashboardItem}>
            <Text style={[styles.dashboardItemTitle, {color: orderColorText}]}>
              Status:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {orderStatusText}
            </Text>
          </View>
          <View style={styles.dashboardItem}>
            <Text
              style={[
                styles.dashboardItemTitle,
                {fontWeight: '700'},
                {color: orderColorText},
              ]}>
              Next step:{' '}
            </Text>
            <Text
              style={[styles.dashboardItemContent, {color: orderColorText}]}>
              {orderStatusNext}
            </Text>
          </View>
        </View>

        <View style={styles.columnHeaders}>
          <Text style={styles.availabilityInfo}> </Text>
          <Text style={styles.itemTitle}>Item</Text>
          <Text style={styles.quantityTitle}>Qty </Text>
          <Text style={styles.priceTitle}> {'\u20B9'} </Text>
          {/* <Text style={styles.priceTitle}> </Text> */}
        </View>
      </View>
    );
  };

  //TODO / TOTEST
  useEffect(() => {
    // console.log(
    // 'in order items component. there are now ',
    // dataOrderItems.length,
    // ' items in this order',
    // );
  }, [dataOrderItems]);
  // console.log(
  //   'in order items component. dataorderitems is:>> ',
  //   dataOrderItems,
  // );

  const renderItem = ({item}) => {
    const {
      order_item_id: orderItemId,
      name: itemName,
      quantity: itemQuantity,
      price: itemPrice,
      available: itemAvailable,
      // customerComment: itemCustomerComment,
    } = item;

    return (
      <View style={styles.listItem}>
        <Pressable
          onPress={() => {
            setCurrentItem(item);
            setModalVisibleViewItem(true);
            setCurrentItemId(orderItemId);
            // console.log(
            //   '-----------------in order item component. order item id is ',
            //   orderItemId,
            // );
          }}>
          <View>
            <View style={styles.listRowItem}>
              <Text style={styles.availabilityInfo}>
                {itemAvailable !== null ? (
                  itemAvailable === true ? (
                    <Icon
                      type="fontAwesome"
                      name="check"
                      style={styles.checkMark}
                    />
                  ) : (
                    <Icon
                      type="fontAwesome"
                      name="remove"
                      style={styles.crossMark}
                    />
                  )
                ) : (
                  '?'
                )}
              </Text>

              <Text style={styles.itemInfo}>{itemName}</Text>
              <Text style={styles.quantityInfo}> {itemQuantity}</Text>
              <Text style={styles.priceInfo}>
                {' '}
                {itemPrice && (
                  <Text>
                    {'\u20B9'} {itemPrice}
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  return loadingGetOrderItems ? (
    <LoadingView />
  ) : (
    <>
      <View style={styles.dashboard}>
        {currentCodeNumber === 200 && (
          <View style={styles.dashboardItem}>
            <Text
              style={[
                styles.dashboardItemTitleFreeFlow,
                {color: !allItemsChecked ? colors.color3_4 : colors.color4_1},
              ]}>
              {!allItemsChecked
                ? 'PENDING ITEMS: ' +
                  JSON.stringify(dataOrderItems.length - checked) +
                  ' out of ' +
                  JSON.stringify(dataOrderItems.length)
                : 'ALL DONE. CONFIRM ORDER'}
            </Text>
          </View>
        )}

        <View style={styles.dashboardItem}>
          <Text style={[styles.dashboardItemTitleFreeFlow, styles.price]}>
            {checked}
          </Text>
          <Text style={styles.dashboardItemTitleFreeFlow}>
            {' '}
            items checked.{' '}
          </Text>
          <Text style={styles.dashboardItemTitleFreeFlow}>Total price: </Text>
          <Text style={[styles.dashboardItemTitleFreeFlow, styles.price]}>
            {total ? (
              <>
                <Icon
                  type="materialCommunity"
                  name="currency-inr"
                  style={styles.price}
                />
                {total}
              </>
            ) : (
              'Waiting..'
            )}
          </Text>
        </View>
      </View>

      <FlatList
        style={styles.list}
        data={dataOrderItems}
        // extraData={dataOrderItems.map(x => x.status_200_customer_sent)}
        keyExtractor={item => String(item.order_item_id)}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={ListItemSeparatorComponent}
      />

      <OrderItemsButtons />

      <ViewItem
        modalVisibleViewItem={modalVisibleViewItem}
        setModalVisibleViewItem={setModalVisibleViewItem}
        item={currentItem}
        orderId={orderId}
        orderItemId={currentItemId}
        currentCodeNumber={currentCodeNumber}
      />
    </>
  );
};

export default OrderItemsComponent;
