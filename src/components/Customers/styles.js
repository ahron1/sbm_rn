import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  wrapper: {},

  dashboard: {
    paddingHorizontal: '20@s',
    paddingVertical: '9@s',
    // minHeight: '100@s',
    backgroundColor: colors.color4_3,
  },
  headerDashboard: {
    paddingHorizontal: '20@s',
    paddingVertical: '9@s',
    // minHeight: '100@s',
    backgroundColor: colors.grey,
  },

  dashboardItem: {
    flexDirection: 'row',
    // alignContent: 'center',
  },
  dashboardIcon: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  dashboardIcon2: {
    flex: 1.5,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.color4_3,
  },
  badgeCircle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: '8@s',
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: colors.color1_4,
  },
  badge: {
    fontSize: '32@s',
    // color: 'lightgrey',
    // color: colors.color2_2_4,
    // color: colors.color4_4,
    // color: 'gold',
  },
  icon: {
    fontSize: '32@s',
    // color: 'yellow',
  },

  dashboardDesc: {
    flex: 7,
  },

  dashboardItemTitle: {
    fontSize: '18@s',
    color: 'seashell',
    // fontWeight: '700',
  },

  headerDashboardItemTitle: {
    fontSize: '16@s',
  },
  headerDashboardItemTitleItalic: {
    fontSize: '16@s',
    fontStyle: 'italic',
  },

  dashboardItemContent: {
    color: colors.color1_2,
    fontWeight: '700',
    fontSize: '18@s',
  },

  headerDashboardItemContent: {
    color: colors.color3_2,
    fontWeight: '700',
    fontSize: '16@s',
  },
  emptyListView: {
    paddingHorizontal: '20@s',
    marginVertical: '30@s',
  },

  emptyListText: {
    fontSize: '18@s',
    paddingVertical: '10@s',
  },
  button: {
    paddingHorizontal: '12@s',
    // backgroundColor: colors.color4_1_2,
  },
  headerRow: {
    paddingTop: '20@s',
  },

  listRow: {
    paddingHorizontal: '15@s',
    paddingVertical: '4@s',
    backgroundColor: colors.color2_2,
  },
  rowItem: {
    paddingHorizontal: '15@s',
  },
  rowItemTitle: {
    fontSize: '18@s',
    flex: 2,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemTitleLong: {
    fontSize: '18@s',
    flex: 5,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentRegular: {
    flex: 6,
    // fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },
  rowItemContent: {
    flex: 6,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },
  rowItemTitleBold: {
    fontSize: '18@s',
    flex: 2,
    fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentBold: {
    flex: 6,
    fontFamily: 'Tillana-SemiBold',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },

  listRowItem: {
    flexDirection: 'row',
    paddingVertical: 9,
  },
  itemTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 5,
    fontSize: '25@s',
    fontWeight: '700',
  },
  quantityTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 1.5,
    fontSize: '25@s',
    fontWeight: '700',
  },
  priceTitle: {
    fontFamily: 'sans-serif-smallcaps',
    fontSize: '25@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },

  itemInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '21@s',
    flex: 5,
    flexWrap: 'wrap',
  },
  quantityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '21@s',
    flex: 1.5,
    flexWrap: 'wrap',
  },
  priceInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '21@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },
  availabilityInfo: {
    fontFamily: 'Tillana-Medium',
    flex: 0.75,
    flexWrap: 'wrap',
  },
  checkMark: {
    color: colors.color4_1,
    fontSize: '24@s',
  },
  crossMark: {
    color: colors.color3_1,
    fontSize: '24@s',
  },
  price: {
    color: colors.color4_1,
    fontSize: '18@s',
  },

  emptyContainer: {
    paddingVertical: '30@s',
    paddingHorizontal: '30@s',
  },
  emptyText: {
    fontSize: '22@s',
    color: colors.color4_1,
    paddingVertical: '20@s',
  },
  emptyTextIndicator: {
    flexDirection: 'row',
  },
  buttonSection: {
    paddingHorizontal: '100@s',
    paddingBottom: '10@s',
  },

  // titleText: {
  //   fontSize: '21@s',
  //   fontWeight: '600',
  // },
  // bodyText: {
  //   fontSize: '20@s',
  //   fontWeight: '600',
  // },

  // emptySectionText: {
  //   alignItems: 'flex-start',
  //   fontSize: '20@s',
  //   fontWeight: '600',
  //   paddingVertical: '20@s',
  //   textAlign: 'center',
  // },
  // sectionText: {
  //   marginTop: '10@s',
  //   marginBottom: '10@s',
  //   paddingHorizontal: '30@s',
  // },

  // enterNumber: {
  //   fontSize: '20@s',
  //   fontWeight: '700',
  // },
  // input: {
  //   fontSize: '25@s',
  // },
  // button: {
  //   paddingHorizontal: '12@s',
  // },
  // logoutButton: {},
  // sectionBody: {
  //   backgroundColor: colors.primaryBackground,
  // },
  // sectionTitle: {
  //   paddingHorizontal: '20@s',
  //   paddingVertical: '2@s',
  //   backgroundColor: colors.secondaryBackground,
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  // numberSection: {
  //   padding: '20@s',
  // },
  // logoutButtonSection: {
  //   marginTop: '50@s',
  //   paddingHorizontal: '100@s',
  // },
  // hr: {
  //   borderBottomColor: 'grey',
  //   borderBottomWidth: '0.5@s',
  // },
});
