import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { Icon } from "@rneui/themed";
import { Colors } from "@/app/styles";

export default function SearchResultDisplay({
  selectedResult,
  setSelectedResult,
  openModal,
  isSwitchableRoute,
}: {
  selectedResult: SearchResultInterface;
  setSelectedResult: Function;
  openModal: Function;
  isSwitchableRoute: boolean;
}) {
  const handleClickSwitchButton = () => {
    setSelectedResult((prev: SearchResultInterface | null) => {
      if (prev == null) {
        return null;
      }

      return {
        serviceNo: prev.serviceNo,
        originRoadName: prev.destinationRoadName,
        destinationRoadName: prev.originRoadName,
      };
    });
  };

  return (
    <>
      <View style={styles.displayContainer}>
        <View style={styles.serviceNoContainer}>
          <Text style={styles.serviceNo}>{selectedResult.serviceNo}</Text>
        </View>

        <TouchableHighlight
          onPress={() => openModal()}
          activeOpacity={0.6}
          underlayColor={Colors.neutral.s100}
          style={styles.columnContainer}
        >
          <>
            <View style={styles.displayRoadNameContainer}>
              <Text style={styles.displayRoadName} numberOfLines={1}>
                {selectedResult.originRoadName}
              </Text>
            </View>

            <View>
              <Icon
                name="arrow-right"
                style={{ transform: [{ rotate: "90deg" }], marginVertical: -8 }}
              />
            </View>

            <View style={styles.displayRoadNameContainer}>
              <Text style={styles.displayRoadName} numberOfLines={1}>
                {selectedResult.destinationRoadName}
              </Text>
            </View>
          </>
        </TouchableHighlight>

        <TouchableOpacity
          onPress={() => handleClickSwitchButton()}
          style={{ width: 22, height: 22, flexGrow: 1 }}
          activeOpacity={0.6}
          disabled={!isSwitchableRoute}
        >
          <View>
            <Icon
              name="sync-alt"
              style={{
                transform: [{ rotate: "90deg" }],
              }}
              color={
                isSwitchableRoute ? Colors.neutral.black : Colors.neutral.s100
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
