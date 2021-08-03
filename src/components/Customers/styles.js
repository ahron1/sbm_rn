import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  dashboard: {
    paddingHorizontal: '10@s',
    paddingVertical: '5@s',
    backgroundColor: colors.color4_3,
  },
  headerDashboard: {
    paddingHorizontal: '20@s',
    paddingVertical: '9@s',
    backgroundColor: colors.grey,
  },
  dashboardItem: {
    flexDirection: 'row',
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
  },
  icon: {
    fontSize: '32@s',
  },
  dashboardDesc: {
    flex: 7,
  },
  dashboardItemTitle: {
    fontSize: '18@s',
    color: 'seashell',
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
  },
  listRow: {
    paddingHorizontal: '15@s',
    paddingVertical: '4@s',
    backgroundColor: colors.color2_2,
  },
  rowItem: {
    paddingHorizontal: '15@s',
  },
  rowItemContent: {
    fontSize: '18@s',
  },
  rowItemContentBold: {
    fontFamily: 'Tillana-SemiBold',
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
});
