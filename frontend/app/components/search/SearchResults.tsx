import { Colors } from "@/app/styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { noBusesFound } from "@/app/utils/strings";
import { Icon } from "@rneui/themed";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import styles, { ROW_HEIGHT } from "./styles";

export default function SearchResults({
  results,
  setSelectedResult,
}: {
  results: SearchResultInterface[] | null;
  setSelectedResult: Function;
}) {
  if (results === null) {
    return <></>;
  }
  if (results.length === 0) {
    return (
      <View style={styles.lastResult}>
        <Text style={styles.noResult}>{noBusesFound}</Text>
      </View>
    )
  }
  return (
    <View style={{ height: results.length * ROW_HEIGHT }}>
      <FlatList
        data={results}
        renderItem={({ item, index }) => (
          <TouchableHighlight
            key={item.serviceNo + index}
            onPress={() => setSelectedResult(item)}
            activeOpacity={0.6}
            underlayColor={Colors.neutral.s100}
          >
            <View
              style={
                index < results.length - 1
                  ? styles.result
                  : styles.lastResult
              }
            >
              <View style={{ ...styles.serviceNoContainer, flex: 2 }}>
                <Text style={styles.serviceNo}>{item.serviceNo}</Text>
              </View>
              <View style={{ ...styles.resultRoadNameContainer, flex: 5 }}>
                <Text style={styles.roadName} numberOfLines={2}>
                  {item.originRoadName}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Icon name="arrow-right" />
              </View>
              <View style={{ ...styles.resultRoadNameContainer, flex: 5 }}>
                <Text style={styles.roadName} numberOfLines={2}>
                  {item.destinationRoadName}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}
