import { StyleSheet } from "react-native";
import { Colors, Outlines } from "../../styles";

export const ROW_HEIGHT = 56;

const commonStyles = StyleSheet.create({
  row: {
    backgroundColor: Colors.neutral.white,
    maxHeight: ROW_HEIGHT,
    minHeight: ROW_HEIGHT,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
    padding: "auto",
    paddingLeft: 20,
    paddingRight: 20,
  },
  roadNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
});

const styles = StyleSheet.create({
  // Search Bar
  searchBarContainer: {
    backgroundColor: Colors.transparent.clear,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
  },
  inputContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.large,
  },
  searchedInputContainer: {
    backgroundColor: Colors.neutral.white,
    borderTopStartRadius: Outlines.borderRadius.large,
    borderTopEndRadius: Outlines.borderRadius.large,
    borderBottomColor: Colors.neutral.s300,
    borderBottomWidth: Outlines.borderWidth.base,
  },
  input: {
    color: Colors.neutral.black,
    fontSize: 20,
    marginLeft: 20,
    maxHeight: ROW_HEIGHT,
    minHeight: ROW_HEIGHT,
  },
  rightIconContainer: {
    marginRight: 17,
    marginVertical: 0,
    paddingRight: 0,
  },
  // Results
  result: {
    ...commonStyles.row,
  },
  lastResult: {
    ...commonStyles.row,
    borderBottomLeftRadius: Outlines.borderRadius.large,
    borderBottomRightRadius: Outlines.borderRadius.large,
  },
  noResult: {
    textAlign: "center",
    width: "100%",
    fontSize: 14,
  },
  // Display
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    maxHeight: 59,
    minHeight: 59,
    gap: 8,
  },
  buttonIconContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.large,
    minWidth: 59,
    maxWidth: 59,
    justifyContent: "center",
    alignItems: "center",
  },
  displayContainer: {
    ...commonStyles.row,
    backgroundColor: Colors.neutral.white,
    borderRadius: Outlines.borderRadius.large,
    justifyContent: "space-between",
    gap: 9,
    flexGrow: 2,
  },
  columnContainer: {
    minWidth: "60%",
    maxWidth: "60%",
    flexGrow: 4,
  },
  displayRoadNameContainer: {
    ...commonStyles.roadNameContainer,
  },
  // Info
  serviceNoContainer: {
    backgroundColor: Colors.neutral.s200,
    borderRadius: Outlines.borderRadius.small,
    paddingHorizontal: 13,
    justifyContent: "center",
    alignItems: "center",
  },
  serviceNo: {
    fontSize: 16,
    textAlign: "center",
  },
  resultRoadNameContainer: {
    ...commonStyles.roadNameContainer,
    maxWidth: "35%",
  },
  roadName: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
