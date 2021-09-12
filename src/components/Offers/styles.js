import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  container: {
    paddingVertical: '10@s',
    paddingHorizontal: '10@s',
  },
  loadingText: {
    fontSize: '22@s',
    color: colors.color4_2,
    paddingVertical: '20@s',
  },
  headerText: {
    fontSize: '16@s',
    color: colors.color4_2,
    paddingVertical: '5@s',
  },

  loadingTextIndicator: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: '12@s',
    // backgroundColor: colors.color4_1_2,
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
  columnHeaders: {
    flexDirection: 'row',
    paddingTop: '8@s',
  },
  itemTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 5,
    fontSize: '21@s',
    fontWeight: '700',
  },
  quantityTitle: {
    fontFamily: 'sans-serif-smallcaps',
    flex: 2.25,
    fontSize: '21@s',
    fontWeight: '700',
  },
  priceTitle: {
    fontFamily: 'sans-serif-smallcaps',
    fontSize: '21@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },
  list: {
    // paddingHorizontal: '10@s',
    // paddingTop: '10@s',
    backgroundColor: colors.color2_3,
  },
  listItem: {
    paddingHorizontal: '10@s',
  },
  listRowItem: {
    flexDirection: 'row',
    paddingVertical: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    flex: 5,
    flexWrap: 'wrap',
  },
  quantityInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },
  priceInfo: {
    fontFamily: 'Tillana-Medium',
    fontSize: '18@s',
    flex: 2.25,
    flexWrap: 'wrap',
  },
  availabilityInfo: {
    // fontFamily: 'Tillana-Medium',
    flex: 0.75,
    flexWrap: 'wrap',
    fontSize: '20@s',
    color: 'red',
    fontWeight: '700',
  },
  checkMark: {
    color: colors.color4_1,
    fontSize: '21@s',
  },
  crossMark: {
    color: colors.color3_1,
    fontSize: '21@s',
  },
});
