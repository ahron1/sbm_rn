import React, {useContext, useState} from 'react';
import {Alert, FlatList, Linking, Pressable, Text, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {GlobalContext} from '../../context/Provider';
import CustomButtonMedium from '../common/CustomButtonMedium';
import LoadingView from '../LoadingView';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {PROFILE} from '../../constants/routeNames';
import ListItemSeparatorComponentThick from '../common/ListItemSeparatorThick';
import AddCustomer from '../AddCustomer';
import FloatingCenterButton from '../common/FloatingCenterButton';
import ListFooterComponent from '../common/ListFooter';
import Icon from '../common/Icon';

const CustomersComponent = ({
  dataGetCustomers,
  loadingGetCustomers,
  errorGetCustomers,
}) => {
  const [modalVisibleAddCustomer, setModalVisibleAddCustomer] = useState(false);
  const {navigate} = useNavigation();
  const {authState} = useContext(GlobalContext);
  let customerView;

  const renderItem = ({item}) => {
    const customerName = item.customer_name;
    const customerNumber = item.customer_mobile_number;
    return (
      <Pressable
        onPress={() => {
          // console.log('contact touched ', customerName);
          Alert.alert(customerName, 'Number: ' + customerNumber, [
            {
              text: 'Cancel',
            },
            {
              text: 'Call',
              onPress: () => {
                Linking.openURL(`tel:${customerNumber}`);
              },
            },
            {
              text: 'WhatsApp',
              onPress: () => {
                Linking.openURL(
                  'whatsapp://send?text=' +
                    'Namaskar, ' +
                    customerName +
                    '. I want to update about .... ',
                );
              },
            },
          ]);
        }}>
        <View>
          <View style={[styles.listRow]}>
            <Text style={[styles.rowItemContentBold]}> {customerName}</Text>
          </View>

          <View style={styles.listRow}>
            <View style={styles.rowItem}>
              <Text style={[styles.rowItemContent]}>{customerNumber} </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const ListEmptyComponent = () => {
    return (
      <>
        <View>
          <View style={styles.emptyListView}>
            <Text style={styles.emptyListText}>
              You currently have no customers.
            </Text>
            <Text style={styles.emptyListText}>
              Add some customers to start getting orders.
            </Text>
            <Text style={styles.emptyListText}>
              We will promote and advertise your store to new customers after
              you get good review from your old customers.
            </Text>
          </View>
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.dashboardItem}>
        <View style={styles.dashboardIcon}>
          <Icon type="entypo" name="info-with-circle" style={styles.icon} />
        </View>
        <View style={styles.dashboardDesc}>
          <View style={styles.headerDashboard}>
            <View style={styles.dashboardItem}>
              <View>
                <Text style={styles.headerDashboardItemTitle}>Next rank: </Text>
              </View>
              <View>
                <Text style={[styles.headerDashboardItemContent]}>
                  {getStoreRank(dataGetCustomers.length).nextRank}
                  {/* {getStoreRank(2)} */}
                </Text>
              </View>
            </View>
            <View style={styles.dashboardItem}>
              <View>
                <Text style={[styles.headerDashboardItemTitle]}>
                  To reach the next level, you need{' '}
                  {getStoreRank(dataGetCustomers.length).nextNumber -
                    dataGetCustomers.length}{' '}
                  more customers.
                </Text>
                <Text style={[styles.headerDashboardItemTitleItalic]}>
                  {'\n'}Higher ranked stores earn more points on every order.
                  These points can be used for marketing and advertising of your
                  store. Your points will be activated after doing business on
                  the app for 3 months.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const getStoreRank = n => {
    const rankNumbersArray = [0, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
    const badgeColorsArray = [
      'silver',
      'gold',
      'silver',
      'gold',
      'silver',
      'gold',
      'silver',
      'gold',
      'silver',
      'gold',
    ];
    const badgesArray = [
      {type: 'materialCommunity', name: 'seal'},
      {type: 'materialCommunity', name: 'seal'},
      {type: 'materialCommunity', name: 'medal'},
      {type: 'materialCommunity', name: 'medal'},
      {type: 'materialCommunity', name: 'police-badge'},
      {type: 'materialCommunity', name: 'police-badge'},
      {type: 'fa5', name: 'certificate'},
      {type: 'fa5', name: 'certificate'},
      {type: 'materialCommunity', name: 'trophy-award'},
      {type: 'materialCommunity', name: 'trophy-award'},
    ];
    const rankNumber = rankNumbersArray.findIndex(x => x >= n);
    const ranksArray = [
      'Just Opened',
      'New Store',
      'Mini Store',
      'Corner Shop',
      'Neighborhood Store',
      'Top Store',
      'Mega Store',
      'Super Store',
      'Local Leader',
    ];
    const storeRank = ranksArray[rankNumber];
    const nextRank = ranksArray[rankNumber + 1];
    const nextNumber = rankNumbersArray[rankNumber] + 1;
    const badge = badgesArray[rankNumber];
    const badgeColor = badgeColorsArray[rankNumber];
    return {
      storeRank: storeRank,
      nextRank: nextRank,
      nextNumber: nextNumber,
      badge: badge,
      badgeColor: badgeColor,
    };
  };

  if (authState.latitude && authState.longitude) {
    if (loadingGetCustomers) {
      customerView = <LoadingView />;
    } else if (!loadingGetCustomers) {
      customerView = (
        <>
          <View style={styles.dashboard}>
            <View style={styles.dashboardItem}>
              <View style={styles.dashboardDesc}>
                <View style={styles.dashboard}>
                  <View style={styles.dashboardItem}>
                    <View>
                      <Text style={styles.dashboardItemTitle}>You have </Text>
                    </View>
                    <View>
                      <Text style={[styles.dashboardItemContent]}>
                        {dataGetCustomers.length}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.dashboardItemTitle}> customers.</Text>
                    </View>
                  </View>
                  <View style={styles.dashboardItem}>
                    <View>
                      <Text style={styles.dashboardItemTitle}>
                        Current rank:{' '}
                      </Text>
                    </View>
                    <View>
                      <Text style={[styles.dashboardItemContent]}>
                        {getStoreRank(dataGetCustomers.length).storeRank}
                        {/* {getStoreRank(2)} */}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.dashboardIcon2}>
                <View style={styles.badgeCircle}>
                  <Icon
                    type={getStoreRank(dataGetCustomers.length).badge.type}
                    name={getStoreRank(dataGetCustomers.length).badge.name}
                    style={[
                      styles.badge,
                      {color: getStoreRank(dataGetCustomers.length).badgeColor},
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
          <FlatList
            data={dataGetCustomers}
            renderItem={renderItem}
            keyExtractor={item => String(item.customer_mobile_number)}
            ItemSeparatorComponent={ListItemSeparatorComponentThick}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={ListFooterComponent}
            ListHeaderComponent={ListHeaderComponent}
          />
          <FloatingCenterButton
            buttonText="New customer"
            iconType="feather"
            iconName="user-plus"
            circleColor={colors.color3_4}
            iconColor={colors.color2_4}
            onPress={() => {
              // console.log('in orders empty component. + button pressed');
              if (authState.latitude && authState.longitude) {
                setModalVisibleAddCustomer(true);
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
    }
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

export default CustomersComponent;
