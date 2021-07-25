import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  // export default StyleSheet.create({
  // logoImage: {
  // height: '80@s',
  // width: '80@s',
  // alignSelf: 'center',
  // marginTop: '15@s',
  // },
  // screen: {
  // flex: 1,
  // padding: '0@s',
  // },

  wrapper: {},
  dashboard: {
    paddingHorizontal: '10@s',
    paddingVertical: '10@s',
    // minHeight: '100@s',
    backgroundColor: colors.color2_4,
  },
  dashboardItem: {
    flexDirection: 'column',
  },
  dashboardItemTitle: {
    fontSize: '18@s',
    // flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemText: {
    // flex: 1,
    fontSize: '18@s',
  },
  dashboardItemTitleFreeFlow: {
    fontSize: '14@s',
    // flex: 3,
    // fontWeight: '700',
    // flexWrap: 'wrap',
  },
  dashboardItemContentFreeFlow: {
    // flex: 7,
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
  },

  list: {
    // paddingHorizontal: '10@s',
    // paddingTop: '10@s',
    backgroundColor: colors.color2_3,
  },
  emptyListView: {
    padding: '20@s',
    marginTop: '80@s',
  },

  emptyListText: {
    fontSize: '21@s',
  },
  rowItem: {
    flexDirection: 'row',
  },

  listRow: {
    paddingHorizontal: '10@s',
    paddingVertical: '12@s',
  },
  rowItemTitle: {
    fontSize: '18@s',
    flex: 2.5,
    // fontWeight: '700',
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
    flex: 2.5,
    fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentBold: {
    flex: 6,
    fontFamily: 'Tillana-SemiBold',
    fontSize: '18@s',
    // flexWrap: 'wrap',
  },

  buttons: {
    // minHeight: 40,
  },
  itemTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 5,
    fontSize: '28@s',
    fontWeight: '700',
  },
  quantityTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 1.5,
    fontSize: '28@s',
    fontWeight: '700',
  },
  priceTitle: {
    fontFamily: 'sans-serif-smallcaps',
    fontSize: '28@s',
    flex: 1.75,
    flexWrap: 'wrap',
  },

  itemInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 5,
    flexWrap: 'wrap',
  },
  quantityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 1.5,
    flexWrap: 'wrap',
  },
  priceInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 1.75,
    flexWrap: 'wrap',
  },
  availabilityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '24@s',
    flex: 0.75,
    flexWrap: 'wrap',
  },
  checkMark: {
    color: colors.color4_1,
    fontSize: '30@s',
  },
  crossMark: {
    color: colors.color3_1,
    fontSize: '30@s',
  },

  emptyButtonSection: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
