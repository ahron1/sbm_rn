import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  wrapper: {},
  dashboard: {
    paddingHorizontal: '10@s',
    paddingVertical: '10@s',
    // minHeight: '100@s',
    backgroundColor: colors.color1_3,
    // borderWidth: '1.25@s',
  },
  dashboardItem: {
    flexDirection: 'column',
    paddingVertical: '3@s',
  },
  dashboardItemGroup: {
    paddingVertical: '5@s',
  },
  dashboardItemTitle: {
    fontSize: '14@s',
    color: colors.white,
  },
  dashboardItemTitleItalic: {
    fontSize: '14@s',
    fontStyle: 'italic',
    color: colors.white,
  },
  sectionWithIcon: {
    flexDirection: 'row',
  },
  rowWithIcon: {
    flex: 5,
  },
  list: {
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
  },
  rowItemContent: {
    flex: 6,
    fontFamily: 'Tillana-Medium',
    fontSize: '15@s',
    // flexWrap: 'wrap',
  },
  rowItemTitleBold: {
    fontSize: '15@s',
    flex: 2.5,
    fontWeight: '700',
    // flexWrap: 'wrap',
  },
  rowItemContentBold: {
    flex: 6,
    fontFamily: 'Tillana-SemiBold',
    fontSize: '15@s',
    // flexWrap: 'wrap',
  },
  emptyButtonSection: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
