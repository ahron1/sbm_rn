import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ORDERITEMS, PROFILE} from '../../constants/routeNames';
import ListFooterComponent from '../common/ListFooter';
import FloatingCenterButton from '../common/FloatingCenterButton';
import addOrder from '../../context/actions/addOrder';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import getOrderStatus from '../../helpers/orderStatus';
import getDateTime from '../../helpers/dateTimeString';
import ListItemSeparatorComponentThick from '../common/ListItemSeparatorThick';
import Icon from '../common/Icon';
import LoadingView from '../LoadingView';

const AllOrdersComponent = ({
  dataAllOrders,
  loadingGetOrders,
  errorGetOrders,
}) => {
  // console.log('in all orders component. dataallorders is:> ', dataAllOrders);
  const {ordersDispatch, ordersState, authState} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  // console.log('in all orders. auth state is: ', authState);

  const AddCustomerButton = () => {
    return (
      <FloatingCenterButton
        buttonText="Add customer"
        iconType="feather"
        iconName="user-plus"
        // loading={ordersState.addOrder.loading}
        // disabled={ordersState.addOrder.loading}
        circleColor={colors.color3_4}
        iconColor={colors.color2_4}
        onPress={() => {
          console.log('in orders empty component. + button pressed');
          if (authState.latitude && authState.longitude) {
            // addOrderPressed();
          } else {
            Alert.alert(
              'Not logged in',
              'Please log in first to add customers.',

              [
                {
                  text: 'OK',
                  // onPress: () => navigate(PROFILE),
                },
              ],
            );
          }
        }}
      />
    );
  };

  const OrdersListEmptyComponent = () => {
    return (
      <>
        <View style={[styles.emptyListView]}>
          <View>
            <Text style={styles.emptyListText}>
              You don't have any orders.
              {'\n'}
              {'\n'}
              First add some customers.
              {'\n'}
              {'\n'}
              The more customers you have, the higher your store's ranking for
              new customers
            </Text>
          </View>
        </View>
        <View style={styles.emptyButtonSection}>
          <AddCustomerButton />
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.dashboard}>
        <View style={styles.dashboardItem}>
          <Text style={styles.dashboardItemTitleFreeFlow}>
            You have a total of {dataAllOrders.length} orders.
          </Text>
          <>
            {dataAllOrders.length > 0 ? (
              <Text style={styles.dashboardItemTitleFreeFlow}>
                Touch an order to view its details and take action.
              </Text>
            ) : (
              <Text style={styles.dashboardItemTitleFreeFlow}>
                Add some customers first.
              </Text>
            )}
          </>
        </View>
      </View>
    );
  };

  const renderItem = ({item: order}) => {
    // console.log('in all order component, order :>> ', order);
    // const {orderId, orderPrice, orderDate, status, orderRatingStars} =
    const {
      time_100_created,
      time_200_customer_sent,
      price: orderPrice,
      order_id: orderId,
      is_delivery: isDelivery,
      is_pickup: isPickup,
      store_name: storeName,
    } = order;

    const {
      orderStatusText: orderStatusText,
      orderStatusNext: orderStatusNext,
      orderColorCode: orderColorCode,
      orderStatusCode: orderStatusCode,
      orderColorText: orderColorText,
    } = getOrderStatus(order);

    const orderCreatedDateTime = getDateTime(new Date(time_100_created));
    const orderSentDateTime = getDateTime(new Date(time_200_customer_sent));
    //    const orderItemsPreview = orderItems.slice(0, previewItemsNumber).map(x => (
    //      <View key={x.id}>
    //        <Text>{x.name}, </Text>
    //      </View>
    //    ));

    return (
      <Pressable
        onPress={() => {
          navigate(ORDERITEMS, {
            orderId,
            // orderCreatedDateTime,
            // orderStatusText,
            // orderStatusNext,
            // orderColorCode,
            // orderStatusCode,
            // orderColorText,
          });
        }}>
        <View
          style={{
            backgroundColor: orderColorCode,
            color: orderColorText,
          }}>
          <View style={styles.listRow}>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                Order ID:{' '}
              </Text>
              <Text style={[styles.rowItemContent, {color: orderColorText}]}>
                {orderId}
              </Text>
            </View>

            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                Date:{' '}
              </Text>
              <Text style={[styles.rowItemContent, {color: orderColorText}]}>
                {orderCreatedDateTime > orderSentDateTime
                  ? orderCreatedDateTime
                  : orderSentDateTime}
              </Text>
            </View>
            {storeName && (
              <>
                <View style={styles.rowItem}>
                  <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                    Store:{' '}
                  </Text>
                  <Text
                    style={[styles.rowItemContent, {color: orderColorText}]}>
                    {storeName ? storeName : ''}
                  </Text>
                </View>
              </>
            )}
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                Status Code:{' '}
              </Text>
              <Text style={[styles.rowItemContent, {color: orderColorText}]}>
                {orderStatusCode}
              </Text>
            </View>
            {orderPrice && (
              <>
                <View style={styles.rowItem}>
                  <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                    Amount:
                  </Text>
                  <Text
                    style={[styles.rowItemContent, {color: orderColorText}]}>
                    <>
                      <Icon
                        type="materialCommunity"
                        name="currency-inr"
                        style={styles.rowItemContent}
                      />

                      {orderPrice}
                    </>
                  </Text>
                </View>
              </>
            )}

            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                Status:{' '}
              </Text>
              <Text style={[styles.rowItemContent, {color: orderColorText}]}>
                {orderStatusText}
              </Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitleBold, {color: orderColorText}]}>
                Next step:{' '}
              </Text>
              <Text style={[styles.rowItemContent, {color: orderColorText}]}>
                {orderStatusNext}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return loadingGetOrders ? (
    <LoadingView />
  ) : (
    <>
      <FlatList
        style={styles.list}
        data={dataAllOrders.sort((a, b) => a.order_id - b.order_id).reverse()}
        keyExtractor={item => item.order_id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={OrdersListEmptyComponent}
        ItemSeparatorComponent={ListItemSeparatorComponentThick}
        ListFooterComponent={ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent}
      />
      <AddCustomerButton />
    </>
  );
};

export default AllOrdersComponent;
