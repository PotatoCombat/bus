import { mockBusArrival } from "@/app/utils/mockData";
import { View, StyleSheet, StatusBar, Text } from "react-native";
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

const EmptyBus = ({ mockBusArrival }: { mockBusArrival: any }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{mockBusArrival.bus1}</Text>
  </View>
);

// Check if the id of the first item is -1
const hasInvalidItem3 = mockBusArrival.some((item) => item.bus3 === -1);



export default function ListRow() {
    // const renderItem = ({ item }) => {
    //     return (
    //       <View>
    //         {item.bus3 === "-1" ? (
    //           // If name or description is "-1", show an error message
    //           <View style={styles.triangleCorner1}></View>
    //         ) : (
    //           // For other items, show their name and description
                
    //         )}
    //       </View>
    //     );
    //   };
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
              {hasInvalidItem3 ? (
                // If any item has id -1, show an error message
                <View style={styles.triangleCorner1}></View>
              ) : // Otherwise, render the list or first item as usual
              mockBusArrival.length > 0 ? (
                <Text style={styles.arrivalText}>{item.bus3}</Text>
              ) : (
                <Text>No data available</Text>
              )}
            </View>
            {/* <View style={styles.arrival}>
              <Text style={styles.arrivalText}>{item.bus3}</Text>
            </View> */}
          </View>
        )}
        keyExtractor={(item) => item.busStopNo}
      />
    </View>
  );
}
