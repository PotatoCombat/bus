import { mockBusArrival } from "@/app/utils/mockData";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  item: {
    paddingLeft: 12,
    height: 60,
    marginVertical: 8,
    flex: 1,
    justifyContent: "center",
  },
  arrival: {
    borderRadius: 8,
    backgroundColor: "#D9D9D9",
    margin: 8,
    justifyContent: "center",
    flex: 1,
  },
  arrivalText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  blank: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  triangleCorner1: {
    height: 1,
    width: "auto",
    transform: [{ rotateX: "135deg" }, { rotateZ: "45deg" }],
    backgroundColor: "black",
  },
});

const Item = ({ serviceNo }: { serviceNo: any }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{serviceNo}</Text>
  </View>
);

export default function ListRow() {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <FlatList
        data={mockBusArrival}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Item serviceNo={item.bus1} />
            <Text style={styles.blank}></Text>
            <View style={styles.arrival}>
              {item.bus1 === -1 ? (
                // If any item has id -1, show an error message
                <View style={styles.triangleCorner1}></View>
              ) : // Otherwise, render the list or first item as usual
              mockBusArrival.length > 0 ? (
                <Text style={styles.arrivalText}>{item.bus1}</Text>
              ) : (
                <Text>No data available</Text>
              )}
            </View>
            <View style={styles.arrival}>
              {item.bus2 === -1 ? (
                // If any item has id -1, show an error message
                <View style={styles.triangleCorner1}></View>
              ) : // Otherwise, render the list or first item as usual
              mockBusArrival.length > 0 ? (
                <Text style={styles.arrivalText}>{item.bus2}</Text>
              ) : (
                <Text>No data available</Text>
              )}
            </View>
            <View style={styles.arrival}>
              {item.bus3 === -1 ? (
                // If any item has id -1, show an error message
                <View style={styles.triangleCorner1}></View>
              ) : // Otherwise, render the list or first item as usual
              mockBusArrival.length > 0 ? (
                <Text style={styles.arrivalText}>{item.bus3}</Text>
              ) : (
                <Text>No data available</Text>
              )}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.busStopNo}
      />
    </View>
  );
}

