import { Colors } from "@/app/styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { Icon } from "@rneui/themed";
import {
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from "react-native";
import styles from "./styles";

export default function SearchResultDisplay({
  result,
  isSwitchableRoute = false,
  onPress,
  onSwitchRoute,
}: {
  result: SearchResultInterface;
  isSwitchableRoute: boolean;
  onPress: () => void;
  onSwitchRoute: () => void;
}) {

  return (
    <View style={styles.displayContainer}>
      <View style={styles.serviceNoContainer}>
        <Text style={styles.serviceNo}>{result.serviceNo}</Text>
      </View>
      <TouchableHighlight
        onPress={onPress}
        activeOpacity={0.6}
        underlayColor={Colors.neutral.s100}
        style={styles.columnContainer}
      >
        <>
          <View style={styles.displayRoadNameContainer}>
            <Text style={styles.displayRoadName} numberOfLines={1}>
              {result.originRoadName}
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
              {result.destinationRoadName}
            </Text>
          </View>
        </>
      </TouchableHighlight>

      <TouchableOpacity
        onPress={onSwitchRoute}
        style={{ width: 22, height: 22, flexGrow: 1 }}
        activeOpacity={0.6}
        disabled={!isSwitchableRoute}
      >
        <View>
          <Icon
            name="sync-alt"
            style={{ transform: [{ rotate: "90deg" }] }}
            color={
              isSwitchableRoute
                ? Colors.neutral.black
                : Colors.neutral.s100
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}
