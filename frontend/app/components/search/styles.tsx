import { StyleSheet } from 'react-native';

const commonStyles = StyleSheet.create({
    inputContainer: {
        backgroundColor: "white",
    },
    result: {
        backgroundColor: 'white',
        maxHeight: 56,
        minHeight: 56,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        padding: 'auto',
        paddingLeft: 20,
        paddingRight: 20,
    },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  inputContainer: {
    ...commonStyles.inputContainer,
    borderRadius: 28,
  },
  searchedInputContainer: {
    ...commonStyles.inputContainer,
    borderTopStartRadius: 28,
    borderTopEndRadius: 28,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
  input: {
    color: "black",
    fontSize: 20,
    marginLeft: 20,
    maxHeight: 56,
    minHeight: 56,
  },
  rightIconContainer: {
    marginRight: 17,
    marginVertical: 0,
    paddingRight: 0,
  },
  result: {
    ...commonStyles.result,
  },
  lastResult: {
    ...commonStyles.result,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  noResult: {
    textAlign: 'center',
    width: '100%',
    fontSize: 14,
  },
  serviceNoContainer: {
    backgroundColor: "lightgray",
    borderRadius: 6,
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceNo: {
    fontSize: 20,
    textAlign: 'center',
  },
  roadNameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    maxWidth: '35%',
  },
  roadName: {
    fontSize: 14,
  }
});

export default styles;