import { FlatList, Text, View } from "react-native";
import styles, { ROW_HEIGHT } from "./styles";
import SearchResultInterface from "@/app/types/SearchResultInterface";
import { Icon } from "react-native-elements";
import { noBusesFound } from "@/app/utils/strings";

export default function SearchResults({
  results,
}: {
  results: SearchResultInterface[] | null;
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
                  <View
                    key={item.serviceNo + index}
                    style={
                      index < results.length - 1
                        ? styles.result
                        : styles.lastResult
                    }
                  >
                    <View style={styles.serviceNoContainer}>
                      <Text style={styles.serviceNo}>{item.serviceNo}</Text>
                    </View>

                    <View style={styles.roadNameContainer}>
                      <Text style={styles.roadName}>{item.originRoadName}</Text>
                    </View>

                    <Icon name="arrow-right" />

                    <View style={styles.roadNameContainer}>
                      <Text style={styles.roadName}>
                        {item.destinationRoadName}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          )}
        </>
      )}
    </>
  );
}
