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
  arrivalTextZero: {
    fontSize: 24,
    color:'red',
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

export default function ListRow({ busData }: { busData: any }) {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <FlatList
        data={busData.Timings}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.item}>
              <Text style={styles.title}>{item.ServiceNo}</Text>
            </View>
            <Text style={styles.blank}></Text>
            {/* NextBuses */}
            <View style={{ flex: 3, flexDirection: "row" }}>
              {item.NextBuses.map((bus: number, idx: number) => (
                <View style={styles.arrival} key={`${item.ServiceNo}-bus-${idx}`}>
                  {bus === -1 ? (
                    // If bus time is -1, show an error message
                    <View style={styles.triangleCorner1}></View>
                  ) : bus === 0 ? (
                    // If bus time is 0, show a "No buses arriving" message
                    <Text style={styles.arrivalTextZero}>Arr</Text>
                  ) : item.NextBuses.length > 0 ? (
                    // Otherwise, display the bus arrival time
                    <Text style={styles.arrivalText}>{bus}</Text>
                  ) : (
                    <Text>No data available</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.ServiceNo}
        style={{ flex: 1 }}
      />
    </View>
  );
}

