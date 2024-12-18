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
              <Text style={styles.arrivalText}>{item.bus1}</Text>
            </View>
            <View style={styles.arrival}>
              <Text style={styles.arrivalText}>{item.bus2}</Text>
            </View>
            <View style={styles.arrival}>
              <Text style={styles.arrivalText}>{item.bus3}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.busStopNo}
      />
    </View>
  );
}

