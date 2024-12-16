import { FlatList, Text, TouchableHighlight, View } from "react-native";
import styles, { ROW_HEIGHT } from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { Icon } from "react-native-elements";
import { noBusesFound } from "@/app/utils/strings";

export default function SearchResults({
  results,
  setSelectedResult,
}: {
  results: SearchResultInterface[] | null;
  setSelectedResult: Function;
}) {
  return (
    <>
      {results != null && (
        <>
          {results.length == 0 ? (
            <View style={styles.lastResult}>
              <Text style={styles.noResult}>{noBusesFound}</Text>
            </View>
          ) : (
            <View style={{ height: results.length * ROW_HEIGHT }}>
              <FlatList
                data={results}
                renderItem={({ item, index }) => (
                  <TouchableHighlight
                    key={item.serviceNo + index}
                    onPress={() => setSelectedResult(item)}
                    activeOpacity={0.6}
                    underlayColor="#EEEEEE"
                  >
                    <View
                      style={
                        index < results.length - 1
                          ? styles.result
                          : styles.lastResult
                      }
                    >
                      <View style={styles.serviceNoContainer}>
                        <Text style={styles.serviceNo}>{item.serviceNo}</Text>
                      </View>

                      <View style={styles.resultRoadNameContainer}>
                        <Text style={styles.roadName}>
                          {item.originRoadName}
                        </Text>
                      </View>

                      <Icon name="arrow-right" />

                      <View style={styles.resultRoadNameContainer}>
                        <Text style={styles.roadName}>
                          {item.destinationRoadName}
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                )}
              />
            </View>
          )}
        </>
      )}
    </>
  );
}
