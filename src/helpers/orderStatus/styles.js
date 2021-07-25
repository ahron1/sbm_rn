import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  iconSmall: {
    fontSize: '40@s',
  },
  iconXSmall: {
    fontSize: '30@s',
  },
  iconContainer: {
    flex: 1,
    borderWidth: 4,
    borderRadius: 100,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    // alignSelf: 'center',
  },
});
