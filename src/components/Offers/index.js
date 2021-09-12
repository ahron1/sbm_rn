import React, {useContext, useState} from 'react';
import styles from './styles';
import {
  Alert,
  FlatList,
  Linking,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../../components/common/Icon';
import {GlobalContext} from '../../context/Provider';
import FloatingLeftButton from '../common/FloatingLeftButton';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/theme/colors';
import {CUSTOMERS, PROFILE} from '../../constants/routeNames';
import AddCustomer from '../AddCustomer';
import CustomButtonMedium from '../common/CustomButtonMedium';
import FloatingRightButton from '../common/FloatingRightButton';

const OffersComponent = () => {
  const {authState} = useContext(GlobalContext);
  const {navigate} = useNavigation();
  const [modalVisibleAddCustomer, setModalVisibleAddCustomer] = useState(false);
  let customerView;

  const offersData = [
    {
      id: 1,
      name: 'foo',
      quantity: '100g',
      regularPrice: '100',
      offerPrice: '80',
      active: true,
    },
    {
      id: 2,
      name: 'bar',
      quantity: '100g',
      regularPrice: '200',
      offerPrice: '180',
      active: true,
    },
  ];

  const ListHeaderComponent = () => {
    return (
      <View>
        <View style={styles.columnHeaders}>
          <Text style={styles.availabilityInfo}> </Text>
          <Text style={styles.itemTitle}>Item</Text>
          <Text style={styles.quantityTitle}>Qty </Text>
          <Text style={styles.priceTitle}>Price</Text>
          <Text style={styles.priceTitle}>Offer</Text>
          {/* <Text style={styles.priceTitle}> </Text> */}
        </View>
      </View>
    );
  };

  const renderItem = ({item}) => {
    const {
      id: offerItemId,
      name: itemName,
      quantity: itemQuantity,
      regularPrice: regularPrice,
      offerPrice: offerPrice,
      active: offerActive,
      // customerComment: itemCustomerComment,
    } = item;
    console.log(
      'in offer items component render item. item id is:  > ',
      offerItemId,
    );

    return (
      <View style={styles.listItem}>
        <Pressable
          onPress={() => {
            // setCurrentItem(item);
            // setModalVisibleViewItem(true);
            // setCurrentItemId(orderItemId);
            console.log('-----------------in offers component. ');
          }}>
          <View>
            <View style={styles.listRowItem}>
              <Text style={styles.availabilityInfo}>
                {offerActive !== null ? (
                  offerActive === true ? (
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
                {regularPrice && (
                  <Text>
                    {'\u20B9'} {regularPrice}
                  </Text>
                )}
              </Text>
              <Text style={styles.priceInfo}>
                {' '}
                {offerPrice && (
                  <Text>
                    {'\u20B9'} {offerPrice}
                  </Text>
                )}
              </Text>
            </View>
          </View>
        </Pressable>
      </View>
    );
  };

  if (authState.latitude && authState.longitude) {
    customerView = (
      <>
        <View style={styles.container}>
          <Text style={styles.headerText}>
            Make special offers for your customers.
          </Text>
          <View styles={styles.loadingTextIndicator}>
            {/* <Text style={styles.loadingText}>
              You will be eligible to make special offers after doing regular
              business for 3 months.
            </Text> */}
            <Text style={styles.headerText}>
              We will promote offers for customers of high ranked stores.
            </Text>
          </View>
        </View>

        <FlatList
          style={styles.list}
          data={offersData}
          extraData={offersData.map(x => x.active)}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          // ListFooterComponent={ListFooterComponent}
          // ListEmptyComponent={ListEmptyComponent}
          // ItemSeparatorComponent={ListItemSeparatorComponent}
        />

        <FloatingLeftButton
          buttonText="Add offer"
          iconType="fa"
          iconName="plus"
          circleColor={colors.color2_2_4}
          iconColor={colors.color1_3}
          onPress={() => {}}
        />

        <FloatingRightButton
          buttonText="Broadcast"
          iconType="fa"
          iconName="bullhorn"
          circleColor={colors.color3_4}
          iconColor={colors.color2_4}
          onPress={() => {
            // console.log('in orders empty component. + button pressed');
            if (authState.latitude && authState.longitude) {
              // setModalVisibleAddCustomer(true);
              // navigate(CUSTOMERS);
              const storeName = authState.userName;
              // console.log('in component offers. ', storeName);
              const message =
                'Namaskar, ' +
                ' \n\n' +
                storeName +
                ' is now on Storebhai! ' +
                ' \n\nSo please use the Storebhai app and send your orders to ' +
                storeName +
                '. It is very easy and a better experience.' +
                ' \n\nInstall the Storebhai app from this link now: ' +
                ' \n' +
                ' http://play.google.com/store/apps/details?id=com.storebhai.android_user_app ' +
                '\n\n' +
                storeName +
                ' looks forward to serving your orders on Storebhai.' +
                '\n\n' +
                'StayHomeStaySafe, \n' +
                storeName;
              Linking.openURL(
                // 'whatsapp://send?text=' + message + '&phone=91' + formNumberClean,
                'whatsapp://send?text=' + message,
              );
            } else {
              Alert.alert(
                'Not logged in',
                'Please log in first.',

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
  } else {
    // console.log('in stores component. address not yet updated .');
    customerView = (
      <View style={styles.emptyContainer}>
        <View styles={styles.emptyTextIndicator}>
          <Text style={styles.emptyText}>
            Please first update your address on the profile page.
          </Text>
        </View>
        <View style={styles.buttonSection}>
          <CustomButtonMedium
            style={styles.button}
            backgroundColor={colors.color1_4}
            primary
            title="OK"
            onPress={() => {
              navigate(PROFILE);
            }}
          />
        </View>
      </View>
    );
  }

  return customerView;
};

export default OffersComponent;
