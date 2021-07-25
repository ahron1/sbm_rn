import {View} from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import Icon from '../../components/common/Icon';
import styles from './styles';
const getOrderStatus = order => {
  const {
    status_100_customer_started,
    status_200_customer_sent,
    status_300_store_checked,
    status_400_store_fulfilled,
    status_500_customer_received,
    status_600_payment_made,
    status_700_payment_received,
    // status_800_order_rated,
    status_900_order_complete,
  } = order;

  const {
    orderStatusText,
    orderStatusNext,
    orderColorCode,
    orderStatusCode,
    orderColorText,
  } =
    status_900_order_complete === true
      ? {
          orderStatusText: 'Order complete. Payment done.',
          orderStatusNext: 'Now earn rewards',
          orderColorCode: colors.color2_4,
          orderStatusCode: 'status_900_order_complete',
        }
      : // : status_800_order_rated === true
      // ? {
      // orderStatusText: 'Order Complete',
      // orderStatusNext: 'All done',
      // orderColorCode: 'lightblue',
      // orderStatusCode: 'status_800_order_rated,
      // }
      status_700_payment_received === true
      ? {
          orderStatusText: 'Order complete. Payment done.',
          orderStatusNext: 'Now earn rewards',
          orderColorCode: colors.color2_4,
          orderStatusCode: 'status_700_payment_received',
        }
      : status_600_payment_made === true
      ? {
          orderStatusText: 'Customer made payment',
          orderStatusNext: 'You have to confirm payment',
          orderColorCode: colors.color2_2,
          orderStatusCode: 'status_600_payment_made',
        }
      : status_500_customer_received === true
      ? {
          orderStatusText: 'Customer received items',
          orderStatusNext: 'Customer will make payment',
          orderColorCode: colors.grey,
          orderStatusCode: 'status_500_customer_received',
        }
      : status_400_store_fulfilled === true
      ? {
          orderStatusText: 'You fulfilled the order',
          orderStatusNext: 'Customer will make payment after confirming',
          // orderColorCode: colors.color2_1_2,
          orderColorCode: colors.grey,
          orderStatusCode: 'status_400_store_fulfilled',
        }
      : status_300_store_checked === true
      ? {
          orderStatusText: 'You will fulfil the order - delivery or pickup',
          orderStatusNext: 'Customer will make payment after receiving',
          orderColorCode: colors.color4_4,
          orderStatusCode: 'status_300_store_checked',
        }
      : status_200_customer_sent === true
      ? {
          orderStatusText: 'Customer sent the order',
          orderStatusNext: 'You will check prices and availability',
          orderStatusCode: 'status_200_customer_sent',
          orderColorCode: colors.color2_2_4,
          orderColorText: colors.color1_0,
        }
      : status_100_customer_started === true
      ? {
          orderStatusText: 'Customer started a new order',
          orderStatusNext: 'Customer will add items to order and send',
          orderColorCode: colors.color4_2,
          orderStatusCode: 'status_100_customer_started',
          orderColorText: colors.color2_4,
        }
      : {
          orderStatusText: 'Customer has yet to start',
          orderStatusNext: 'Customer has to start writing the new order',
          orderColorCode: 'black',
          orderStatusCode: 'status_000_order_not_started',
        };

  return {
    orderStatusText: orderStatusText,
    orderStatusNext: orderStatusNext,
    orderColorCode: orderColorCode,
    orderStatusCode: orderStatusCode,
    orderColorText: orderColorText,
  };
};

const getCurrentCodeNumber = status => {
  return Number(status.substr(7, 3));
};

const AllOrdersStatusIcon = codeNumber => {
  let statusIcon;
  switch (codeNumber.codeNumber) {
    case 700:
      statusIcon = (
        <>
          <View
            style={[
              styles.iconContainer,
              {
                borderColor: colors.color4_1,
                backgroundColor: colors.color4_3,
              },
            ]}>
            <Icon
              type="fa"
              name="check"
              style={[styles.iconXSmall, {color: colors.white}]}
            />
          </View>
        </>
      );
      break;
    case 600:
      statusIcon = (
        <>
          <View
            style={[
              styles.iconContainer,
              {
                borderColor: colors.color4_1,
                backgroundColor: colors.color3_3,
              },
            ]}>
            <Icon
              type="fontisto"
              name="inr"
              // style={[styles.iconXSmall, {color: colors.color3_3}]}
              style={[styles.iconXSmall, {color: colors.color2_2_4}]}
            />
          </View>
        </>
      );
      break;
    case 400:
      statusIcon = (
        <>
          <View
            style={[
              styles.iconContainer,
              {
                // borderColor: colors.color3_4,
                backgroundColor: colors.grey,
              },
            ]}>
            <Icon
              type="materialCommunity"
              name="account-clock"
              style={[styles.iconSmall, {color: colors.color1_0}]}
            />
          </View>
        </>
      );
      break;

    case 300:
      statusIcon = (
        <>
          <View
            style={[
              styles.iconContainer,
              {
                borderColor: colors.color3_4,
              },
            ]}>
            <Icon
              type="fontisto"
              name="shopping-bag-1"
              style={[styles.iconXSmall, {color: colors.color3_4}]}
            />
          </View>
        </>
      );
      break;

    case 200:
      statusIcon = (
        <>
          <View
            style={[
              styles.iconContainer,
              {
                borderColor: colors.color3_4,
              },
            ]}>
            <Icon
              type="material"
              name="receipt-long"
              style={[styles.iconSmall, {color: colors.color3_2}]}
            />
          </View>
        </>
      );
      break;

    default:
      statusIcon = (
        <>
          <View
            style={[
              styles.iconContainer,
              {
                // borderColor: colors.color3_4,
                backgroundColor: colors.grey,
              },
            ]}>
            <Icon
              type="entypo"
              name="hour-glass"
              style={[styles.iconSmall, {color: colors.color1_0}]}
            />
          </View>
        </>
      );

      break;
  }
  return statusIcon;
};

export default getOrderStatus;
export {AllOrdersStatusIcon, getCurrentCodeNumber};
