import { View, Text, StyleSheet, FlatList } from "react-native";

export default function ListRow({ busData }: { busData: any }) {
  if (!busData) {
    return <Text>No bus data available</Text>;
  }

  // FlatList rendering item function
  const renderItem = ({ item }: { item: any }) => (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View style={styles.item}>
        <Text style={styles.title}>{item.ServiceNo}</Text>
      </View>
      <Text style={styles.blank}></Text>

      <View style={{ flex: 3, flexDirection: "row" }}>
        {item.NextBuses.map((bus: number, idx: number) => {
          return (
            <View style={styles.arrival} key={`${item.ServiceNo}-bus-${idx}`}>
              {bus === -1 ? (
                // If any item has id -1, show an error message
                <View style={styles.triangleCorner1}></View>
              ) : item.NextBuses.length > 0 ? (
                <Text style={styles.arrivalText}>{bus}</Text>
              ) : (
                <Text>No data available</Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Use FlatList to render the Timings */}
      <FlatList
        data={busData.Timings}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.ServiceNo}-${index}`} // Unique key for each timing
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  item: {
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
  triangleCorner1: {
    height: 1,
    width: "auto",
    transform: [{ rotateX: "135deg" }, { rotateZ: "45deg" }],
    backgroundColor: "black",
  },
});
