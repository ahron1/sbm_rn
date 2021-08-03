import {ScaledSheet} from 'react-native-size-matters';
import colors from '../../assets/theme/colors';

export default ScaledSheet.create({
  input: {
    minWidth: '30@s',
    fontFamily: 'Tillana-SemiBold',
  },
  buttonSection: {
    marginHorizontal: '30@s',
    marginTop: '20@s',
    marginBottom: '5@s',
  },
  titleText: {
    fontWeight: '700',
    fontSize: '18@s',
  },

  rowItem: {
    flexDirection: 'row',
    paddingVertical: '9@s',
  },
  serviceRow: {
    paddingVertical: '5@s',
  },
  radioSection: {
    alignItems: 'center',
  },
  radiusSection: {
    paddingVertical: '10@s',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  radiusTitle: {
    flex: 3,
  },
  introContent: {
    fontSize: '16@s',
  },
  serviceSection: {
    paddingVertical: '10@s',
  },
  text: {
    // fontWeight: '700',
    fontSize: '16@s',
  },
  textBold: {
    fontWeight: '700',
    fontSize: '16@s',
  },

  introSection: {
    marginVertical: '10@s',
    // flexDirection: 'row',
  },
});
