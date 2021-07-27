import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ViewItem from '../ViewItem';
import AddItem from '../AddItem';
import FloatingLeftButton from '../common/FloatingLeftButton';
import FloatingRightButton from '../common/FloatingRightButton';
import FloatingCenterButton from '../common/FloatingCenterButton';
import ListFooterComponent from '../common/ListFooter';
import styles from './styles';
import colors from '../../assets/theme/colors';
import Icon from '../../components/common/Icon';
import ListItemSeparatorComponent from '../common/ListItemSeparator';
import {ALLORDERS, ORDERSTATUS, STORES} from '../../constants/routeNames';
import {GlobalContext} from '../../context/Provider';
import deleteOrder from '../../context/actions/deleteOrder';
import getOrderStatus from '../../helpers/orderStatus';
import LoadingView from '../LoadingView';
import getDateTime from '../../helpers/dateTimeString';
import confirmOrder from '../../context/actions/confirmOrder';
import confirmFulfil from '../../context/actions/confirmFulfil';
import confirmPayment from '../../context/actions/confirmPayment';

// const OrderItemsComponent = ({orderStatusDetails, dataOrderItems}) => {
const OrderItemsComponent = ({
  orderId,
  dataOrderItems,
  loadingGetOrderItems,
}) => {
  const {ordersDispatch, ordersState} = useContext(GlobalContext);
  const [currentItem, setCurrentItem] = useState({});
  const [currentItemId, setCurrentItemId] = useState(null);
  const [modalVisibleViewItem, setModalVisibleViewItem] = useState(false);
  const [modalVisibleAddItem, setModalVisibleAddItem] = useState(false);
  const {navigate} = useNavigation();

  // const {
  // orderId,
  // orderCreatedDateTime,
  // orderStatusText,
  // orderStatusNext,
  // orderColorCode,
  // orderStatusCode,
  // } = orderStatusDetails;
  //

  const [order] = ordersState.getOrders.data.filter(
    x => x.order_id === orderId,
  );

  console.log(
    'in orderitems component. orders state is:>> ',
    // ordersState.getOrders.data.filter(x => x.order_id === orderId),
    order,
  );

  const {
    time_100_created,
    time_200_customer_sent,
    price: orderPrice,
    is_delivery: isDelivery,
    is_pickup: isPickup,
    store_name: storeName,
    store_id: storeId,
    customer_note: orderComments,
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
  console.log(
    'in order items. order status code is :> ',
    orderStatusCode,
    'number is ',
    currentCodeNumber,
  );
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

  const OrderItemsButtons = () => {
    console.log(
      'in order items component. orderstatuscode is:>> ',
      orderStatusCode,
      orderStatusText,
    );
    var buttons;
    switch (orderStatusCode) {
      case 'status_900_order_complete':
        console.log('in order items component. buttons func. status 500');
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

      case 'status_700_payment_received':
        console.log('in order items component. buttons func. status 500');
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
                      ' I want to ask about the rewards program.' +
                      '&phone=91' +
                      '8883672999',
                  );
                }}
              />
            </View>
          </View>
        );
        break;

      /*
      case 'status_600_payment_made':
        console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Check status"
                iconType="ant"
                iconName="questioncircle"
                circleColor={colors.color4_2}
                iconColor={colors.color2_4}
                onPress={() => {
                  console.log('in order items component. check status pressed');
                  navigateOrderStatus();
                }}
              />
            </View>
          </View>
        );
        break;
        */

      case 'status_600_payment_made':
      case 'status_500_customer_received':
      case 'status_400_store_fulfilled':
        console.log('in order items component. buttons func. status 500');
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Confirm payment"
                iconType="fontisto"
                iconName="inr"
                iconColor={colors.color2_2_4}
                circleColor={colors.color3_4}
                onPress={() => {
                  console.log(
                    'in order items component. payment confirm pressed. ',
                  );
                  confirmPayment({
                    orderId,
                  })(ordersDispatch)(() => {
                    console.log(
                      'in order items components. payment confirmed . going back to all orders',
                    );
                    Alert.alert(
                      'Confirm payment    ₹ ' + total,
                      'Thank you for completing the order.' +
                        '\n\nAfter receiving payment from the customer, press OK to confirm.' +
                        '\n\nIf you have not yet received the payment, press Cancel',
                      [
                        {
                          text: 'Cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            navigate(ALLORDERS);
                            // console.log('OKKKKK');
                          },
                        },
                      ],
                    );
                  });
                }}
              />
            </View>
          </View>
        );
        break;

      /*
      case 'status_400_store_fulfilled':
      case 'status_300_store_checked':
        buttons = (
          <View>
            <View>
              <FloatingCenterButton
                buttonText="Received items"
                iconType="fa5"
                iconName="check-circle"
                circleColor={colors.color4_2}
                iconColor={colors.color2_4}
                onPress={() => {
                  console.log(
                    'in order items component. order received pressed',
                  );
                  setModalVisibleReceivedOrder(true);
                }}
              />
            </View>
          </View>
        );
        break;
        */

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
                onPress={() => {
                  console.log(
                    'in order items component. order fulfilled pressed. ',
                  );
                  confirmFulfil({
                    orderId,
                  })(ordersDispatch)(() => {
                    console.log(
                      'in order items components. confirmed order fulfillment. going back to all orders',
                    );
                    Alert.alert(
                      'Order fulfillment',
                      'Thank you for fulfilling the order.' +
                        '\n\nAfter handing over the items to the customer, press OK to confirm.' +
                        '\n\nIf you have not yet given the items to the customer, press Cancel',
                      [
                        {
                          text: 'Cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            navigate(ALLORDERS);
                          },
                        },
                      ],
                    );
                  });
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
                buttonText="Check status"
                iconType="ant"
                iconName="questioncircle"
                iconColor={colors.color2_4}
                circleColor={colors.color4_2}
                onPress={() => {
                  console.log(
                    'in order items component. check status pressed. order status code is:>> ',
                    orderStatusCode,
                  );
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
                onPress={() => {
                  console.log(
                    'in order items component. confirm order pressed. ',
                  );
                  confirmOrder({
                    orderId,
                  })(ordersDispatch)(() => {
                    console.log(
                      'in order items components. successfully confirmed order . going back to all orders',
                    );
                    Alert.alert(
                      'Order Confirmed',
                      'Thank you for confirming the order.' +
                        '\n\nPlease give the items to the customer as soon as possible.',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            navigate(ALLORDERS);
                          },
                        },
                      ],
                    );
                  });
                }}
              />
            </View>
          </View>
        );
        break;

      // IMP - the default case is called on newly created orders.
      // default case is same as for status_100_customer_started
      // .. compare the navigate(ORDERITEMS) func in addOrderPressed with the
      // .. onPress function in the renderItem pressable in AllOrdersComponent
      // todo - this is very hackish. fix it so new orders get the right status.
      default:
        console.log('in order items component. buttons func. status default');
        if (dataOrderItems.length > 0) {
          buttons = (
            <View>
              <View>
                <FloatingRightButton
                  buttonText="Send order"
                  iconType="fontAwesome"
                  iconName="send"
                  circleColor={colors.color4_3}
                  // iconColor={colors.color1_2}
                  iconColor={colors.color2_4}
                  onPress={() => {
                    console.log(
                      'in order items component send button. order id is:>> ',
                      orderId,
                    );
                    navigate(STORES, {orderId: orderId});
                  }}
                />
                <FloatingLeftButton
                  buttonText="Add item"
                  iconType="materialCommunity"
                  // iconName="cart-arrow-down"
                  iconName="cart-plus"
                  circleColor={colors.color2_2_4}
                  iconColor={colors.color1_3}
                  onPress={() => {
                    console.log('in order items component. + pressed');
                    setModalVisibleAddItem(true);
                  }}
                />
              </View>
            </View>
          );
        } else {
          buttons = (
            <View>
              <View>
                <FloatingRightButton
                  buttonText="Delete order"
                  iconType="materialCommunity"
                  // iconName="cart-off"
                  iconName="playlist-remove"
                  circleColor={colors.color3_2}
                  iconColor={colors.color2_3}
                  loading={ordersState.deleteOrder.loading}
                  disabled={ordersState.deleteOrder.loading}
                  onPress={() => {
                    console.log('in order items component. delete pressed');
                    deleteOrder({orderId})(ordersDispatch)(() => {
                      console.log('in order items components. deleted order');
                      navigate(ALLORDERS);
                    });
                  }}
                />
                <FloatingLeftButton
                  buttonText="Add item"
                  iconType="materialCommunity"
                  // iconName="cart-arrow-down"
                  iconName="cart-plus"
                  circleColor={colors.color2_2_4}
                  iconColor={colors.color1_3}
                  onPress={() => {
                    console.log('in order items component. + pressed');
                    setModalVisibleAddItem(true);
                  }}
                />
              </View>
            </View>
          );
        }
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
    return (
      <View>
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
    console.log(
      'in order items component. there are now ',
      dataOrderItems.length,
      ' items in this order',
    );
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
      />
      <AddItem
        modalVisibleAddItem={modalVisibleAddItem}
        setModalVisibleAddItem={setModalVisibleAddItem}
        orderId={orderId}
      />
    </>
  );
};

export default OrderItemsComponent;
