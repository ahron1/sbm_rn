import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {Alert, Text, View, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {GlobalContext} from '../../context/Provider';
import addressLog, {setGeoAddressHelper} from '../../helpers/geoHelpers';
import AddressForm from '../AddressForm';
import NameForm from '../NameForm';
import logOut from '../../context/actions/auth/logOut';
import credUpdate from '../../context/actions/auth/credUpdate';
import styles from './styles';
import Container from '../common/Container';
import CustomButtonSmall from '../common/CustomButtonSmall';
import colors from '../../assets/theme/colors';
import StoreServicesForm from '../StoreServicesForm';

Geocoder.init('AIzaSyBw1Ua3oGDMs8WwJyNXLRkpsJSq6Vup0bo'); // use a valid API key

const ProfileComponent = () => {
  const [modalVisibleAddAddress, setModalVisibleAddAddress] = useState(false);
  const [modalVisibleAddName, setModalVisibleAddName] = useState(false);
  const [modalVisibleStoreServices, setModalVisibleStoreServices] =
    useState(false);
  const [loadingEditAddress, setLoadingEditAddress] = useState(false);

  const [geoAddress, setGeoAddress] = useState({});
  const [systemLocation, setSystemLocation] = useState(0);

  const {authDispatch, authState} = useContext(GlobalContext);
  const firebaseUid = authState.firebaseUid;
  const userName = authState.userName;
  const addressLine1 = authState.addressLine1;
  const addressLine2 = authState.addressLine2;
  const city = authState.city;
  const state = authState.state;
  const pincode = authState.pincode;
  const addressAvailable =
    addressLine1 && addressLine2 && city && state && pincode;
  const mobileNumber = authState.mobileNumber;
  const deliveryRadius = authState.deliveryRadius;
  const offersPickup = authState.offersPickup;
  const offersDelivery = authState.offersDelivery;

  const setLoadingEditAddressWrapper = x => {
    setLoadingEditAddress(x);
  };

  const geoAddressFromCoordinates = async ({latitude, longitude}) => {
    Geocoder.from(latitude, longitude)
      .then(json => {
        var addressComponent = json.results[0].address_components;
        addressLog(addressComponent);
        console.log('address component is:>> ', '\n', addressComponent);
        setGeoAddress({});

        const setGeoAddressWrapper = (key, value) => {
          setGeoAddress(prevState => ({...prevState, [key]: value}));
        };

        setGeoAddressHelper({
          addressComponent: addressComponent,
          setGeoAddressWrapper: setGeoAddressWrapper,
        });
      })
      .catch(error => {
        setLoadingEditAddress(false);
        console.log('error getting address from coordinates', error);
      });
  };

  const processLocation = userLocation => {
    if (userLocation) {
      console.log('current location is ', userLocation);
      var latitude = JSON.parse(JSON.stringify(userLocation)).latitude;
      var longitude = JSON.parse(JSON.stringify(userLocation)).longitude;
      var accuracy = JSON.parse(JSON.stringify(userLocation)).accuracy;
      setSystemLocation({
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
      });

      geoAddressFromCoordinates({latitude, longitude});
      setModalVisibleAddAddress(true);
    } else {
      setModalVisibleAddAddress(true);
    }
  };

  const getAndSetLocation = async () => {
    setLoadingEditAddress(true);
    console.log('in getandsetlocation. getting location now :>> ');
    // const userLocation = await RNLocation.getLatestLocation({timeout: 10000});

    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        processLocation(position.coords);
        // processLocation({});
      },
      error => {
        setLoadingEditAddress(false);
        Alert.alert(
          'Problem getting location',
          'We could not get your location. Please restart the app and try again.\n\nOr you can just enter it manually.',
          [
            {
              text: 'Continue',
              onPress: () => processLocation({}),
            },
          ],
        );

        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
        forceRequestLocation: true,
      },
    );
  };

  const locationHandler = async () => {
    try {
      console.log(' in locationhandler. asking for permission ');
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permission to Check Location',
          message:
            'Storebhai needs access to your location ' +
            'once to check for stores in your area',
          // buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('just got permission ', granted);
        getAndSetLocation();
      } else {
        setLoadingEditAddress(false);
        Alert.alert(
          'Unable to proceed',
          'We are unable to proceed since we do not have permission to access your location. \n\nPlease contact us if this is a mistake.',
        );
      }
    } catch (err) {
      setLoadingEditAddress(false);
      console.warn(err);
    }
  };

  const locationPermissionHandler = async () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        // console.log('in RNAndroidLocationEnabler. data is:> ', data);
        setLoadingEditAddress(true);
        locationHandler();
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      })
      .catch(err => {
        setLoadingEditAddress(false);
        console.log(
          'in RNAndroidLocationEnabler. err is:> ',
          err.code,
          err.message,
        );
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      });
  };

  return (
    <>
      <Container>
        <View>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Store Name</Text>

            <CustomButtonSmall
              style={styles.button}
              primary
              title="Edit"
              loading={authState.userNameUpdate.loading}
              disabled={authState.userNameUpdate.loading}
              onPress={() => {
                setModalVisibleAddName(true);
              }}
            />
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionText}>
              {userName !== null ? (
                <View>
                  <View>
                    {/* <Text style={styles.bodyText}>{storedName}</Text> */}
                    <Text style={styles.bodyText}>{userName}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.emptySectionText}>
                    You have not saved your store's name. Please update the name
                    of your store.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Mobile Number</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionText}>
              {mobileNumber !== null ? (
                <View>
                  <View>
                    <Text style={styles.bodyText}>
                      {mobileNumber.slice(-10)}
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.emptySectionText} />
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Store Services</Text>

            <CustomButtonSmall
              style={styles.button}
              primary
              title="Edit"
              // loading={authState.storeServicesUpdate.loading}
              // disabled={authState.storeServicesUpdate.loading}
              onPress={() => {
                setModalVisibleStoreServices(true);
              }}
            />
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionText}>
              {deliveryRadius !== null &&
              offersDelivery !== null &&
              offersPickup !== null ? (
                <View>
                  <View style={styles.profileDetail}>
                    <Text style={styles.profileDetailTitle}>Delivery:</Text>
                    <Text style={styles.profileDetailContent}>
                      {offersDelivery ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View style={styles.profileDetail}>
                    <Text style={styles.profileDetailTitle}>Pickup:</Text>
                    <Text style={styles.profileDetailContent}>
                      {offersPickup ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View style={styles.profileDetail}>
                    <Text style={styles.profileDetailTitle}>
                      Service Radius:
                    </Text>
                    <Text style={styles.profileDetailContent}>
                      {deliveryRadius} km
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.emptySectionText}>
                    You have not updated your store's service radius or service
                    details. Please update.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View>
          <View style={styles.sectionTitle}>
            <Text style={styles.titleText}>Store Address</Text>

            <CustomButtonSmall
              style={styles.loadableButton}
              title="Edit"
              disabled={loadingEditAddress}
              loading={loadingEditAddress}
              backgroundColor={colors.color4_1_2}
              onPress={() => {
                locationPermissionHandler();
                // setModalVisibleAddAddress(true);
              }}
            />
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionText}>
              {/* {storedAddress !== null ? ( */}
              {addressAvailable !== null ? (
                <View>
                  <View>
                    <Text style={styles.bodyText}>{addressLine1}</Text>
                    <Text style={styles.bodyText}>{addressLine2}</Text>
                    <Text style={styles.bodyText}>{city}</Text>
                    <Text style={styles.bodyText}>{state}</Text>
                    <Text style={styles.bodyText}>{pincode}</Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={styles.emptySectionText}>
                    You have no saved address.{'\n'}Please add an address.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View>
          <View style={styles.logoutButtonSection}>
            <CustomButtonSmall
              style={styles.logoutButton}
              tertiary
              disabled={authState.logOut.loading}
              loading={authState.logOut.loading}
              title="Signout"
              onPress={() => logOut()(authDispatch)}
            />
          </View>
        </View>
        <View>
          <AddressForm
            modalVisibleAddAddress={modalVisibleAddAddress}
            setModalVisibleAddAddress={setModalVisibleAddAddress}
            // setStoredAddress={setStoredAddress}
            // firebaseUid={firebaseUid}
            geoAddress={geoAddress}
            setLoadingEditAddressWrapper={setLoadingEditAddressWrapper}
            systemLocation={systemLocation}
            // geoPincode={geoAddress.geoPincode}
            // geoCity={geoAddress.geoCity}
            // geoState={geoAddress.geoState}
          />
        </View>
        <View>
          <NameForm
            modalVisibleAddName={modalVisibleAddName}
            setModalVisibleAddName={setModalVisibleAddName}
            // setStoredName={setStoredName}
            firebaseUid={firebaseUid}
            currentUserName={userName}
          />
        </View>
        <View>
          <StoreServicesForm
            modalVisibleStoreServices={modalVisibleStoreServices}
            setModalVisibleStoreServices={setModalVisibleStoreServices}
            // setStoredName={setStoredName}
            firebaseUid={firebaseUid}
            currentUserName={userName}
            // deliveryRadius={deliveryRadius}
            // offersDelivery={offersDelivery}
            // offersPickup={offersPickup}
          />
        </View>
      </Container>
    </>
  );
};

export default ProfileComponent;
