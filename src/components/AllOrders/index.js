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
import {CUSTOMERS, ORDERITEMS, PROFILE} from '../../constants/routeNames';
import ListFooterComponent from '../common/ListFooter';
import FloatingCenterButton from '../common/FloatingCenterButton';
import {GlobalContext} from '../../context/Provider';
import styles from './styles';
import colors from '../../assets/theme/colors';
import getOrderStatus, {
  AllOrdersStatusIcon,
  getCurrentCodeNumber,
} from '../../helpers/orderStatus';
import getDateTime from '../../helpers/dateTimeString';
import ListItemSeparatorComponentThick from '../common/ListItemSeparatorThick';
import Icon from '../common/Icon';
import LoadingView from '../LoadingView';
import AddCustomer from '../AddCustomer';

const AllOrdersComponent = ({
  dataAllOrders,
  loadingGetOrders,
  errorGetOrders,
}) => {
  const [modalVisibleAddCustomer, setModalVisibleAddCustomer] = useState(false);
  // console.log('in all orders component. dataallorders is:> ', dataAllOrders);
  const {authState} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  // console.log('in all orders. auth state is: ', authState);

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
        <View style={styles.emptyButtonSection} />
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.dashboard}>
        <View style={styles.dashboardItem}>
          <View style={styles.dashboardItemGroup}>
            <Text style={styles.dashboardItemTitle}>
              You have a total of {dataAllOrders.length} orders.
            </Text>
          </View>
          <>
            {dataAllOrders.length > 0 ? (
              <Text style={styles.dashboardItemTitleItalic}>
                Touch any order to view its details and take action.
              </Text>
            ) : (
              <Text style={styles.dashboardItemTitle}>
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
      customer_name: customerName,
      customer_mobile_number: customerMobileNumber,
      customer_address_line1: customerAddressLine1,
      customer_address_line2: customerAddressLine2,
      customer_pincode: customerPincode,
      customer_note: customerNote,
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

    return (
      <Pressable
        onPress={() => {
          navigate(ORDERITEMS, {
            orderId,
            customerName,
          });
        }}>
        <View
          style={{
            backgroundColor: orderColorCode,
            color: orderColorText,
          }}>
          <View style={styles.listRow}>
            <View style={styles.sectionWithIcon}>
              <View style={styles.rowWithIcon}>
                <View style={styles.rowItem}>
                  <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                    Order ID:{' '}
                  </Text>
                  <Text
                    style={[styles.rowItemContent, {color: orderColorText}]}>
                    {orderId}
                  </Text>
                </View>

                <View style={styles.rowItem}>
                  <Text style={[styles.rowItemTitle, {color: orderColorText}]}>
                    Date:{' '}
                  </Text>
                  <Text
                    style={[styles.rowItemContent, {color: orderColorText}]}>
                    {orderCreatedDateTime > orderSentDateTime
                      ? orderCreatedDateTime
                      : orderSentDateTime}
                  </Text>
                </View>
              </View>

              <AllOrdersStatusIcon
                codeNumber={getCurrentCodeNumber(orderStatusCode)}
              />
            </View>

            <View style={styles.rowItem}>
              <Text style={[styles.rowItemTitleBold, {color: orderColorText}]}>
                Customer:
              </Text>
              <Text
                style={[styles.rowItemContentBold, {color: orderColorText}]}>
                {customerName}
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

      <FloatingCenterButton
        buttonText="Customers"
        iconType="ionicon"
        iconName="md-people-outline"
        circleColor={colors.color3_4}
        iconColor={colors.color2_4}
        onPress={() => {
          // console.log('in orders empty component. + button pressed');
          if (authState.latitude && authState.longitude) {
            // setModalVisibleAddCustomer(true);
            navigate(CUSTOMERS);
          } else {
            Alert.alert(
              'Not logged in',
              'Please log in first to add customers.',

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
};

export default AllOrdersComponent;
