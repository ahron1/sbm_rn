import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  container: {
    paddingVertical: '30@s',
    paddingHorizontal: '30@s',
  },
  loadingText: {
    fontSize: '22@s',
    color: colors.color4_2,
    paddingVertical: '20@s',
  },
  loadingTextIndicator: {
    flexDirection: 'row',
  },
  activityIndicator: {
    paddingHorizontal: '15@s',
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
});
